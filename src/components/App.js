import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const App = () => {
  const {
    test,
    YT
  } = useAppContext();

  return (
    <>
      new app {test}
      {typeof YT}
    </>
  );
};

export default App;
