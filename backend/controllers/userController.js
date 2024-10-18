// This connects to the PostgreSQL database.
const db = require('../db/db'); 
// This is used to safely encrypt passwords.
const bcrypt = require('bcrypt'); 
// This helps create a token to identify users once they log in.
const jwt = require('jsonwebtoken'); 

// This function helps register a new user.
const registerUser = async (req, res) => {
    // These are the inputs from the registration form: username, email, password, etc.
    const { username, email, password, home_country, home_city, home_currency } = req.body;
    
    try {
        // We use bcrypt to turn the password into a hashed (encrypted) version for security.
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the "salt rounds" for added security.

        // This SQL query adds a new user to the 'users' table in the database.
        await db.query(
            'INSERT INTO users (username, email, password, home_country, home_city, home_currency) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, email, hashedPassword, home_country, home_city, home_currency]
        );

        // Once the user is registered, we send back a success message without any sensitive info.
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        // If something goes wrong, we send back an error.
        res.status(500).json({ error: 'Registration failed', details: err });
    }
};


// This function logs a user in.
const loginUser = async (req, res) => {
    // These are the email and password from the login form.
    const { email, password } = req.body; 
    
    try {
        // We search for the user in the database by their email.
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        // If no user is found, we send back an error.
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // This is the found user's info from the database.
        const user = result.rows[0]; 

        // We compare the password provided with the stored (hashed) password.
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            // If passwords don't match, show an error.
            return res.status(400).json({ error: 'Invalid email or password' }); 
        }

        // If the password is correct, we create a token (JWT) to identify the user.
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // We send back a success message and the token.
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err });
    }
};

// This function gets the logged-in user's profile.
const getUserProfile = async (req, res) => {
    // This userId comes from the authentication middleware (JWT).
    const userId = req.userId; 
    
    try {
        // We query the database to find the user's info by their user ID.
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);

        // If no user is found, we send an error.
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // We send back the user's profile information.
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user profile', details: err });
    }
};

// These functions are exported so other files can use them.
module.exports = { registerUser, loginUser, getUserProfile }; 

