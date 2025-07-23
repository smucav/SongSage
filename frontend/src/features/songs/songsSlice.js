import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    items: [],
    currentSong: null,
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    operation: { type: null, loading: false, error: null, success: false },
  },
  reducers: {
    fetchSongsRequest: (state, action) => {
      state.loading = true;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSongRequest: (state, action) => {
      state.loading = true;
    },
    fetchSongSuccess: (state, action) => {
      state.loading = false;
      state.currentSong = action.payload;
      state.error = null;
    },
    fetchSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSongRequest: (state, action) => {
      state.operation = { type: 'add', loading: true, error: null, success: false };
    },
    addSongSuccess: (state, action) => {
      state.operation = { type: 'add', loading: false, error: null, success: true };
      state.items = [...state.items, action.payload];
    },
    addSongFailure: (state, action) => {
      state.operation = { type: 'add', loading: false, error: action.payload, success: false };
    },
    updateSongRequest: (state, action) => {
      state.operation = { type: 'update', loading: true, error: null, success: false };
    },
    updateSongSuccess: (state, action) => {
      state.operation = { type: 'update', loading: false, error: null, success: true };
      state.items = state.items.map(song =>
        song.id === action.payload.id ? action.payload : song
      );
      state.currentSong = action.payload;
    },
    updateSongFailure: (state, action) => {
      state.operation = { type: 'update', loading: false, error: action.payload, success: false };
    },
    deleteSongRequest: (state, action) => {
      state.operation = { type: 'delete', loading: true, error: null, success: false };
    },
    deleteSongSuccess: (state, action) => {
      state.operation = { type: 'delete', loading: false, error: null, success: true };
      state.items = state.items.filter(song => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
      state.operation = { type: 'delete', loading: false, error: action.payload, success: false };
    },
    clearOperation: (state) => {
      state.operation = { type: null, loading: false, error: null, success: false };
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  fetchSongRequest,
  fetchSongSuccess,
  fetchSongFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  clearOperation,
} = songsSlice.actions;

export default songsSlice.reducer;
