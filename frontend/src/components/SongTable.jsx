import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { openAddEditModal, openDeleteModal } from '../features/songs/songsSlice';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${(props) => props.theme.cardBackground};
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.heading};
  font-size: 18px;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: 400;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
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

function SongTable({ songs }) {
  const dispatch = useDispatch();

  return (
    <Table>
      <thead>
        <tr>
          <Th>Title</Th>
          <Th>Artist</Th>
          <Th>Album</Th>
          <Th>Year</Th>
          <Th>Genre</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song) => (
          <tr key={song.id}>
            <Td>{song.title}</Td>
            <Td>{song.artist}</Td>
            <Td>{song.album}</Td>
            <Td>{song.year}</Td>
            <Td>{song.genre || 'N/A'}</Td>
            <Td>
              <Button onClick={() => dispatch(openAddEditModal(song))}>Edit</Button>
              <Button danger onClick={() => dispatch(openDeleteModal(song))}>
                Delete
              </Button>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SongTable;
