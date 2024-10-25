import db from '../db/db.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 

//----register a new user----//
export const registerUser = async (req, res) => {
    const { username, email, password, home_country, home_city, home_currency } = req.body;
    
    try {
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (username, email, password, home_country, home_city, home_currency) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, email, hashedPassword, home_country, home_city, home_currency]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Registration failed', details: err.message });
    }
};

//----login an existing user----//
export const loginUser = async (req, res) => {
    const { email, password } = req.body; 
    
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const user = result.rows[0]; 

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: 'Invalid password' }); 
        }

        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

//----get user profile----after login//
export const getUserProfile = async (req, res) => {
    const userId = req.userId;
    console.log('User ID from JWT:', userId);

    try {
        //everything returned except hashed password for security
        const result = await db.query('SELECT user_id, username, email, home_country, home_city, home_currency FROM users WHERE user_id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Selectively return user data without the hashed password
        const userProfile = result.rows[0];
        res.json(userProfile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user profile', details: err.message });
    }
};

//----delete a user----//
export const deleteUser = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
};

// module.exports = { registerUser, loginUser, getUserProfile };
