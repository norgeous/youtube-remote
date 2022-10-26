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
      <Search />
      <br />
      <br />
      <div id="player"/>
      <br />
      <PlayerControls />
      <br />
      {player?.videoTitle}<br/>
      <br />
      <Playlist />
      <br />
      <SearchResults />
    </>
  );
};

export default App;
