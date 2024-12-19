import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoListPage from './pagess/TodoListPage';
import TodoDetails from './pagess/TodoDetails';
import ErrBoundary from './pagess/ErrBoundary'; // Import Error Boundary page
import NotFound from './pagess/NotFound';       // Import Not Found page
import Navbar from './pagess/Navbar';     // Import Navbar
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* Include Navbar */}
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todos/:id" element={<TodoDetails />} />
        <Route path="/error-boundary" element={<ErrBoundary />} /> {/* Add Error Boundary route */}
        <Route path="/not-found" element={<NotFound />} />         {/* Add Not Found route */}
        <Route path="*" element={<NotFound />} />                 {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
