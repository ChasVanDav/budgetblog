import express from 'express';
import authenticateJWT from '../middlewares/auth.js';
import { createSpending, getSpendingsByBudget, updateSpending, deleteSpending } from '../controllers/spendingController.js';

const router = express.Router();

router.post('/:budgetId', authenticateJWT, createSpending);  // /spendings/:budgetId
router.get('/:budgetId', authenticateJWT, getSpendingsByBudget);  // /spendings/:budgetId
router.put('/:spendId', authenticateJWT, updateSpending);  // /spendings/:spendId
router.delete('/:spendId', authenticateJWT, deleteSpending);  // /spendings/:spendId

export default router;
