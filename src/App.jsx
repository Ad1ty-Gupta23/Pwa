import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import TodosPage from './pages/TodosPage';
import CategoriesPage from './pages/CategoriesPage';
import SettingsPage from './pages/SettingsPage';
import InstallButton from './components/InstallButton';
import './App.css';

function App() {
  // Check for dark mode on initial load
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Daily Tasks</h1>
        </header>
        
        <nav>
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/todos">Tasks</NavLink></li>
            <li><NavLink to="/categories">Categories</NavLink></li>
            <li><NavLink to="/settings">Settings</NavLink></li>
          </ul>
        </nav>
        
        <main className="card">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        
        <div className="floating-install">
          <InstallButton />
        </div>
      </div>
    </Router>
  );
}

export default App;
