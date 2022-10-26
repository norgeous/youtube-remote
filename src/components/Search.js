import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const predefinedSearchterms = [
  'sasasas',
  'czarface',
  'mfdoom',
  'luude',
  'mungos hifi',
];

const Search = () => {
  const {
    player,
    inputValue, setInputValue,
    search, results, searchLoading,
  } = useAppContext();

  return (
    <>
      <input
        type="text"
        list="suggestions"
        placeholder="Search..."
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <datalist id="suggestions">
        {predefinedSearchterms.map(term => (
          <option value={term}>{term}</option>
        ))}
      </datalist>
      <button onClick={() => setInputValue('')}>❎</button>
      <button onClick={() => search(inputValue)}>
        {searchLoading ? '🌀' : '🔍'}
      </button>

      <div>
        {results.map(id => (
          <button onClick={() => player.loadVideoById(id)}>
            <img src={`https://i.ytimg.com/vi/${id}/default.jpg`} />
            <br />
            {id}
          </button>
        ))}
      </div>
    </>
  );
};

export default Search;
