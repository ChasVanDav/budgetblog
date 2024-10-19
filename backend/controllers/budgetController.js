// Import the database connection to interact with the budgets table.
const db = require('../db/db');

// This function allows us to create a new budget.
const createBudget = async (req, res) => {
    const { trip_id, budget_date, starting_amount, new_amount, location, destination_country, category, place_name, currency, notes } = req.body;

    try {
        // This SQL query inserts a new budget into the budgets table.
        await db.query(
            'INSERT INTO budgets (trip_id, budget_date, starting_amount, new_amount, location, destination_country, category, place_name, currency, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [trip_id, budget_date, starting_amount, new_amount, location, destination_country, category, place_name, currency, notes]
        );

        // If successful, we send back a success message.
        res.status(201).json({ message: 'Budget created successfully' });
    } catch (err) {
        // If there's an error, we send an error response.
        res.status(500).json({ error: 'Failed to create budget', details: err });
    }
};

// This function fetches all budgets for a specific trip.
const getTripBudgets = async (req, res) => {
    const { trip_id } = req.params; // Get the trip ID from the request parameters.

    try {
        // This SQL query fetches all budgets related to the specified trip from the database.
        const result = await db.query('SELECT * FROM budgets WHERE trip_id = $1', [trip_id]);

        // We send back the trip's budgets as a response.
        res.json(result.rows);
    } catch (err) {
        // If there's an error, we send an error response.
        res.status(500).json({ error: 'Failed to fetch budgets', details: err });
    }
};

// Export the functions so we can use them in our routes.
module.exports = { createBudget, getTripBudgets };
