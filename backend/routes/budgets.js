// Import necessary modules and functions
import express from 'express';
import { createBudget, getBudgetsByTrip, updateBudget, deleteBudget } from '../controllers/budgetController.js';
import authenticateJWT from '../middlewares/auth.js';  // Middleware to authenticate the user

const router = express.Router();

// Route to create a new budget for a trip
// authenticateJWT middleware ensures that only authenticated users can create a budget
router.post('/', authenticateJWT, createBudget);  // /budgets

// Route to get all budgets associated with a specific trip
// authenticateJWT middleware ensures that only authenticated users can view their budgets
router.get('/:tripId', authenticateJWT, getBudgetsByTrip);  // /budgets/:tripId

// Route to update a specific budget using the budgetId
// authenticateJWT middleware ensures that only authenticated users can update their budgets
router.put('/:budgetId', authenticateJWT, updateBudget);  // /budgets/:budgetId

// Route to delete a specific budget using the budgetId
// authenticateJWT middleware ensures that only authenticated users can delete their budgets
router.delete('/:budgetId', authenticateJWT, deleteBudget);  // /budgets/:budgetId

// Export the router to be used in other parts of the application
export default router;
