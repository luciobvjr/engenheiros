import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  name: string;
  category: string;
  place: string;
  time: string;
  price: string;
  description: string;
}

interface ActivityFormProps {
  addActivity: (activity: Activity) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ addActivity }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    place: '',
    time: '',
    price: '',
    description: '',
  });

  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const categories = [
    { label: 'Matemática', value: 'math' },
    { label: 'Ciências', value: 'science' },
    { label: 'História', value: 'history' },
    { label: 'Artes', value: 'arts' },
    { label: 'Computação', value: 'computing' },
    { label: 'Economia e finanças', value: 'economy' }
  ];  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addActivity(formData);  // Adiciona a atividade

    navigate('/');
  };

  return (
    // Html do formulário de adicionar atividade

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome do curso:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div> 

      <div>
        <label htmlFor="category">Categoria:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="place">Local:</label>
        <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="time">Horário:</label>
        <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="price">Valor:</label>
        <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required/>
      </div>

      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <button type="submit">Adicionar curso</button>
    </form>
  );
};

export default ActivityForm;
