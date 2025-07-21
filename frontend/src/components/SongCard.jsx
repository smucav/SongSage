import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { space, color } from 'styled-system';

const Card = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  border-radius: 8px;
  padding: ${props => props.theme.space[3]}px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  ${space}
  ${color}
`;

const Title = styled.h3`
  font-size: ${props => props.theme.fontSizes[3]}px;
  margin-bottom: ${props => props.theme.space[2]}px;
`;

const Info = styled.p`
  font-size: ${props => props.theme.fontSizes[1]}px;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.space[2]}px;
  margin-top: ${props => props.theme.space[3]}px;
`;

const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  padding: ${props => props.theme.space[2]}px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export default function SongCard({ song, onDelete }) {
  return (
    <Card
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Title>{song.title}</Title>
      <Info>Artist: {song.artist}</Info>
      <Info>Album: {song.album}</Info>
      <Info>Year: {song.year}</Info>
      <Info>Genre: {song.genre || 'N/A'}</Info>
      <ButtonGroup>
        <IconButton as={Link} to={`/edit/${song.id}`}>
          <FaEdit />
        </IconButton>
        <IconButton onClick={() => onDelete(song.id)}>
          <FaTrash />
        </IconButton>
      </ButtonGroup>
    </Card>
  );
}
