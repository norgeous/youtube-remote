import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import styled from 'styled-components';

const List = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  margin: 0;
  padding: 0;
  color: white;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const Playlist = () => {
  const {
    playlist,
    playlistPlayheadIndex,
    setPlaylistPlayheadIndex,
  } = useAppContext();

  return (
    <List>
      {playlist.map((id, index) => (
        <Item onClick={() => setPlaylistPlayheadIndex(index)}>
          {playlistPlayheadIndex === index && '👉'}
          <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} width="80" />
          {id}
        </Item>
      ))}
    </List>
  );
};

export default Playlist;
