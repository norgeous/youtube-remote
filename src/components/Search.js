import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const predefinedSearchterms = [
  'sasasas',
  'czarface',
  'mfdoom',
  'luude',
  'mungos hifi',
  'hello world',
  'black coffee',
];

const Search = () => {
  const {
    inputValue, setInputValue,
    search, searchLoading,
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
    </>
  );
};

export default Search;
