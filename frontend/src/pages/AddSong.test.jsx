import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddSong from './AddSong';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../app/theme';
import '@testing-library/jest-dom';


describe('AddSong component', () => {
  const renderWithTheme = (ui) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it('renders form inputs', () => {
    renderWithTheme(<AddSong />);
    expect(screen.getByPlaceholderText(/Title/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Artist/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Album/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Year/)).toBeInTheDocument();
  });

  it('updates input values', () => {
    renderWithTheme(<AddSong />);
    const titleInput = screen.getByPlaceholderText(/Title/);
    fireEvent.change(titleInput, { target: { value: 'Test Song' } });
    expect(titleInput.value).toBe('Test Song');
  });
});
