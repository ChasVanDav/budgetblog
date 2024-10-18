// Import the Express router to create our routes.
const express = require('express');
// Import functions from the spending controller to handle spending-related requests.
const { addSpending, getBudgetSpendings } = require('../controllers/spendingController');
// Import the authentication middleware to protect our routes.
const authenticateJWT = require('../middlewares/auth');

// Create a router instance to define our routes.
const router = express.Router();

// Route to add a new spending (POST request to /api/users/spendings)
router.post('/', authenticateJWT, addSpending); // Only logged-in users can add spending.

// Route to get spendings for a specific budget (GET request to /api/users/spendings/:budget_id)
router.get('/:budget_id', authenticateJWT, getBudgetSpendings); // Only logged-in users can see spending for a budget.

// Export the router to use it in the main application.
module.exports = router;

