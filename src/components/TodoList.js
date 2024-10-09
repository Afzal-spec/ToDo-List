import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, completeTodo, removeTodo, setSelectedTodo }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
