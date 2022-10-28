import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../contexts/AppContext';
import EmojiButton from './EmojiButton';

const predefinedSearchterms = [
  'sasasas',
  'czarface',
  'mfdoom',
  'luude',
  'mungos hifi',
  'hello world',
  'black coffee',
];

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 25px;
  border-radius: 0;
  border: 0;
`;

const Search = () => {
  const {
    inputValue, setInputValue,
    search, searchLoading,
  } = useAppContext();

  return (
    <Container>
      <Input
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
      <EmojiButton onClick={() => setInputValue('')}>❎</EmojiButton>
      <EmojiButton onClick={() => search(inputValue)} spin={searchLoading}>
        {searchLoading ? '🌀' : '🔍'}
      </EmojiButton>
    </Container>
  );
};

export default Search;
