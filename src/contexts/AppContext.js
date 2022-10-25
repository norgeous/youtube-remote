import React, { createContext, useContext } from 'react';

import useYouTubeIframeApi from '../hooks/useYoutubeIframeApi';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const YT = useYouTubeIframeApi();

  return (
    <AppContext.Provider
      value={{
        test: 10,
        YT,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
