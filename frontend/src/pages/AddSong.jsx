import React, { useState } from 'react';
import styled from '@emotion/styled';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

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
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const song = { title, artist, album, year: parseInt(year), genre };
    const res = await fetch(`${process.env.API_BASE_URL}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    setSubmitting(false);
    if (res.ok) {
      alert('Song added!');
      navigate('/');
    } else {
      alert('Error adding song.');
    }
  };

  return (
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
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {submitting ? 'Adding...' : 'Add Song'}
        </Button>
      </Form>
    </Modal>
  );
}
