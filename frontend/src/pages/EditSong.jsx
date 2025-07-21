import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Modal from '../components/Modal';
import UpdateConfirmModal from '../components/UpdateConfirmModal';
import Button from '../components/Button';

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
  const [isOpen, setIsOpen] = useState(true);
  const [song, setSong] = useState({
    title: '',
    artist: '',
    album: '',
    year: '',
    genre: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateModal, setUpdateModal] = useState({ isOpen: false, success: false, message: '' });

  useEffect(() => {
    fetch(`${process.env.API_BASE_URL}/songs?page=1&limit=100`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(s => s.id === parseInt(id));
        if (found) {
          setSong(found);
          setLoading(false);
        } else {
          setUpdateModal({
            isOpen: true,
            success: false,
            message: 'Song not found',
          });
        }
      })
      .catch(() => {
        setUpdateModal({
          isOpen: true,
          success: false,
          message: 'Error fetching song',
        });
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setSong(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(`${process.env.API_BASE_URL}/songs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...song, id: parseInt(id), year: parseInt(song.year) }),
    });
    setSubmitting(false);
    if (res.ok) {
      setUpdateModal({
        isOpen: true,
        success: true,
        message: 'Song updated successfully!',
      });
    } else {
      setUpdateModal({
        isOpen: true,
        success: false,
        message: 'Error updating song.',
      });
    }
  };

  const handleCloseUpdateModal = () => {
    setUpdateModal({ isOpen: false, success: false, message: '' });
    if (updateModal.success || updateModal.message.includes('not found') || updateModal.message.includes('Error fetching')) {
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
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {submitting ? 'Updating...' : 'Update Song'}
          </Button>
        </Form>
      </Modal>
      <UpdateConfirmModal
        isOpen={updateModal.isOpen}
        success={updateModal.success}
        songTitle={song.title}
        message={updateModal.message}
        onClose={handleCloseUpdateModal}
      />
    </>
  );
}
