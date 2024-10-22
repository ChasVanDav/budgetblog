const express = require('express');
const { createSpending, getSpendingsByBudget, updateSpending, deleteSpending } = require('../controllers/spendingController');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

router.post('/spendings', authenticateJWT, createSpending);

router.get('/spendings/:budgetId', authenticateJWT, getSpendingsByBudget);

router.put('/spendings/:spendId', authenticateJWT, updateSpending);

router.delete('/spendings/:spendId', authenticateJWT, deleteSpending);

module.exports = router;
