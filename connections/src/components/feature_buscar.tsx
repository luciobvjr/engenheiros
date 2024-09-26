// src/components/SearchBar.tsx

import React, { useState } from 'react';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  description: string;
}

interface SearchBarProps {
  activities: Activity[];
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ activities, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for activities or users..."
        value={query}
        onChange={handleChange}
        style={{ margin: '10px', padding: '5px' }}
      />
      <ul>
        {activities
          .filter(activity => activity.name.toLowerCase().includes(query.toLowerCase()))
          .map(activity => (
            <li key={activity.id}>{activity.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
