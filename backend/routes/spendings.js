const express = require('express');
const { createSpending, getSpendingsByBudget, updateSpending, deleteSpending } = require('../controllers/spendingController.js');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

router.post('/spending', authenticateJWT, createSpending);

router.get('/spending/:budgetId', authenticateJWT, getSpendingsByBudget);

router.put('/spending/:spendId', authenticateJWT, updateSpending);

router.delete('/spending/:spendId', authenticateJWT, deleteSpending);

module.exports = router;
