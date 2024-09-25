import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  name: string;
  place: string;
  time: string;
  description: string;
}

interface ActivityFormProps {
  addActivity: (activity: Activity) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ addActivity }) => {
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    time: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new activity (without ID, since it's generated in App.tsx)
    addActivity(formData);

    // Navigate back to the main page after adding the activity
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          name="place"
          value={formData.place}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default ActivityForm;
