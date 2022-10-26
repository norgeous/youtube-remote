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
      <hr />
      <div id="player"/> 
      <PlayerControls />
      <hr />
      title: {player?.videoTitle}<br/>
      state: {playerState}<br/>
      <hr />
      <Playlist />
      <hr />
      <SearchResults />
    </>
  );
};

export default App;
