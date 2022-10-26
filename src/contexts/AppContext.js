import React, { createContext, useContext, useState, useEffect } from 'react';
import useYouTubeIframeApi from '../hooks/useYoutubeIframeApi';
import useScrapedYouTubeSearch from '../hooks/useScrapedYouTubeSearch';

const AppContext = createContext({});

const defaultPlaylist = [
  'Tk6Dbnzpzns',
  'W-59sWasI98',
  'bMaN0rgPs4c',
  'fYiuDNUeDRM',
  'VjcV_s9EyBU',
];

export const AppProvider = ({ children }) => {
  const [player, playerState, volume, currentTime] = useYouTubeIframeApi('player');
  const [playlistPlayheadIndex, setPlaylistPlayheadIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [search, results, searchLoading] = useScrapedYouTubeSearch();
  const [playlist, setPlaylist] = useState(defaultPlaylist);

  const addToPlaylist = newId => setPlaylist(oldPlaylist => [...oldPlaylist, newId]);

  useEffect(() => {
    if (player) {
      player.loadVideoById(playlist[playlistPlayheadIndex]);
    }
  }, [player, playlistPlayheadIndex]);

  useEffect(() => {
    if (playerState === 'ENDED') setPlaylistPlayheadIndex(playlistPlayheadIndex + 1);
  }, [playerState]);

  return (
    <AppContext.Provider
      value={{
        player, playerState, volume, currentTime,
        playlist, setPlaylist, addToPlaylist,
        playlistPlayheadIndex, setPlaylistPlayheadIndex,
        inputValue, setInputValue,
        search, results, searchLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
