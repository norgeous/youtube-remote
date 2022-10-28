import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';
import Search from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import PlayerControls from './PlayerControls';

const Layout = styled.div`
  display: grid;
  gap: 10px;
  /* align-items: center; */
  padding: 0 10px;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`;

const App = () => {
  const {
    player,
  } = useAppContext();

  return (
    <>
      <div id="player"/>
      <PlayerControls />
      <h1 style={{ fontSize: 20 }}>
        {player?.videoTitle || <>&nbsp;</>}
      </h1>
      <Layout>
        <Playlist />
        <div>
          <Search />
          <SearchResults />
        </div>
      </Layout>
    </>
  );
};

export default App;
