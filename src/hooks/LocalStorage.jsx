// Utility functions for localStorage operations
export const loadTodos = () => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  };
  
  export const saveTodos = (todos) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };