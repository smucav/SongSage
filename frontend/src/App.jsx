import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SongList from './components/SongList';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <SongList />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
