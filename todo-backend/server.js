const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shahin@2020', // replace with your MySQL root password
  database: 'todo_list'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL connected...');
});

// Format date function
function formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Get all todos
app.get('/todos', (req, res) => {
  const sql = 'SELECT * FROM todos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      return res.status(500).json({ error: 'Error fetching todos' });
    }

    // Format the dueDate before sending response
    const formattedResults = results.map(todo => ({
      ...todo,
      dueDate: todo.dueDate ? formatDate(todo.dueDate) : null
    }));

    res.json(formattedResults);
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { text, priority, dueDate, isCompleted } = req.body;
  
  // Format the dueDate to 'YYYY-MM-DD' if it exists
  const formattedDueDate = dueDate ? new Date(dueDate).toISOString().split('T')[0] : null;

  const newTodo = { text, priority, dueDate: formattedDueDate, isCompleted };
  const sql = 'INSERT INTO todos SET ?';
  
  db.query(sql, newTodo, (err, result) => {
    if (err) {
      console.error('Error adding todo:', err);
      return res.status(500).json({ error: 'Error adding todo' });
    }
    res.json({ id: result.insertId, ...newTodo });
  });
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, priority, dueDate, isCompleted } = req.body;
  
  // Format the dueDate to 'YYYY-MM-DD' if it exists
  const formattedDueDate = dueDate ? new Date(dueDate).toISOString().split('T')[0] : null;

  const sql = 'UPDATE todos SET text = ?, priority = ?, dueDate = ?, isCompleted = ? WHERE id = ?';
  db.query(sql, [text, priority, formattedDueDate, isCompleted, id], (err, result) => {
    if (err) {
      console.error('Error updating todo:', err);
      return res.status(500).json({ error: 'Error updating todo' });
    }
    res.json(result);
  });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  db.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error deleting todo:', err);
      return res.status(500).json({ error: 'Error deleting todo' });
    }
    res.json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
