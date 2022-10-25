import React, { createContext, useContext } from 'react';

import useYouTubeIframeApi from '../hooks/useYoutubeIframeApi';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [player, playerState, volume, currentTime] = useYouTubeIframeApi('player');

  return (
    <AppContext.Provider
      value={{
        player, playerState, volume, currentTime
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
