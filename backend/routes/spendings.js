// Import necessary modules and functions
import express from 'express';
import authenticateJWT from '../middlewares/auth.js';  // Middleware to authenticate the user
import { createSpending, getSpendingsByBudget, updateSpending, deleteSpending } from '../controllers/spendingController.js';

const router = express.Router();

// Route to create a new spending for a specific budget
// authenticateJWT middleware ensures that only authenticated users can add a spending
router.post('/:budgetId', authenticateJWT, createSpending);  // /spendings/:budgetId

// Route to get all spendings for a specific budget
// authenticateJWT middleware ensures that only authenticated users can view their spendings
router.get('/:budgetId', authenticateJWT, getSpendingsByBudget);  // /spendings/:budgetId

// Route to update a specific spending by spendId
// authenticateJWT middleware ensures that only authenticated users can update their spendings
router.put('/:spendId', authenticateJWT, updateSpending);  // /spendings/:spendId

// Route to delete a specific spending by spendId
// authenticateJWT middleware ensures that only authenticated users can delete their spendings
router.delete('/:spendId', authenticateJWT, deleteSpending);  // /spendings/:spendId

// Export the router to be used in other parts of the application
export default router;

