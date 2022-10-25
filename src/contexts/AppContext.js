import React, { createContext, useContext } from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider
      value={{
        test: 10,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
