import { createSlice } from '@reduxjs/toolkit';

const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
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
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
