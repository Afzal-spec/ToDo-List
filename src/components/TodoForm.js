import React, { useState, useEffect } from 'react';
import './TodoForm.css';

function TodoForm({ addTodo, selectedTodo, updateTodo }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text || '');
      setPriority(selectedTodo.priority || 'low');
      setDueDate(selectedTodo.dueDate ? new Date(selectedTodo.dueDate).toISOString().split('T')[0] : '');
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return; // Prevent adding empty todos

    const newTodo = {
      text,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString().split('T')[0] : '', // Format date here
    };

    try {
      if (selectedTodo) {
        await updateTodo(selectedTodo.id, newTodo);
      } else {
        await addTodo(newTodo);
      }
      setText('');
      setPriority('low');
      setDueDate('');
    } catch (error) {
      console.error('Error adding/updating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo text"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{selectedTodo ? 'Update' : 'Add'} Todo</button>
    </form>
  );
}

export default TodoForm;
