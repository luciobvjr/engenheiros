import type React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import ActivityDetails from '../components/ActivityDetails';
import ActivityForm from './ActivitiesForm';
import SearchBar from './feature_buscar';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  description: string;
}

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'EduConnections';
  }, []);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(activities);

  const addActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
    setFilteredActivities([...activities, activity]);
  };

  const deleteActivity = (id: string) => {
    const updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
    setFilteredActivities(updatedActivities);
  };

  const handleSearch = (query: string) => {
    const filtered = activities.filter((activity) =>
      activity.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredActivities(filtered);
  };

  return (
    <Router>
      <div>
        <Menu activities={filteredActivities} />
        <SearchBar activities={activities} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<ActivityForm addActivity={addActivity} />} />
          <Route
            path="/activity/:id"
            element={
              <ActivityDetails activities={filteredActivities} deleteActivity={deleteActivity} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
