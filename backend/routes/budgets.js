const express = require('express');
const { createBudget, getBudgetsByTrip, updateBudget, deleteBudget } = require('../controllers/budgetController');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

router.post('/budgets', authenticateJWT, createBudget);

router.get('/budgets/:tripId', authenticateJWT, getBudgetsByTrip);

router.put('/budgets/:budgetId', authenticateJWT, updateBudget);

router.delete('/budgets/:budgetId', authenticateJWT, deleteBudget);

module.exports = router;
