import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Header from '../pagess/Header';
import { loadTodos, saveTodos } from '../hooks/LocalStorage';


const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default function TodoListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const todosPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const apiTodos = await response.json();
        
        // Combine API todos with local todos
        const localTodos = loadTodos() || [];
        const combinedTodos = [
          ...localTodos,
          ...apiTodos.filter(apiTodo => 
            !localTodos.some(localTodo => localTodo.id === apiTodo.id)
          )
        ];
        
        setTodos(combinedTodos);
        setFilteredTodos(combinedTodos);
      } catch (err) {
        setError(err.message);
        // If API fails, load local todos
        const localTodos = loadTodos() || [];
        setTodos(localTodos);
        setFilteredTodos(localTodos);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = todos.filter(todo => 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.id === parseInt(searchQuery)
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  };

  const handleAddTodo = (newTodo) => {
    const todoToAdd = {
      ...newTodo,
      id: Date.now(),
      userId: 1,
      completed: false,
      isLocal: true
    };

    const updatedTodos = [todoToAdd, ...todos];
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setShowAddForm(false);
    
    // Save to localStorage
    const localTodos = loadTodos() || [];
    saveTodos([...localTodos, todoToAdd]);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * todosPerPage,
    currentPage * todosPerPage
  );

  return (
    <div className="todo-list-page">
      <h1>Todo List</h1>

      <Header />
      
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <button 
        className="add-todo-button"
        onClick={() => setShowAddForm(true)}
       style={{ marginBottom: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: 'lightblue',
          borderRadius: '5px',
        }}> 
        Add New Todo
      </button>

      {showAddForm && (
        <TodoForm
          onSubmit={handleAddTodo}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <TodoList todos={paginatedTodos} />
      
      <Pagination
        currentPage={currentPage}
        totalItems={filteredTodos.length}
        itemsPerPage={todosPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}