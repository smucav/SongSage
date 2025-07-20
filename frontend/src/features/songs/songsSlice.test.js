import songsReducer, {
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
} from './songsSlice';

describe('songsSlice', () => {
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

  it('should handle initial state', () => {
    expect(songsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchSongsStart', () => {
    const state = songsReducer(initialState, fetchSongsStart());
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('should handle fetchSongsSuccess', () => {
    const songs = [{ id: 1, title: 'Test Song' }];
    const state = songsReducer(initialState, fetchSongsSuccess({ songs, total: 1 }));
    expect(state).toEqual({
      ...initialState,
      songs,
      total: 1,
      loading: false,
    });
  });

  it('should handle fetchSongsFailure', () => {
    const error = 'Failed to fetch';
    const state = songsReducer(initialState, fetchSongsFailure(error));
    expect(state).toEqual({ ...initialState, error, loading: false });
  });

  it('should handle createSongStart', () => {
    const state = songsReducer(initialState, createSongStart());
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('should handle createSongSuccess', () => {
    const song = { id: 1, title: 'New Song' };
    const state = songsReducer(initialState, createSongSuccess(song));
    expect(state).toEqual({
      ...initialState,
      songs: [song],
      total: 1,
      loading: false,
      isAddEditModalOpen: false,
    });
  });

  it('should handle createSongFailure', () => {
    const error = 'Failed to create';
    const state = songsReducer(initialState, createSongFailure(error));
    expect(state).toEqual({ ...initialState, error, loading: false });
  });

  it('should handle updateSongStart', () => {
    const state = songsReducer(initialState, updateSongStart());
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('should handle updateSongSuccess', () => {
    const initial = { ...initialState, songs: [{ id: 1, title: 'Old Song' }] };
    const updatedSong = { id: 1, title: 'Updated Song' };
    const state = songsReducer(initial, updateSongSuccess(updatedSong));
    expect(state).toEqual({
      ...initial,
      songs: [updatedSong],
      loading: false,
      isAddEditModalOpen: false,
      selectedSong: null,
    });
  });

  it('should handle deleteSongStart', () => {
    const state = songsReducer(initialState, deleteSongStart());
    expect(state).toEqual({ ...initialState, loading: true, error: null });
  });

  it('should handle deleteSongSuccess', () => {
    const initial = { ...initialState, songs: [{ id: 1, title: 'Song' }], total: 1 };
    const state = songsReducer(initial, deleteSongSuccess(1));
    expect(state).toEqual({
      ...initial,
      songs: [],
      total: 0,
      loading: false,
      isDeleteModalOpen: false,
      selectedSong: null,
    });
  });

  it('should handle setPage', () => {
    const state = songsReducer(initialState, setPage(2));
    expect(state).toEqual({ ...initialState, page: 2 });
  });

  it('should handle setLimit', () => {
    const state = songsReducer(initialState, setLimit(20));
    expect(state).toEqual({ ...initialState, limit: 20, page: 1 });
  });

  it('should handle setView', () => {
    const state = songsReducer(initialState, setView('table'));
    expect(state).toEqual({ ...initialState, view: 'table' });
  });

  it('should handle setSearch', () => {
    const state = songsReducer(initialState, setSearch('test'));
    expect(state).toEqual({ ...initialState, search: 'test', page: 1 });
  });

  it('should handle setSort', () => {
    const state = songsReducer(initialState, setSort({ sortBy: 'year', sortOrder: 'desc' }));
    expect(state).toEqual({ ...initialState, sortBy: 'year', sortOrder: 'desc' });
  });

  it('should handle openAddEditModal', () => {
    const song = { id: 1, title: 'Song' };
    const state = songsReducer(initialState, openAddEditModal(song));
    expect(state).toEqual({ ...initialState, isAddEditModalOpen: true, selectedSong: song });
  });

  it('should handle closeAddEditModal', () => {
    const initial = { ...initialState, isAddEditModalOpen: true, selectedSong: { id: 1 } };
    const state = songsReducer(initial, closeAddEditModal());
    expect(state).toEqual({ ...initial, isAddEditModalOpen: false, selectedSong: null });
  });

  it('should handle openDeleteModal', () => {
    const song = { id: 1, title: 'Song' };
    const state = songsReducer(initialState, openDeleteModal(song));
    expect(state).toEqual({ ...initialState, isDeleteModalOpen: true, selectedSong: song });
  });

  it('should handle closeDeleteModal', () => {
    const initial = { ...initialState, isDeleteModalOpen: true, selectedSong: { id: 1 } };
    const state = songsReducer(initial, closeDeleteModal());
    expect(state).toEqual({ ...initial, isDeleteModalOpen: false, selectedSong: null });
  });
});
