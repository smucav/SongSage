import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../features/songs/songsSlice';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SongCard from '../components/SongCard';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Button from '../components/Button';
import { FaPlus } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.text};
`;

const SkeletonCard = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  height: 200px;
  animation: pulse 1.5s infinite;
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

export default function SongList() {
  const dispatch = useDispatch();
  const { items, loading, page, limit } = useSelector(state => state.songs);
  const [search, setSearch] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    dispatch(fetchSongsRequest({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDeleteInitiate = (song) => {
    setSelectedSong(song);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSong) return;
    const res = await fetch(`${process.env.API_BASE_URL}/songs/${selectedSong.id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Deleted!');
      dispatch(fetchSongsRequest({ page, limit }));
    } else {
      alert('Error deleting.');
    }
    setIsDeleteModalOpen(false);
    setSelectedSong(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedSong(null);
  };

  const handlePrev = () => {
    if (page > 1) {
      dispatch(fetchSongsRequest({ page: page - 1, limit }));
    }
  };

  const handleNext = () => {
    dispatch(fetchSongsRequest({ page: page + 1, limit }));
    setSearch('');
  };

  const filteredSongs = items.filter(
    song =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="p-4">
      <Header>
        <h1 className="text-3xl font-bold text-gray-800">Song List</h1>
        <div className="flex items-center gap-4">
          <SearchBar
            type="text"
            placeholder="Search by title or artist..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button as={Link} to="/add" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <FaPlus /> Add Song
          </Button>
        </div>
      </Header>
      {loading ? (
        <Grid>
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      ) : (
        <Grid>
          {filteredSongs.map(song => (
            <SongCard key={song.id} song={song} onDelete={() => handleDeleteInitiate(song)} />
          ))}
        </Grid>
      )}
      <Pagination>
        <Button onClick={handlePrev} disabled={page === 1} className="bg-gray-600 hover:bg-gray-700">
          Previous
        </Button>
        <span className="text-gray-800">Page {page}</span>
        <Button onClick={handleNext} disabled={items.length < limit} className="bg-gray-600 hover:bg-gray-700">
          Next
        </Button>
      </Pagination>
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        songTitle={selectedSong?.title || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Container>
  );
}
