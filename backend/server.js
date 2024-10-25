//----dependencies & configuration----//
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 

import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/users.js';
import tripRoutes from './routes/trips.js';
import budgetRoutes from './routes/budgets.js';
import spendingRoutes from './routes/spendings.js';

import fetch from 'node-fetch';

dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 


const __filename = fileURLToPath(import.meta.url);
const __dirName = dirname(__filename);

const REACT_DIST_DIR = path.join(__dirName, '..', 'frontend/dist')

app.use(express.static(REACT_DIST_DIR));
app.get('*', (req, res) => {
    res.sendFile(path.join(REACT_DIST_DIR, 'index.html'));
});

// app.get('/', (req, res) => {
//   res.send(`Hello from Vanessa's server`);
// });

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

app.get('/api/currency', async (req, res) => {
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
