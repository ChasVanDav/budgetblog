// Import the database connection to interact with the spendings table.
const db = require('../db/db');

// This function allows us to add a new spending entry.
const addSpending = async (req, res) => {
    const { budget_id, amount, category, note, photo } = req.body;

    try {
        // This SQL query inserts a new spending record into the spendings table.
        await db.query(
            'INSERT INTO spendings (budget_id, amount, category, note, photo) VALUES ($1, $2, $3, $4, $5)',
            [budget_id, amount, category, note, photo]
        );

        // If successful, we send back a success message.
        res.status(201).json({ message: 'Spending added successfully' });
    } catch (err) {
        // If there's an error, we send an error response.
        res.status(500).json({ error: 'Failed to add spending', details: err });
    }
};

// This function fetches all spendings related to a specific budget.
const getBudgetSpendings = async (req, res) => {
    const { budget_id } = req.params; // Get the budget ID from the request parameters.

    try {
        // This SQL query fetches all spendings for the specified budget from the database.
        const result = await db.query('SELECT * FROM spendings WHERE budget_id = $1', [budget_id]);

        // We send back the spendings as a response.
        res.json(result.rows);
    } catch (err) {
        // If there's an error, we send an error response.
        res.status(500).json({ error: 'Failed to fetch spendings', details: err });
    }
};

// Export the functions so we can use them in our routes.
module.exports = { addSpending, getBudgetSpendings };

