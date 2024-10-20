//----dependencies & configuration----//
const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const pool = require('./db');
const jwt = require('jsonwebtoken');
dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send(`hello from Vanessa's server`);
});

//----jwt auth----for user login//
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  console.log(user);

  if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
  }


  if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT 
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});



//----user routes----//
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

//----weather api----//

const wApiToken = process.env.WEATHER_API_TOKEN;

app.get('/api/weather', (req, res) => {
    const cityName = req.query.city || 'Honolulu';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${wApiToken}&units=imperial`)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => res.status(500).send({ error: 'Oh no! Something went wrong!' }));
});


//----start server----//
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Vanessa's Server is running on port ${PORT}`); 
});
