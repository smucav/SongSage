import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from './songsSlice';

function* fetchSongs(action) {
  try {
    const { page, limit } = action.payload;
    const res = yield call(fetch, `${process.env.API_BASE_URL}/songs?page=${page}&limit=${limit}`);
    const data = yield res.json();
    console.log("API response", data)
    yield put(fetchSongsSuccess(data));
  } catch (err) {
    yield put(fetchSongsFailure(err.toString()));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
}
