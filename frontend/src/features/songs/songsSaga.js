import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './songsSlice';

function* fetchSongsSaga(action) {
  try {
    const { page, limit, search } = action.payload;
    const response = yield call(
      axios.get,
      `${process.env.API_BASE_URL}/songs?page=${page}&limit=${limit}`
    );
    let songs = response.data;

    // Client-side filtering for search
    if (search) {
      songs = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(search.toLowerCase()) ||
          song.artist.toLowerCase().includes(search.toLowerCase())
      );
    }

    yield put(fetchSongsSuccess({ songs, total: songs.length }));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSongSaga(action) {
  try {
    const response = yield call(
      axios.post,
      `${process.env.API_BASE_URL}/songs`,
      action.payload
    );
    yield put(createSongSuccess(response.data));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

function* updateSongSaga(action) {
  try {
    const { id, ...data } = action.payload;
    const response = yield call(
      axios.put,
      `${process.env.API_BASE_URL}/songs/${id}`,
      action.payload
    );
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(action) {
  try {
    yield call(axios.delete, `${process.env.API_BASE_URL}/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export default function* songSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
  yield takeLatest(createSongStart.type, createSongSaga);
  yield takeLatest(updateSongStart.type, updateSongSaga);
  yield takeLatest(deleteSongStart.type, deleteSongSaga);
}
