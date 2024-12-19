import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default function TodoDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadTodo();
  }, [id]);

  const loadTodo = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch todo');
      const data = await response.json();
      setTodo(data);
    } catch (err) {
      console.error('Failed to fetch todo details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updated = await response.json();
      setTodo(updated);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      navigate('/');
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <div className="todo-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to List
      </button>
      
      <h2>Todo Details</h2>
      
      {isEditing ? (
        <TodoForm
          initialData={todo}
          onSubmit={handleUpdate}
        />
      ) : (
        <div className="todo-details-card">
          <p><strong>ID:</strong> {todo.id}</p>
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>User ID:</strong> {todo.userId}</p>
          <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
          
          <div className="todo-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}