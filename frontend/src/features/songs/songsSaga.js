import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from './songsSlice';

function* fetchSongs(action) {
  try {
    const { page, limit } = action.payload;
    const res = yield call(fetch, `https://songsage-production.up.railway.app/songs?page=${page}&limit=${limit}`);
    const data = yield res.json();
    yield put(fetchSongsSuccess(data));
  } catch (err) {
    yield put(fetchSongsFailure(err.toString()));
  }
}

function* fetchSong(action) {
  try {
    const { id } = action.payload;
    const res = yield call(fetch, `https://songsage-production.up.railway.app/songs?page=1&limit=100`);
    const data = yield res.json();
    const song = data.find(s => s.id === parseInt(id));
    if (song) {
      yield put(fetchSongSuccess(song));
    } else {
      yield put(fetchSongFailure('Song not found'));
    }
  } catch (err) {
    yield put(fetchSongFailure(err.toString()));
  }
}

function* addSong(action) {
  try {
    const song = action.payload;
    const res = yield call(fetch, `https://songsage-production.up.railway.app/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    const data = yield res.json();
    yield put(addSongSuccess(data));
  } catch (err) {
    yield put(addSongFailure(err.toString()));
  }
}

function* updateSong(action) {
  try {
    const song = action.payload;
    const res = yield call(fetch, `https://songsage-production.up.railway.app/songs/${song.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    const data = yield res.json();
    yield put(updateSongSuccess(data));
  } catch (err) {
    yield put(updateSongFailure(err.toString()));
  }
}

function* deleteSong(action) {
  try {
    const id = action.payload;
    yield call(fetch, `https://songsage-production.up.railway.app/songs/${id}`, {
      method: 'DELETE',
    });
    yield put(deleteSongSuccess(id));
  } catch (err) {
    yield put(deleteSongFailure(err.toString()));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(fetchSongRequest.type, fetchSong);
  yield takeLatest(addSongRequest.type, addSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}
