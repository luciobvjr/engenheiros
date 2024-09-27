import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

interface Activity {
  id: string;
  name: string;
  category: string;
  place: string;
  time: string;
  price: string;
  description: string;
}
const categories = [
  { label: 'Matemática', value: 'math' },
  { label: 'Ciências', value: 'science' },
  { label: 'História', value: 'history' },
  { label: 'Artes', value: 'arts' },
  { label: 'Computação', value: 'computing' },
  { label: 'Economia e finanças', value: 'economy' }
]; 

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

        <><h2>Edição do curso</h2>
        <form onSubmit={handleEditSubmit}>
          <div>
            <label htmlFor="name">Nome do curso:</label>
            <input type="text" value={editedActivity?.name} id="name" name="name" onChange={(e) => setEditedActivity({ ...editedActivity!, name: e.target.value })} required />
          </div>

          <div>
            <label htmlFor="category">Categoria:</label>
            <select id="category" name="category" value={editedActivity?.category} onChange={(e) => setEditedActivity({ ...editedActivity!, category: e.target.value })} required>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="place">Local:</label>
            <input id="place" name="place" type="text" value={editedActivity?.place} onChange={(e) => setEditedActivity({ ...editedActivity!, place: e.target.value })} required />
          </div>

          <div>
            <label htmlFor="time">Horário:</label>
            <input type="text" id="time" name="time" value={editedActivity?.time} onChange={(e) => setEditedActivity({ ...editedActivity!, time: e.target.value })} required />
          </div>

          <div>
            <label htmlFor="price">Valor:</label>
            <input type="text" value={editedActivity?.price} onChange={(e) => setEditedActivity({ ...editedActivity!, price: e.target.value })} required />
          </div>

          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea id="description" name="description" value={editedActivity?.description} onChange={(e) => setEditedActivity({ ...editedActivity!, description: e.target.value })} required />
          </div>

          <button type="submit">Salvar alterações</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form></>
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
