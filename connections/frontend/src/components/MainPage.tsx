import React from 'react';
import { Link } from 'react-router-dom';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  price: string;
  description: string;
}

interface MainPageProps {
  activities: Activity[];
}

const MainPage: React.FC<MainPageProps> = ({ activities }) => {
  return (
    // Html da página principal
    <div>
      <h1>Cursos</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <Link to={`/activity/${activity.id}`}>{activity.name}</Link>
          </li>
        ))}
      </ul>
      <button>
        <Link to="/add">Adicionar novo curso</Link>
      </button>
    </div>
  
  );
};

export default MainPage;