import express from 'express';
import { createBudget, getBudgetsByTrip, updateBudget, deleteBudget } from '../controllers/budgetController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

router.post('/budgets', authenticateJWT, createBudget);

router.get('/budgets/:tripId', authenticateJWT, getBudgetsByTrip);

router.put('/budgets/:budgetId', authenticateJWT, updateBudget);

router.delete('/budgets/:budgetId', authenticateJWT, deleteBudget);

export default router; 