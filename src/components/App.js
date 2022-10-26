import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Search from './Search';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import PlayerControls from './PlayerControls';

const App = () => {
  const {
    player,
    playerState,
  } = useAppContext();

  return (
    <>
      <Search />
      <br />
      <br />
      <div id="player"/>
      <br />
      <PlayerControls />
      <br />
      {player?.videoTitle} [{playerState}]<br/>
      <br />
      <Playlist />
      <br />
      <SearchResults />
    </>
  );
};

export default App;
