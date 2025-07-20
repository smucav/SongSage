import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SongCard from './SongCard';
import SongTable from './SongTable';
import SongForm from './SongForm';
import DeleteConfirmModal from './DeleteConfirmModal';
import {
  fetchSongsStart,
  setPage,
  setLimit,
  setView,
  setSearch,
  setSort,
  openAddEditModal,
} from '../features/songs/songsSlice';
import { lightTheme, darkTheme } from '../styles/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 24px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  transition: all 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 12px;
`;

const SearchInput = styled.input`
  padding: 12px;
  width: 220px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: 400;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 8px rgba(38, 166, 154, 0.2);
  }
`;

const ToggleButton = styled.button`
  padding: 12px 24px;
  background-color: ${(props) => props.theme.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AddButton = styled(ToggleButton)`
  background-color: ${(props) => props.theme.secondary};
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: 400;
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`;

const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? props.theme.heading : props.theme.primary)};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:disabled {
    background-color: ${(props) => props.theme.border};
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

function SongList() {
  const dispatch = useDispatch();
  const { songs, loading, error, page, limit, view, search, sortBy, sortOrder } = useSelector(
    (state) => state.songs
  );
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    console.log('Fetching songs with params:', { page, limit, search });
    dispatch(fetchSongsStart({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleSort = (e) => {
    const [sortBy, sortOrder] = e.target.value.split(':');
    console.log('Sorting with:', { sortBy, sortOrder });
    dispatch(setSort({ sortBy, sortOrder }));
  };

  const handleAddSong = () => {
    if (typeof openAddEditModal === 'function') {
      console.log('Opening add/edit modal');
      dispatch(openAddEditModal());
    } else {
      console.error('openAddEditModal is not a function:', openAddEditModal);
      toast.error('Failed to open add song modal');
    }
  };

  const sortedSongs = [...songs].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortBy === 'year') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const totalPages = Math.ceil(songs.length / limit);

  return (
    <Container theme={theme}>
      <Header>
        <SearchInput
          type="text"
          placeholder="Search by title or artist..."
          value={search}
          onChange={handleSearch}
        />
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Select onChange={handleSort} value={`${sortBy}:${sortOrder}`}>
            <option value="title:asc">Title (A-Z)</option>
            <option value="title:desc">Title (Z-A)</option>
            <option value="year:asc">Year (Oldest)</option>
            <option value="year:desc">Year (Newest)</option>
          </Select>
          <ToggleButton onClick={() => dispatch(setView(view === 'cards' ? 'table' : 'cards'))}>
            {view === 'cards' ? 'Table View' : 'Card View'}
          </ToggleButton>
          <ToggleButton onClick={toggleTheme}>
            {theme === lightTheme ? 'Dark Mode' : 'Light Mode'}
          </ToggleButton>
          <AddButton onClick={handleAddSong}>Add Song</AddButton>
        </div>
      </Header>

      {loading && <p style={{ fontSize: '16px', color: theme.text }}>Loading...</p>}
      {view === 'cards' ? (
        <CardGrid
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {sortedSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </CardGrid>
      ) : (
        <SongTable songs={sortedSongs} />
      )}

      <Pagination>
        <PageButton
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page === 1}
        >
          Previous
        </PageButton>
        <span style={{ fontSize: '16px', color: theme.text }}>
          Page {page} of {totalPages || 1}
        </span>
        <PageButton
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page >= totalPages}
        >
          Next
        </PageButton>
        <Select
          value={limit}
          onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </Select>
      </Pagination>

      <SongForm />
      <DeleteConfirmModal />
    </Container>
  );
}

export default SongList;
