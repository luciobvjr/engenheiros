import React from 'react';
import { Link } from 'react-router-dom';

interface Activity {
  id: string;
  name: string;
}

interface MenuProps {
  activities: Activity[];
}

const Menu: React.FC<MenuProps> = ({ activities }) => {
  return (
    <nav>
      <h2>Activities Menu</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <Link to={`/activity/${activity.id}`}>{activity.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
