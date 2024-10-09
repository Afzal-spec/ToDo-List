import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Get all todos
export const getTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};

// Add a new todo
export const addTodo = async (newTodo) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, newTodo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error; // Re-throw the error to handle it where this function is called
  }
};
