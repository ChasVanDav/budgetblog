// Import the database connection to interact with the trips table.
const db = require('../db/db');

// This function allows us to add a new trip to the database.
const addTrip = async (req, res) => {
    const { user_id, arrival_date, departure_date, destination_country, destination_city } = req.body;

    try {
        // This SQL query inserts a new trip into the trips table.
        await db.query(
            'INSERT INTO trips (user_id, arrival_date, departure_date, destination_country, destination_city) VALUES ($1, $2, $3, $4, $5)',
            [user_id, arrival_date, departure_date, destination_country, destination_city]
        );

        // If successful, we send back a success message.
        res.status(201).json({ message: 'Trip added successfully' });
    } catch (err) {
        // If there's an error, we send an error response.
        res.status(500).json({ error: 'Failed to add trip', details: err });
    }
};

// This function fetches all trips for a specific user.
const getUserTrips = async (req, res) => {
    const userId = req.user.userId; // Get the user ID from the request.

    try {
        // This SQL query fetches all trips for the user from the database.
        const result = await db.query('SELECT * FROM trips WHERE user_id = $1', [userId]);

        // We send back the user's trips as a response.
        res.json(result.rows);
    } catch (err) {
        // If there's an error, we send an error response.
        res.status(500).json({ error: 'Failed to fetch trips', details: err });
    }
};

// Export the functions so we can use them in our routes.
module.exports = { addTrip, getUserTrips };
