import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const App = () => {
  const {
    test,
  } = useAppContext();

  return (
    <>
      new app {test}
    </>
  );
};

export default App;
