import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Modal from '../components/Modal';
import UpdateConfirmModal from '../components/UpdateConfirmModal';
import Button from '../components/Button';
import { fetchSongRequest, updateSongRequest, clearOperation } from '../features/songs/songsSlice';

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

export default function EditSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentSong, loading, error, operation } = useSelector(state => state.songs);
  const [isOpen, setIsOpen] = useState(true);
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
  });

  useEffect(() => {
    dispatch(fetchSongRequest({ id }));
    return () => {
      dispatch(clearOperation());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentSong && currentSong.id === parseInt(id)) {
      setSong(currentSong);
    }
  }, [currentSong, id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setSong(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateSongRequest({ ...song, id: parseInt(id), year: parseInt(song.year) }));
  };

  const handleCloseUpdateModal = () => {
    dispatch(clearOperation());
    if (operation.success || error) {
      navigate('/');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => navigate('/')}>
        <h2 className="text-2xl font-bold mb-4">Edit Song</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            name="title"
            placeholder="Title"
            value={song.title}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="artist"
            placeholder="Artist"
            value={song.artist}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="album"
            placeholder="Album"
            value={song.album}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="year"
            type="number"
            placeholder="Year"
            value={song.year}
            onChange={handleChange}
            required
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Input
            name="genre"
            placeholder="Genre"
            value={song.genre}
            onChange={handleChange}
            className="focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={operation.loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {operation.loading ? 'Updating...' : 'Update Song'}
          </Button>
        </Form>
      </Modal>
      <UpdateConfirmModal
        isOpen={operation.type === 'update' && (operation.success || operation.error) || error}
        success={operation.success && !error}
        songTitle={song.title}
        message={operation.success ? 'Song updated successfully!' : operation.error || error || 'Error updating song.'}
        onClose={handleCloseUpdateModal}
      />
    </>
  );
}
