import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadTodos } from '../hooks/LocalStorage'; // Import localStorage utility
import TodoForm from '../components/TodoForm';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default function TodoDetailsPage() {
  const { id } = useParams(); // Get ID from route params
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadTodo();
  }, [id]);

  const loadTodo = async () => {
    try {
      // First, check for the todo in localStorage
      const localTodos = loadTodos() || [];
      console.log('Loaded Todos from LocalStorage:', localTodos);
      const localTodo = localTodos.find((t) => t.id.toString() === id);

      if (localTodo) {
        setTodo(localTodo);
        setLoading(false);
        return;
      }

      // If not found locally, fetch from the API
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch todo');
      const apiTodo = await response.json();
      setTodo(apiTodo);
    } catch (err) {
      console.error('Failed to fetch todo details:', err);
      setTodo(null); // Set to null if fetching fails
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates) => {
    try {
      if (todo.isLocal) {
        // Update local todo
        const localTodos = loadTodos() || [];
        const updatedTodos = localTodos.map((t) =>
          t.id === todo.id ? { ...t, ...updates } : t
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTodo({ ...todo, ...updates });
      } else {
        // Update API todo
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update todo');
        const updated = await response.json();
        setTodo(updated);
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async () => {
    try {
      if (todo.isLocal) {
        // Delete locally
        const localTodos = loadTodos() || [];
        const updatedTodos = localTodos.filter((t) => t.id !== todo.id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        // Delete from API
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
      }
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
        <TodoForm initialData={todo} onSubmit={handleUpdate} />
      ) : (
        <div className="todo-details-card">
          <p>
            <strong>ID:</strong> {todo.id}
          </p>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>User ID:</strong> {todo.userId}
          </p>
          <p>
            <strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}
          </p>

          {todo.isLocal && (
            <p>
              <strong>Note:</strong> This todo was created locally.
            </p>
          )}

          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}