import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
`;

function App() {
  return (
    <Container>
      <Title>Welcome to SongSage!</Title>
    </Container>
  );
}

export default App;
