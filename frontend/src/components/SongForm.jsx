import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  createSongStart,
  updateSongStart,
  closeAddEditModal,
} from '../features/songs/songsSlice';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  padding: 24px;
  width: 100%;
  max-width: 600px;
  height: 100%;
  border-radius: 12px 0 0 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  background: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 8px rgba(38, 166, 154, 0.2);
  }
`;

const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 14px;
  font-weight: 400;
  margin: 4px 0 0;
`;

const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: ${(props) => (props.cancel ? props.theme.primary : props.theme.secondary)};
  color: #ffffff;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.heading};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px;
`;

function SongForm() {
  const dispatch = useDispatch();
  const { isAddEditModalOpen, selectedSong } = useSelector((state) => state.songs);
  const [formData, setFormData] = useState({
    title: selectedSong?.title || '',
    artist: selectedSong?.artist || '',
    album: selectedSong?.album || '',
    year: selectedSong?.year || '',
    genre: selectedSong?.genre || '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.artist) newErrors.artist = 'Artist is required';
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1900 || formData.year > 2025) {
      newErrors.year = 'Year must be between 1900 and 2025';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const songData = {
      ...formData,
      year: Number(formData.year),
      id: selectedSong?.id || undefined,
    };

    if (selectedSong) {
      dispatch(updateSongStart(songData));
      toast.success('Song updated!');
    } else {
      dispatch(createSongStart(songData));
      toast.success('Song added!');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  if (!isAddEditModalOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ModalContent
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <Title>{selectedSong ? 'Edit Song' : 'Add Song'}</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <ErrorText>{errors.title}</ErrorText>}
          </div>
          <div>
            <Input
              type="text"
              name="artist"
              placeholder="Artist"
              value={formData.artist}
              onChange={handleChange}
            />
            {errors.artist && <ErrorText>{errors.artist}</ErrorText>}
          </div>
          <div>
            <Input
              type="text"
              name="album"
              placeholder="Album"
              value={formData.album}
              onChange={handleChange}
            />
          </div>
          <div>
            <Input
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
            />
            {errors.year && <ErrorText>{errors.year}</ErrorText>}
          </div>
          <div>
            <Input
              type="text"
              name="genre"
              placeholder="Genre (optional)"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button type="submit">Save</Button>
            <Button cancel onClick={() => dispatch(closeAddEditModal())}>
              Cancel
            </Button>
          </div>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default SongForm;
