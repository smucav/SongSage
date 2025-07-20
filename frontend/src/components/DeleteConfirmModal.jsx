import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { deleteSongStart, closeDeleteModal } from '../features/songs/songsSlice';
import { toast } from 'react-toastify';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${(props) => props.theme.cardBackground};
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  color: #3f51b5;
  font-size: 20px;
  margin: 0 0 16px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s ease;
  background-color: ${(props) => (props.danger ? '#9c27b0' : '#26a69a')};
  color: white;
  &:hover {
    transform: scale(1.05);
  }
`;

function DeleteConfirmModal() {
  const dispatch = useDispatch();
  const { isDeleteModalOpen, selectedSong } = useSelector((state) => state.songs);

  const handleDelete = () => {
    dispatch(deleteSongStart(selectedSong.id));
    toast.success('Song deleted!');
  };

  if (!isDeleteModalOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ModalContent
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Delete {selectedSong.title}?</Title>
        <p style={{ color: '#212121', fontSize: '16px' }}>
          Are you sure you want to delete this song?
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={() => dispatch(closeDeleteModal())}>Cancel</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

export default DeleteConfirmModal;
