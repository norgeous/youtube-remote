import React, { createContext, useContext, useState } from 'react';
import useYouTubeIframeApi from '../hooks/useYoutubeIframeApi';
import useScrapedYouTubeSearch from '../hooks/useScrapedYouTubeSearch';

const AppContext = createContext({});

const defaultPlaylist = [
  'W-59sWasI98',
  'bMaN0rgPs4c',
  'fYiuDNUeDRM',
];

export const AppProvider = ({ children }) => {
  const [player, playerState, volume, currentTime] = useYouTubeIframeApi('player');
  const [playlist, setPlaylist] = useState(defaultPlaylist);
  const [inputValue, setInputValue] = useState('');
  const [search, results, searchLoading] = useScrapedYouTubeSearch();

  return (
    <AppContext.Provider
      value={{
        player, playerState, volume, currentTime,
        playlist, setPlaylist,
        inputValue, setInputValue,
        search, results, searchLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
