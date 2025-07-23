import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Modal from '../components/Modal';
import AddConfirmModal from '../components/AddConfirmModal';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { addSongRequest, clearOperation } from '../features/songs/songsSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.space[3]}px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

export default function AddSong() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { operation } = useSelector(state => state.songs);
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearOperation());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const song = { title, artist, album, year: parseInt(year), genre };
    dispatch(addSongRequest(song));
  };

  const handleCloseAddModal = () => {
    dispatch(clearOperation());
    if (operation.success) {
      setTitle('');
      setArtist('');
      setAlbum('');
      setYear('');
      setGenre('');
      navigate('/');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => navigate('/')}>
        <h2 className="text-2xl font-bold mb-4">Add Song</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="text"
            placeholder="Album"
            value={album}
            onChange={e => setAlbum(e.target.value)}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="number"
            placeholder="Year"
            value={year}
            onChange={e => setYear(e.target.value)}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={operation.loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {operation.loading ? 'Adding...' : 'Add Song'}
          </Button>
        </Form>
      </Modal>
      <AddConfirmModal
        isOpen={operation.type === 'add' && (operation.success || operation.error)}
        success={operation.success}
        songTitle={title}
        message={operation.success ? 'Song added successfully!' : operation.error || 'Error adding song.'}
        onClose={handleCloseAddModal}
      />
    </>
  );
}
