//----dependencies & configuration----//
const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send(`Hello from Vanessa's server`);
});

//----bcrypt----hashing existing passwords//
app.post('/hash-passwords', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM users');
      const users = result.rows;

      if (users.length === 0) {
          return res.status(404).json({ message: 'No users found.' });
      }

      for (const user of users) {
          const hashedPassword = await bcrypt.hash(user.password, 10);

          await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, user.user_id]);
      }

      // Respond with success message
      res.status(200).json({ message: 'All passwords have been hashed successfully!' });
  } catch (error) {
      // Log the error message for debugging
      console.error('Error hashing passwords:', error.message);
      
      // Respond with a server error message
      res.status(500).json({ message: 'An error occurred while hashing passwords.', error: error.message });
  }
});


//----jwt auth----for user login//
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//       const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
//       const user = result.rows[0];

//       if (!user) {
//           return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//           return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       // Generate JWT 
//       const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

//       res.json({ message: 'Login successful', token });
//   } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ message: 'An error occurred during login.' });
//   }
// });

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
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Vanessa's Server is running on port ${PORT}`); 
});
