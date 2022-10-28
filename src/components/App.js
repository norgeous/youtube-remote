import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Search from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import PlayerControls from './PlayerControls';

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
      <Playlist />
      <Search />
      <SearchResults />
    </>
  );
};

export default App;
