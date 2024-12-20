import { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { loadTodos, saveTodos } from '../hooks/LocalStorage';

import Header from './header';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export default function TodoListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [todos, setTodos] = useState(() => loadTodos()); // Initialize with localStorage
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const todosPerPage = 10;

  // Load todos from both API and localStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from API
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const apiTodos = await response.json();

        // Combine local todos with API todos, prioritizing local ones
        const localTodos = loadTodos();
        const combinedTodos = [
          ...localTodos,
          ...apiTodos.filter(apiTodo =>
            !localTodos.some(localTodo => localTodo.id === apiTodo.id)
          )
        ];

        setTodos(combinedTodos);
        setFilteredTodos(combinedTodos);
      } catch (err) {
        console.error('Failed to fetch todos:', err);
        // Use existing todos if API fails
        setFilteredTodos(todos);
      }
    };

    fetchData();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(todos.filter(todo => todo.isLocal)); // Save only local todos
  }, [todos]);

  const handleAddTodo = async (newTodo) => {
    const todoToAdd = {
      ...newTodo,
      id: Date.now(), // Ensure unique ID
      userId: 1,
      completed: false,
      isLocal: true // Mark as local todo
    };

    const updatedTodos = [todoToAdd, ...todos];
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
    setShowAddForm(false);

    try {
      // Try to create todo in API (optional)
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoToAdd),
      });
    } catch (err) {
      console.error('Failed to sync with API:', err);
      // Continue with local changes even if API fails
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const paginateTodos = () => {
    const startIndex = (currentPage - 1) * todosPerPage;
    return filteredTodos.slice(startIndex, startIndex + todosPerPage);
  };

  return (
    <div>
      <Header />
      
      <SearchBar value={searchQuery} onSearch={handleSearch} />
      {showAddForm && (
        <TodoForm onSubmit={handleAddTodo} onCancel={() => setShowAddForm(false)} />
      )}
      <button onClick={() => setShowAddForm(true)}>Add Todo</button>
      <TodoList todos={paginateTodos()} />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredTodos.length}
        itemsPerPage={todosPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
