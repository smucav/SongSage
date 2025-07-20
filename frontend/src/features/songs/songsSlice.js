import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
  view: 'cards',
  search: '',
  sortBy: 'title',
  sortOrder: 'asc',
  isAddEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedSong: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action) {
      state.songs = action.payload.songs;
      state.total = action.payload.total;
      state.loading = false;
    },
    fetchSongsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    createSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess(state, action) {
      state.songs = [...state.songs, action.payload];
      state.total += 1;
      state.loading = false;
      state.isAddEditModalOpen = false;
    },
    createSongFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action) {
      state.songs = state.songs.map((song) =>
        song.id === action.payload.id ? action.payload : song
      );
      state.loading = false;
      state.isAddEditModalOpen = false;
      state.selectedSong = null;
    },
    updateSongFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action) {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      state.total -= 1;
      state.loading = false;
      state.isDeleteModalOpen = false;
      state.selectedSong = null;
    },
    deleteSongFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
      state.page = 1;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setSort(state, action) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    openAddEditModal(state, action) {
      state.isAddEditModalOpen = true;
      state.selectedSong = action.payload || null;
    },
    closeAddEditModal(state) {
      state.isAddEditModalOpen = false;
      state.selectedSong = null;
    },
    openDeleteModal(state, action) {
      state.isDeleteModalOpen = true;
      state.selectedSong = action.payload;
    },
    closeDeleteModal(state) {
      state.isDeleteModalOpen = false;
      state.selectedSong = null;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  setPage,
  setLimit,
  setView,
  setSearch,
  setSort,
  openAddEditModal,
  closeAddEditModal,
  openDeleteModal,
  closeDeleteModal,
} = songsSlice.actions;

export default songsSlice.reducer;
