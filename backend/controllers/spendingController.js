import db from '../db/db.js';

//----create a new spending for a budget----//
export const createSpending = async (req, res) => {
    const { budget_id, category, amount, note, photo } = req.body;

    try {
        await db.query(
            'INSERT INTO spendings (budget_id, category, amount, note, photo) VALUES ($1, $2, $3, $4, $5)',
            [budget_id, category, amount, note, photo]
        );

        res.status(201).json({ message: 'Spending created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create spending', details: err.message });
    }
};

//----get all spendings for a specific budget----//
export const getSpendingsByBudget = async (req, res) => {
    const { budgetId } = req.params;

    try {
        const result = await db.query('SELECT * FROM spendings WHERE budget_id = $1', [budgetId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No spendings found for this budget' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch spendings', details: err.message });
    }
};

//----update a specific spending----//
export const updateSpending = async (req, res) => {
    const { spendId } = req.params;
    const { category, amount, note, photo } = req.body;

    try {
        const result = await db.query(
            'UPDATE spendings SET category = $1, amount = $2, note = $3, photo = $4 WHERE spend_id = $5 RETURNING *',
            [category, amount, note, photo, spendId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Spending not found' });
        }

        res.json({ message: 'Spending updated successfully', spending: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update spending', details: err.message });
    }
};

//----delete a specific spending----//
export const deleteSpending = async (req, res) => {
    const { spendId } = req.params;

    try {
        const result = await db.query('DELETE FROM spendings WHERE spend_id = $1 RETURNING *', [spendId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Spending not found' });
        }

        res.json({ message: 'Spending deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete spending', details: err.message });
    }
};

// module.exports = { createSpending, getSpendingsByBudget, updateSpending, deleteSpending };
