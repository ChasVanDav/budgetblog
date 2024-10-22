//----dependencies & configuration----//
const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');

dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send(`Hello from Vanessa's server`);
});

//---- Routes ----//
app.use('/users', userRoutes);
app.use('/trips', tripRoutes);
app.use('/budgets, budgetRoutes);
app.use('/spendings, spendingRoutes);

//---- Weather API ----//
const wApiToken = process.env.WEATHER_API_TOKEN;

app.get('/api/weather', (req, res) => {
    const cityName = req.query.city || 'Honolulu';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${wApiToken}&units=imperial`)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => res.status(500).send({ error: 'Oh no! Something went wrong!' }));
});

//---- Start Server ----//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vanessa's Server is running on port ${PORT}`); 
});
