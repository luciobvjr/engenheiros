import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import ActivityDetails from './components/ActivityDetails';
import ActivityForm from './components/ActivitiesForm';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  description: string;
}

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  return (
    <Router>
      <div>
        <Menu activities={activities} />
        <Routes>
          <Route path="/" element={<ActivityForm addActivity={addActivity} />} />
          <Route
            path="/activity/:id"
            element={
              <ActivityDetails activities={activities} deleteActivity={deleteActivity} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
