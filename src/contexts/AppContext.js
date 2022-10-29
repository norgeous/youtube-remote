import React, { createContext, useContext, useState, useEffect } from 'react';
import useYouTubeIframeApi from '../hooks/useYoutubeIframeApi';
import useScrapedYouTubeSearch from '../hooks/useScrapedYouTubeSearch';

const AppContext = createContext({});

const playlists = [
  'RDCLAK5uy_ldlwpMghzMwGCDSOA4Kw6TrOCXDaqXQMo', // grime hotlist (youtube music)
];

const defaultPlaylist = [
  'Tk6Dbnzpzns', // coffee
  'W-59sWasI98', // trombone
  'bMaN0rgPs4c', // mackey gee
  'fYiuDNUeDRM', // luude
  'VjcV_s9EyBU', // lava lamp
  'VRN-1NSR4gk', // 4k
  '0ZBqnOeIxbQ', // 8k
  'vqklX3PTajo', // fireplace
  'aGSYKFb_zxg', // lofi livesteam
  'jfKfPfyJRdk', // lofi livesteam
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
