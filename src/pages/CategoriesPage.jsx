import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CategoriesPage() {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [
      { id: 'default', name: 'Default', color: '#3498db' },
      { id: 'work', name: 'Work', color: '#e74c3c' },
      { id: 'personal', name: 'Personal', color: '#2ecc71' }
    ];
  });
  const [newCategory, setNewCategory] = useState('');
  const [newColor, setNewColor] = useState('#3498db');

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    const category = {
      id: newCategory.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory,
      color: newColor
    };
    
    setCategories([...categories, category]);
    setNewCategory('');
  };

  const deleteCategory = (id) => {
    if (id === 'default') {
      alert('Cannot delete the default category');
      return;
    }
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <div className="page categories-page">
      <header>
        <Link to="/" className="back-button">←</Link>
        <h1>Categories</h1>
      </header>

      <form onSubmit={addCategory} className="category-form">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add a new category..."
          className="category-input"
        />
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="color-picker"
        />
        <button type="submit" className="add-button">Add</button>
      </form>

      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            <div 
              className="category-color" 
              style={{ backgroundColor: category.color }}
            ></div>
            <span className="category-name">{category.name}</span>
            <button 
              onClick={() => deleteCategory(category.id)}
              className="delete-button"
              disabled={category.id === 'default'}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;