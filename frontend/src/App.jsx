import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SongList from './pages/SongList';
import AddSong from './pages/AddSong';
import EditSong from './pages/EditSong';
import styled from '@emotion/styled';

const Container = styled.div`
  font-family: 'Inter', sans-serif;
  background-color: ${props => props.theme.colors.background};
  min-height: 100vh;
  padding: 2rem;
`;

export default function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/add" element={<AddSong />} />
        <Route path="/edit/:id" element={<EditSong />} />
      </Routes>
    </Container>
  );
}
