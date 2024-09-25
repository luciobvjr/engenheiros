import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';
import MainPage from './components/MainPage';
import ActivityForm from './components/ActivitiesForm'; 
import './index.css';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  price: string;
  description: string;
}

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [idCounter, setIdCounter] = useState(1); // Faz o contador de Id começar no 1

  const addActivity = (activity: Omit<Activity, 'id'>) => {

    const newActivity = {
      ...activity,
      id: idCounter.toString(), // Salva o valor de idCounter como id
    };
    setActivities([...activities, newActivity]); // Add the new activity to the activities array
    setIdCounter(idCounter + 1); // Increment the ID counter
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const editActivity = (id: string, updatedActivity: Activity) => {
    setActivities(activities.map((activity) => (activity.id === id ? updatedActivity : activity)));
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage activities={activities} />} />  // Manda as atividades para a MainPage

          <Route path="/add" element={<ActivityForm addActivity={addActivity} />} />  // Rota para o botão de adicionar atividade
          
          <Route path="/activity/:id" element={
              <ActivityDetails
                activities={activities}
                deleteActivity={deleteActivity}
                editActivity={editActivity}
              /> }/> // Rota para a página de detalhes da atividade

        </Routes>
      </div>
    </Router>
  );
};

export default App;
