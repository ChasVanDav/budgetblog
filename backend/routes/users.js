 // We use Express to create routes.
const express = require('express');
// Import the functions from the controller.
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController'); 
// Import the middleware to check if the user is logged in.
const authenticateJWT = require('../middlewares/auth'); 
 // Create an instance of the Express Router.
const router = express.Router();

// Route for user registration (POST request to /register)
router.post('/register', registerUser); // When a user registers, it calls the registerUser function from the controller.

// Route for user login (POST request to /login)
router.post('/login', loginUser); // When a user logs in, it calls the loginUser function from the controller.

// Route for getting the user profile (GET request to /profile)
// This route is protected with the authenticateJWT middleware to make sure the user is logged in before showing the profile.
router.get('/profile', authenticateJWT, getUserProfile); 

// Export the routes so that they can be used in other parts of the app.
module.exports = router; 
