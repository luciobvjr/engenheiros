import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type Activity from '../models/Activity';

interface ActivityFormProps {
  addActivity: (activity: Omit<Activity, 'id'>) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ addActivity }) => {
  const [formData, setFormData] = useState({
    name: '',
    localization: '',
    timetable: '',
    price: 0,
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addActivity(formData);

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome do curso:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div> 

      <div>
        <label htmlFor="localization">Local:</label>
        <input type="text" id="localization" name="localization" value={formData.localization} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="timetable">Horário:</label>
        <input type="text" id="timetable" name="timetable" value={formData.timetable} onChange={handleChange} required />
      </div>

      <div>
        <label htmlFor="price">Valor:</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
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
