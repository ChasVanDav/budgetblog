// Import necessary modules and functions
import express from 'express';
import { registerUser, loginUser, getUserProfile, deleteUser } from '../controllers/userController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in an existing user
router.post('/login', loginUser);

// Route to get the authenticated user's profile
// authenticateJWT middleware ensures that only authenticated users can access this route
router.get('/profile', authenticateJWT, getUserProfile);

// Route to delete a user
// authenticateJWT middleware ensures that only authenticated users can access this route
router.delete('/delete', authenticateJWT, deleteUser);

// Export the router to be used in other parts of the application
export default router;
