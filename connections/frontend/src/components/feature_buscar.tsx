import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);  // Chama a função de busca passada via props
  };

  return (
    <input
      type="text"
      placeholder="Search for activities or users..."
      value={query}
      onChange={handleChange}
      style={{ margin: '10px', padding: '5px' }}
    />
  );
};

export default SearchBar;

