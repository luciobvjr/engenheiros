import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  name: string;
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
    place: '',
    time: '',
    price: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new activity (without ID, since it's generated in App.tsx)
    addActivity(formData);

    // Navigate back to the main page after adding the activity
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome do curso:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="place">Local:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Horário:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Valor:</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default ActivityForm;
