import { Link } from 'react-router-dom';

export default function TodoList({ todos, onDelete, onToggleComplete }) {
  if (!todos.length) {
    return <p>No todos to display</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id, !todo.completed)}
              className="todo-checkbox"
            />
            <Link to={`/todos/${todo.id}`} className="todo-link">
              <span className="todo-title">{todo.title}</span>
            </Link>
          </div>
          <div className="todo-actions">
            <Link to={`/todos/${todo.id}`} className="edit-button">
              Edit
            </Link>
            <button
              onClick={() => onDelete(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}