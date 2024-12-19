import { useState } from 'react';

export default function TodoForm({ onSubmit, initialData = { title: '', completed: false } }) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.completed}
            onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
          />
          Completed
        </label>
      </div>
      <button type="submit" className="submit-button">
        {initialData.id ? 'Update Todo' : 'Add Todo'}
      </button>
    </form>
  );
}