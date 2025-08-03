import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 My Todo List</h1>
          <p>Stay organized and get things done!</p>
        </header>
        
        <AddTodo onAdd={addTodo} />
        
        <div className="stats">
          <span>Total: {totalCount}</span>
          <span>Completed: {completedCount}</span>
          <span>Remaining: {totalCount - completedCount}</span>
        </div>
        
        <TodoList 
          todos={todos} 
          onDelete={deleteTodo} 
          onToggle={toggleTodo} 
        />
        
        {completedCount > 0 && (
          <button className="clear-completed" onClick={clearCompleted}>
            Clear Completed ({completedCount})
          </button>
        )}
        
        {todos.length === 0 && (
          <div className="empty-state">
            <p>🎉 No todos yet! Add one above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
