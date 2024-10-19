//required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db/pool');

//configuration
dotenv.config(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 

//route to get all from local postgres database 'budgetblog' table 'users'
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});