import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Header from './Header';


const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default function TodoListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const todosPerPage = 10;

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setFilteredTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const handleSearch = () => {
    const filtered = todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.id === parseInt(searchQuery)
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTodo, userId: 1 }),
      });
      if (!response.ok) throw new Error('Failed to create todo');
      const created = await response.json();
      setTodos([created, ...todos]);
      setFilteredTodos([created, ...filteredTodos]);
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to create todo:', err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodos = todos.map(todo => 
        todo.id === id ? { ...todo, completed } : todo
      );
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
  const startIndex = (currentPage - 1) * todosPerPage;
  const endIndex = startIndex + todosPerPage;
  const currentTodos = filteredTodos.slice(startIndex, endIndex);

  return (
    <div className="app-container">
      <h1>Todo-Api App
       
      </h1>
        <Header />
     

      <div className="actions-bar">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-button"
        >
          {showAddForm ? 'Cancel' : 'Add New Todo'}
        </button>
      </div>

      {showAddForm && (
        <TodoForm onSubmit={handleAddTodo} />
      )}

      <TodoList
        todos={currentTodos}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}