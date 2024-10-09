import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, completeTodo, removeTodo, setSelectedTodo }) {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="todo-text">
        <input
          type="checkbox"
          checked={todo.isCompleted || false}
          onChange={() => completeTodo(todo.id)}
        />
        <span>{todo.text}</span>
        <span className="priority">{todo.priority}</span>
        <span className="due-date">{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}</span>
      </div>
      <div className="todo-actions">
        <button onClick={() => setSelectedTodo(todo)}>Edit</button>
        <button onClick={() => removeTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
