import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Button from './Button';
import { space } from 'styled-system';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: ${props => props.theme.space[4]}px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  ${space}
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.space[3]}px;
`;

export default function AddConfirmModal({ isOpen, success, songTitle, message, onClose }) {
  if (!isOpen) return null;

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className={`text-xl font-bold mb-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
          {success ? 'Success' : 'Error'}
        </h2>
        <p className="text-gray-600 mb-4">
          {message} {success && songTitle && <strong>{songTitle}</strong>}
        </p>
        <ButtonGroup>
          <Button
            onClick={onClose}
            className={success ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}
          >
            OK
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
}
