import express from 'express';
import { createSpending, getSpendingsByBudget, updateSpending, deleteSpending } from '../controllers/spendingController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

router.post('/spending', authenticateJWT, createSpending);

router.get('/spending/:budgetId', authenticateJWT, getSpendingsByBudget);

router.put('/spending/:spendId', authenticateJWT, updateSpending);

router.delete('/spending/:spendId', authenticateJWT, deleteSpending);

export default router; 