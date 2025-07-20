import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { act } from 'react'; // Updated import
import DeleteConfirmModal from './DeleteConfirmModal';
import songsReducer, { deleteSongStart, closeDeleteModal } from '../features/songs/songsSlice';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn() },
}));

describe('DeleteConfirmModal', () => {
  let store;
  let mockAxios;

  beforeEach(() => {
    store = configureStore({
      reducer: { songs: songsReducer },
    });
    mockAxios = new MockAdapter(axios);
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('does not render when isDeleteModalOpen is false', () => {
    render(
      <Provider store={store}>
        <DeleteConfirmModal />
      </Provider>
    );
    expect(screen.queryByText(/Delete/)).not.toBeInTheDocument();
  });

  it('renders delete confirmation modal', () => {
    const song = { id: 1, title: 'Tizita' };
    store.dispatch({ type: 'songs/openDeleteModal', payload: song });
    render(
      <Provider store={store}>
        <DeleteConfirmModal />
      </Provider>
    );
    expect(screen.getByText('Delete Tizita?')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this song?')).toBeInTheDocument();
  });

  it('deletes song on confirm', async () => {
    mockAxios.onDelete('http://localhost:8080/songs/1').reply(200);

    const song = { id: 1, title: 'Tizita' };
    store.dispatch({ type: 'songs/openDeleteModal', payload: song });
    render(
      <Provider store={store}>
        <DeleteConfirmModal />
      </Provider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('Delete'));
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Song deleted!');
      expect(store.getState().songs.isDeleteModalOpen).toBe(true);
    }, { timeout: 2000 });
  });

  it('closes modal on cancel', async () => {
    const song = { id: 1, title: 'Tizita' };
    store.dispatch({ type: 'songs/openDeleteModal', payload: song });
    render(
      <Provider store={store}>
        <DeleteConfirmModal />
      </Provider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('Cancel'));
    });

    await waitFor(() => {
      expect(store.getState().songs.isDeleteModalOpen).toBe(false);
    });
  });
});
