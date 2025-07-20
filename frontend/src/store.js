import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './features/songs/songsSlice';
import songSaga from './features/songs/songsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songSaga);

export default store;
