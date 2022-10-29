import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const SearchResults = () => {
  const {
    addToPlaylist,
    results,
  } = useAppContext();

  return (
    <div>
      {results.map(id => (
        <button onClick={() => addToPlaylist(id)}>
          <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} />
          <br />
          {id}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
