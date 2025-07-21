import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
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
  max-width: 500px;
  width: 90%;
  ${space}
`;

export default function Modal({ isOpen, onClose, children }) {
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
        {children}
      </ModalContent>
    </Overlay>
  );
}
