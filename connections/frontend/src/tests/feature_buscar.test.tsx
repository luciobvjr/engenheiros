import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../components/feature_buscar';

describe('SearchBar Component', () => {
  const mockActivities = [ // Mock para as atividades
    { id: '1', name: 'Yoga Class', place: 'Gym', time: '10:00 AM', price: "25.00", description: 'A relaxing yoga class.' },
    { id: '2', name: 'English Course', place: 'School', time: '1:00 PM', price: "25.00", description: 'Learn English.' },
    { id: '3', name: 'Spanish Course', place: 'Online', time: '3:00 PM', price: "25.00",description: 'Learn Spanish.' },
  ];

  it('renders the search input correctly', () => {
    render(<SearchBar activities={mockActivities} onSearch={() => {}} />);

    // Verifica se o input de busca está no documento
    const searchInput = screen.getByPlaceholderText('Search for activities or users...');
    expect(searchInput).toBeTruthy();
  });

  it('calls the onSearch function when typing in the input', () => {
    const mockOnSearch = jest.fn(); // Cria uma função mock para verificar se foi chamada
    render(<SearchBar activities={mockActivities} onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search for activities or users...');
    
    // Simula a digitação no campo de busca
    fireEvent.change(searchInput, { target: { value: 'yoga' } });
    
    // Verifica se a função onSearch foi chamada com o valor correto
    expect(mockOnSearch).toHaveBeenCalledWith('yoga');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('updates the input value when the user types', () => {
    render(<SearchBar activities={mockActivities} onSearch={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search for activities or users...');
    
    // Simula a digitação no campo de busca
    fireEvent.change(searchInput, { target: { value: 'english' } });

    // Verifica se o valor do input foi atualizado
    expect((searchInput as HTMLInputElement).value).toBe('english');
  });
});
