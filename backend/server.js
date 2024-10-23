//----dependencies & configuration----//
const express = require('express'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 
const pool = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');
const budgetRoutes = require('./routes/budgetRoutes');
const spendingRoutes = require('./routes/spendingRoutes');

const fetch = require('node-fetch');

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
app.use('/budgets', budgetRoutes);
app.use('/spendings', spendingRoutes);

//---- Weather API ----//
const wApiToken = process.env.WEATHER_API_TOKEN;

app.get('/api/weather', (req, res) => {
    const cityName = req.query.city || 'Honolulu';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${wApiToken}&units=imperial`)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => res.status(500).send({ error: 'Oh no! Something went wrong!' }));
});

//----Currency API ----//
const apiKey = process.env.EXCHANGE_API_KEY; 

app.get('/currency/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
        return res.status(400).send({ error: 'Please complete from, to, and amount fields.' });
    }

    try {
        const response = await fetch(`http://api.exchangeratesapi.io/v1/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`);
        const data = await response.json();

        if (data.success) {
            res.send(data);
        } else {
            res.status(400).send({ error: data.error });
        }
    } catch (error) {
        res.status(500).send({ error: 'Oh no! Something went wrong with the currency conversion!' });
    }
});

//---- Start Server ----//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Vanessa's Server is running on port ${PORT}`); 
});
