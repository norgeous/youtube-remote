import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const SearchResults = () => {
  const {
    setPlaylist,
    results, searchLoading,
  } = useAppContext();

  if (searchLoading) return 'Loading';

  return (
    <div>
      {results.map(id => (
        <button onClick={() => setPlaylist([id])}>
          <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} />
          <br />
          {id}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
