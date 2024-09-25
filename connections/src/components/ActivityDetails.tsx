import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  editActivity: (id: string, updatedActivity: Activity) => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activities, deleteActivity, editActivity }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = activities.find((activity) => activity.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState(activity);

  if (!activity) return <p>Activity not found!</p>;

  const handleDelete = () => {
    deleteActivity(id!);
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedActivity) {
      editActivity(id!, editedActivity);
      setIsEditing(false);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedActivity?.name}
            onChange={(e) => setEditedActivity({ ...editedActivity!, name: e.target.value })}
            required
          />
          <input
            type="text"
            value={editedActivity?.place}
            onChange={(e) => setEditedActivity({ ...editedActivity!, place: e.target.value })}
            required
          />
          <input
            type="text"
            value={editedActivity?.time}
            onChange={(e) => setEditedActivity({ ...editedActivity!, time: e.target.value })}
            required
          />
          <textarea
            value={editedActivity?.description}
            onChange={(e) => setEditedActivity({ ...editedActivity!, description: e.target.value })}
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h2>{activity.name}</h2>
          <p>Place: {activity.place}</p>
          <p>Time: {activity.time}</p>
          <p>Description: {activity.description}</p>
          <button onClick={handleEdit}>Edit Activity</button>
          <button onClick={handleDelete}>Delete Activity</button>
        </>
      )}
    </div>
  );
};

export default ActivityDetails;
