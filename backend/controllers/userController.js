const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//registration for a new user
const registerUser = async (req, res) => {
    //inputs from registration form
    const { username, email, password, home_country, home_city, home_currency } = req.body;
    try {
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            //add new user to database
            'INSERT INTO users (username, email, password, home_country, home_city, home_currency) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, email, hashedPassword, home_country, home_city, home_currency]
        );
        res.status(201).json({ message: 'User registered', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed', details: err });
    }
};

//user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];
        //check password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err });
    }
};

// displaying user profile
const getUserProfile = async (req, res) => {
    const userId = req.userId; // From JWT middleware
    try {
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user profile', details: err });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
