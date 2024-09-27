import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';
import MainPage from './components/MainPage';
import ActivityForm from './components/ActivitiesForm'; 
import type Activity from './models/Activity';
import './index.css';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://engenheiros-back.vercel.app/api/courses')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar cursos da API');
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    fetch('https://engenheiros-back.vercel.app/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar curso');
        }
        return response.json(); // Obter os dados do novo curso criado
      })
      .then((newActivity) => {
        setActivities((prevActivities) => [...prevActivities, newActivity]); // Adiciona o novo curso à lista
      })
      .catch((error) => console.error('Erro ao adicionar o curso', error));
  };
  

  const editActivity = (id: string, updatedActivity: Activity) => {
    fetch(`https://engenheiros-back.vercel.app/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedActivity),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setActivities(
          activities.map((activity) => (activity.id === id ? updatedData : activity))
        );
      })
      .catch((error) => {
        console.error('Erro ao atualizar atividade:', error);
      });
  };

  const deleteActivity = (id: string) => {
    fetch(`https://engenheiros-back.vercel.app/api/courses/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setActivities(activities.filter((activity) => activity.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar atividade:', error);
      });
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage activities={activities} />} /> 
          <Route path="/add" element={<ActivityForm addActivity={addActivity} />} /> 
          <Route path="/activity/:id" element={
              <ActivityDetails
                deleteActivity={deleteActivity}
                editActivity={editActivity}
              />} 
          /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
