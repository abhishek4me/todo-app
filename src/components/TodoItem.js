import React from 'react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <span className={todo.completed ? 'line-through' : ''}>
            {todo.text}
          </span>
          <small className="todo-date">Added: {todo.createdAt}</small>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
        title="Delete todo"
      >
        🗑️
      </button>
    </div>
  );
};

export default TodoItem;
