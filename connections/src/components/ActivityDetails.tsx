import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ActivityDetails.module.css';

interface Activity {
  id: string;
  name: string;
  place: string;
  time: string;
  description: string;
}

interface ActivityDetailsProps {
  activities: Activity[];
  deleteActivity: (id: string) => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activities, deleteActivity }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = activities.find((activity) => activity.id === id);

  if (!activity) return <p>Activity not found!</p>;

  const handleDelete = () => {
    deleteActivity(id!);
    navigate('/');
  };

  return (
    <div className={styles.details}>
      <h2>{activity.name}</h2>
      <p>Place: {activity.place}</p>
      <p>Time: {activity.time}</p>
      <p>Description: {activity.description}</p>
      <button onClick={handleDelete}>Delete Activity</button>
    </div>
  );
};

export default ActivityDetails;
