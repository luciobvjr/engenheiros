import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ActivityForm.module.css';

interface ActivityFormProps {
  addActivity: (activity: Activity) => void;
}

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  description: string;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ addActivity }) => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActivity: Activity = {
      id: Date.now().toString(),
      name,
      place,
      time,
      description,
    };
    addActivity(newActivity);
    navigate('/');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Adicionar Nova Atividade</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Lugar"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Horário"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default ActivityForm;