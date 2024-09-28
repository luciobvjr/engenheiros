import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../components/feature_buscar';

describe('SearchBar Component', () => {
  it('renders the search input correctly', () => {
    render(<SearchBar onSearch={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search for activities or users...');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls the onSearch function when typing in the input', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search for activities or users...');
    fireEvent.change(searchInput, { target: { value: 'yoga' } });

    expect(mockOnSearch).toHaveBeenCalledWith('yoga');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('updates the input value when the user types', () => {
    render(<SearchBar onSearch={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search for activities or users...');
    fireEvent.change(searchInput, { target: { value: 'english' } });

    expect(searchInput).toHaveValue('english');
  });
});
