import db from '../db/db.js';

//----create a new budget for a trip----//
export const createBudget = async (req, res) => {
    const { trip_id, destination_country, budget_date, place_name, starting_amount, new_amount, category, currency, notes, location, star_rating } = req.body;

    try {
        await db.query(
            'INSERT INTO budgets (trip_id, destination_country, budget_date, place_name, starting_amount, new_amount, category, currency, notes, location, star_rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [trip_id, destination_country, budget_date, place_name, starting_amount, new_amount, category, currency, notes, location, star_rating]
        );

        res.status(201).json({ message: 'Budget created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create budget', details: err.message });
    }
};

//----get all budgets for a specific trip----//
export const getBudgetsByTrip = async (req, res) => {
    const { tripId } = req.params;

    try {
        const result = await db.query('SELECT * FROM budgets WHERE trip_id = $1', [tripId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No budgets found for this trip' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch budgets', details: err.message });
    }
};

//----update a specific budget----//
export const updateBudget = async (req, res) => {
    const { budgetId } = req.params;
    const { place_name, starting_amount, new_amount, category, currency, notes, location, star_rating } = req.body;

    try {
        const result = await db.query(
            'UPDATE budgets SET place_name = $1, starting_amount = $2, new_amount = $3, category = $4, currency = $5, notes = $6, location = $7, star_rating = $8 WHERE budget_id = $9 RETURNING *',
            [place_name, starting_amount, new_amount, category, currency, notes, location, star_rating, budgetId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        res.json({ message: 'Budget updated successfully', budget: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update budget', details: err.message });
    }
};

//----delete a specific budget----//
export const deleteBudget = async (req, res) => {
    const { budgetId } = req.params;

    try {
        const result = await db.query('DELETE FROM budgets WHERE budget_id = $1 RETURNING *', [budgetId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Budget not found' });
        }

        res.json({ message: 'Budget deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete budget', details: err.message });
    }
};

// module.exports = { createBudget, getBudgetsByTrip, updateBudget, deleteBudget };
