import React, { createContext, useContext, useState } from 'react';

import useYouTubeIframeApi from '../hooks/useYoutubeIframeApi';
import useScrapedYouTubeSearch from '../hooks/useScrapedYouTubeSearch';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [player, playerState, volume, currentTime] = useYouTubeIframeApi('player');
  const [inputValue, setInputValue] = useState('');
  const [search, results, searchLoading] = useScrapedYouTubeSearch();

  return (
    <AppContext.Provider
      value={{
        player, playerState, volume, currentTime,
        inputValue, setInputValue,
        search, results, searchLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
