import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityDetails from './components/ActivityDetails';
import MainPage from './components/MainPage';
import ActivityForm from './components/ActivitiesForm'; // Import the form component
import './index.css';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  description: string;
}

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [idCounter, setIdCounter] = useState(1); // Start the ID counter at 1

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: idCounter.toString(), // Use idCounter as the ID
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
          {/* Main page shows only the activities and Add button */}
          <Route 
            path="/" 
            element={<MainPage activities={activities} />}  // Pass activities only to MainPage
          />
          
          {/* Route to add a new activity */}
          <Route 
            path="/add" 
            element={<ActivityForm addActivity={addActivity} />}  // Pass addActivity to ActivityForm
          />

          {/* Route to view, delete, or edit a single activity */}
          <Route
            path="/activity/:id"
            element={
              <ActivityDetails
                activities={activities}
                deleteActivity={deleteActivity}
                editActivity={editActivity}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
