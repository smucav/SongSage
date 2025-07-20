import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import SongList from './SongList';
import songsReducer from '../features/songs/songsSlice';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: { error: jest.fn() },
}));

const mockSongs = [
  { id: 1, title: 'Tizita', artist: 'Muluken Melesse', album: 'Ethiopian Hits', year: 1973, genre: 'Traditional' },
  { id: 2, title: 'Yene Habesha', artist: 'Betty G', album: 'Manew Fitsum', year: 2015, genre: 'Pop' },
];

describe('SongList', () => {
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

  it('renders loading state', async () => {
    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders song cards when data is fetched', async () => {
    mockAxios.onGet('http://localhost:8080/songs?page=1&limit=10').reply(200, mockSongs);

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

  });

  it('toggles between card and table views', async () => {
    mockAxios.onGet('http://localhost:8080/songs?page=1&limit=10').reply(200, mockSongs);

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    await waitFor(() => screen.getByText('Tizita'));

    const toggleButton = screen.getByText('Table View');
    await userEvent.click(toggleButton);
    expect(screen.getByRole('table')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Card View'));
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('handles search input', async () => {
    mockAxios.onGet('http://localhost:8080/songs?page=1&limit=10').reply(200, mockSongs);

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );


    const searchInput = screen.getByPlaceholderText('Search by title or artist...');
    expect(store.getState().songs.search).toBe('Muluken');
  });

  it('handles sorting', async () => {
    mockAxios.onGet('http://localhost:8080/songs?page=1&limit=10').reply(200, mockSongs);

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );


    const sortSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(sortSelect, 'year:desc');
    expect(store.getState().songs.sortBy).toBe('year');
    expect(store.getState().songs.sortOrder).toBe('desc');
  });

  it('opens add song modal', async () => {
    mockAxios.onGet('http://localhost:8080/songs?page=1&limit=10').reply(200, mockSongs);

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );


    const addButton = screen.getByText('Add Song');
    await userEvent.click(addButton);
    expect(store.getState().songs.isAddEditModalOpen).toBe(true);
  });
});
