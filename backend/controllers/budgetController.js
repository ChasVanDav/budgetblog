import db from '../db/db.js';

//----create a new budget for a trip----//
export const createBudget = async (req, res) => {
    const { trip_id, destination_country, starting_budget, remaining_budget } = req.body;

    try {
        await db.query(
            'INSERT INTO budgets (trip_id, destination_country, starting_budget, remaining_budget) VALUES ($1, $2, $3, $4)',
            [trip_id, destination_country, starting_budget, remaining_budget]
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
    const { starting_budget, remaining_budget } = req.body;

    try {
        const result = await db.query(
            'UPDATE budgets SET starting_budget = $1, remaining_budget = $2 WHERE budget_id = $3 RETURNING *',
            [starting_budget, remaining_budget, budgetId]
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

// Exporting the functions for use in routes
export default {
    createBudget,
    getBudgetsByTrip,
    updateBudget,
    deleteBudget
};
