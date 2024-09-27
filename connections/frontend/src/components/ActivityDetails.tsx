import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type Activity from '../models/Activity';

interface ActivityDetailsProps {
  deleteActivity: (id: string) => void;
  editActivity: (id: string, updatedActivity: Activity) => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ deleteActivity, editActivity }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    localization: '',
    timetable: '',
    price: 0,
    description: '',
  });

  useEffect(() => {
    fetch(`https://engenheiros-back.vercel.app/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
        setFormData({
          name: data.name,
          localization: data.localization,
          timetable: data.timetable,
          price: data.price,
          description: data.description,
        });
      })
      .catch((error) => console.error("Erro ao buscar o curso", error));
  }, [id]);

  if (!activity) return <p>Curso não encontrado!</p>;

  const handleDelete = () => {
    fetch(`https://engenheiros-back.vercel.app/api/courses/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        deleteActivity(id!);
        navigate('/');
      })
      .catch((error) => console.error('Erro ao deletar o curso', error));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? Number(value) : value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedActivity = {
      ...formData,
    };

    fetch(`https://engenheiros-back.vercel.app/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedActivity),
    })
      .then((response) => response.json())
      .then((data) => {
        editActivity(id!, data);
        setIsEditing(false);
        setActivity(data);
      })
      .catch((error) => console.error('Erro ao atualizar o curso', error));
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="localization"
            value={formData.localization}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="timetable"
            value={formData.timetable}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <button type="submit">Salvar alterações</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <>
          <h2>{activity.name}</h2>
          <p>Local: {activity.localization}</p>
          <p>Horário: {activity.timetable}</p>
          <p>Preço: R$ {activity.price}</p>
          <p>Descrição: {activity.description}</p>
          <button type="button" onClick={handleEdit}>Editar</button>
          <button type="button" onClick={handleDelete}>Deletar</button>
        </>
      )}
    </div>
  );
};

export default ActivityDetails;
