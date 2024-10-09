import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (todo) => {
    try {
      const newTodo = await addTodo(todo);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      await updateTodo(id, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
      setSelectedTodo(null); // Clear selected todo after update
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompleteTodo = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      try {
        await updateTodo(id, updatedTodo);
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm
        addTodo={handleAddTodo}
        selectedTodo={selectedTodo}
        updateTodo={handleUpdateTodo}
      />
      <TodoList
        todos={todos}
        completeTodo={handleCompleteTodo}
        removeTodo={handleDeleteTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </div>
  );
}

export default App;
