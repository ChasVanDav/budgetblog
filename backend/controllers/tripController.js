import db from '../db/db.js';

//----create a new trip----//
export const createTrip = async (req, res) => {
    const userId = req.userId; 
    const { destination_country, destination_city, arrival_date, departure_date } = req.body;

    try {
        // Insert a new trip into the trips table with the provided details
        await db.query(
            'INSERT INTO trips (user_id, destination_country, destination_city, arrival_date, departure_date) VALUES ($1, $2, $3, $4, $5)',
            [userId, destination_country, destination_city, arrival_date, departure_date]
        );

        res.status(201).json({ message: 'Trip created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create trip', details: err.message });
    }
};

//----get all trips----//
export const getUserTrips = async (req, res) => {
    const userId = req.userId; 

    try {
        // Retrieve all trips for the user, ordered by arrival date in descending order
        const result = await db.query('SELECT * FROM trips WHERE user_id = $1 ORDER BY arrival_date DESC', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No trips found' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch trips', details: err.message });
    }
};

//----update a specific trip----//
export const updateTrip = async (req, res) => {
    const userId = req.userId;
    const { tripId } = req.params;
    const { destination_country, destination_city, arrival_date, departure_date } = req.body;

    try {
        // Update the trip details for a specific tripId and userId
        const result = await db.query(
            'UPDATE trips SET destination_country = $1, destination_city = $2, arrival_date = $3, departure_date = $4 WHERE trip_id = $5 AND user_id = $6 RETURNING *',
            [destination_country, destination_city, arrival_date, departure_date, tripId, userId]
        );

        // If no rows were updated, either the trip doesn't exist or the user is not authorized
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Trip not found or not authorized to update' });
        }

        res.json({ message: 'Trip updated successfully', trip: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update trip', details: err.message });
    }
};

//----delete a specific trip----//
export const deleteTrip = async (req, res) => {
    const userId = req.userId; 
    const { tripId } = req.params;

    try {
        // Delete the trip for the specified tripId and userId
        const result = await db.query('DELETE FROM trips WHERE trip_id = $1 AND user_id = $2 RETURNING *', [tripId, userId]);

        // If no rows were deleted, either the trip doesn't exist or the user is not authorized
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Trip not found or not authorized to delete' });
        }

        res.json({ message: 'Trip deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete trip', details: err.message });
    }
};
