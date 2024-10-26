import express from 'express';
import { createBudget, getBudgetsByTrip, updateBudget, deleteBudget } from '../controllers/budgetController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

router.post('/budget', authenticateJWT, createBudget);

router.get('/budget/:tripId', authenticateJWT, getBudgetsByTrip);

router.put('/budget/:budgetId', authenticateJWT, updateBudget);

router.delete('/budget/:budgetId', authenticateJWT, deleteBudget);

export default router; 