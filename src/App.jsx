import { useState } from 'react'
import './App.css'
import InstallPWA from './components/InstallPWA';

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  
  // Add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }
  
  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo()
  }

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      
      {todos.length > 0 && (
        <div className="todo-stats">
          <p>{todos.filter(todo => !todo.completed).length} tasks remaining</p>
        </div>
      )}
      <InstallPWA />
    </div>
  )
}

export default App
