import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';
import Search from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import PlayerControls from './PlayerControls';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  height: 100vh;
  border: 1px solid #0ff;
  box-sizing: border-box;
`;

const Columns = styled.div`
  flex-shrink: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  height: calc(100% - 133px);
`;

const Right = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const App = () => {
  const {
    player,
  } = useAppContext();

  return (
    <>
      <div id="player"/>
      <Layout>
        <h1 style={{ fontSize: 20 }}>
          {player?.videoTitle || <>&nbsp;</>}
        </h1>
        <PlayerControls />
        <Columns>
          <Playlist />
          <Right>
            <Search />
            <SearchResults />
          </Right>
        </Columns>
      </Layout>
    </>
  );
};

export default App;
