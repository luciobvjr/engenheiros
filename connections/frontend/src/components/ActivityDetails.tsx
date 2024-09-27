import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Activity {
  id: string;
  name: string;
  category: string;
  place: string;
  time: string;
  price: string;
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

  if (!activity) return <p>Curso não encontrado!</p>;

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
    // Html da página de detalhes da atividade

    <div>
      {isEditing ? ( // formulário para editar a atividade
        <form onSubmit={handleEditSubmit}>
          <input type="text" value={editedActivity?.name} onChange={(e) => setEditedActivity({ ...editedActivity!, name: e.target.value })} required />

          <input type="text" value={editedActivity?.category} onChange={(e) => setEditedActivity({ ...editedActivity!, category: e.target.value })} required />

          <input type="text" value={editedActivity?.place} onChange={(e) => setEditedActivity({ ...editedActivity!, place: e.target.value })} required />

          <input type="text" value={editedActivity?.time} onChange={(e) => setEditedActivity({ ...editedActivity!, time: e.target.value })} required />

          <input type="text" value={editedActivity?.price} onChange={(e) => setEditedActivity({ ...editedActivity!, price: e.target.value })} required />

          <textarea value={editedActivity?.description} onChange={(e) => setEditedActivity({ ...editedActivity!, description: e.target.value })} required />

          <button type="submit">Salvar alterações</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <>
          <h2>{activity.name}</h2>
          <p>Categoria: {activity.category}</p>
          <p>Local: {activity.place}</p>
          <p>Horário: {activity.time}</p>
          <p>Preço: R$ {activity.price}</p>
          <p>Description: {activity.description}</p>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Deletar</button>
        </>
      )}
    </div>
  );
};

export default ActivityDetails;
