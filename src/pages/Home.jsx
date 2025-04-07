import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page home-page">
      <h1>Todo List App</h1>
      <div className="home-menu">
        <Link to="/todos" className="menu-item">
          <div className="menu-icon">📝</div>
          <div className="menu-text">My Todos</div>
        </Link>
        <Link to="/categories" className="menu-item">
          <div className="menu-icon">🗂️</div>
          <div className="menu-text">Categories</div>
        </Link>
        <Link to="/settings" className="menu-item">
          <div className="menu-icon">⚙️</div>
          <div className="menu-text">Settings</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;