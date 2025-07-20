import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openAddEditModal, openDeleteModal } from '../features/songs/songsSlice';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  color: ${(props) => props.theme.heading};
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
`;

const Text = styled.p`
  color: ${(props) => props.theme.text};
  margin: 4px 0;
  font-size: 16px;
  font-weight: 400;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 4px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: ${(props) => (props.danger ? props.theme.secondary : props.theme.primary)};
  color: #ffffff;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

function SongCard({ song }) {
  const dispatch = useDispatch();

  return (
    <Card>
      <Title>{song.title}</Title>
      <Text>Artist: {song.artist}</Text>
      <Text>Album: {song.album}</Text>
      <Text>Year: {song.year}</Text>
      <Text>Genre: {song.genre || 'N/A'}</Text>
      <div>
        <Button onClick={() => dispatch(openAddEditModal(song))}>Edit</Button>
        <Button danger onClick={() => dispatch(openDeleteModal(song))}>
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default SongCard;
