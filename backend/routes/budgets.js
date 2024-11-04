import express from 'express';
import { createBudget, getBudgetsByTrip, updateBudget, deleteBudget } from '../controllers/budgetController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateJWT, createBudget);  // /budgets
router.get('/:tripId', authenticateJWT, getBudgetsByTrip);  // /budgets/:tripId
router.put('/:budgetId', authenticateJWT, updateBudget);  // /budgets/:budgetId
router.delete('/:budgetId', authenticateJWT, deleteBudget);  // /budgets/:budgetId

export default router; 