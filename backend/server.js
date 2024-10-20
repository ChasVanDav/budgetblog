const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const pool = require('./db');

dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 


const userRoutes = require('./routes/users'); 
app.use('/api/users', userRoutes); 


app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/trips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trips');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/budget', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM budgets');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/spending', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM spendings');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Vanessa's Server is running on port ${PORT}`); 
});

