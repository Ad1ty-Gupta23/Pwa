import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InstallButton from '../components/InstallButton';

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="page settings-page">
      <header>
        <Link to="/" className="back-button">←</Link>
        <h1>Settings</h1>
      </header>

      <div className="settings-list">
        <div className="setting-item">
          <span>Dark Mode</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <span>Install App</span>
          <InstallButton />
        </div>

        <div className="setting-item">
          <span>Version</span>
          <span className="version-number">1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;