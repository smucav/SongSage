import songsReducer, {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure
} from './songsSlice';

describe('songsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10
  };

  it('should handle initial state', () => {
    expect(songsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchSongsRequest', () => {
    const action = fetchSongsRequest({ page: 2, limit: 5 });
    const state = songsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.page).toBe(2);
    expect(state.limit).toBe(5);
  });

  it('should handle fetchSongsSuccess', () => {
    const songs = [{ id: 1, title: 'Test' }];
    const action = fetchSongsSuccess(songs);
    const state = songsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(songs);
  });

  it('should handle fetchSongsFailure', () => {
    const action = fetchSongsFailure('Error!');
    const state = songsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error!');
  });
});
