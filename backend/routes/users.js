//USER ROUTES

const express = require('express');// use express to create routes.
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController'); //import the functions from the controller.
const router = express.Router();

//route for user registration
router.post('/register', registerUser); //registerUser function from the controller.

//route for user login
router.post('/login', loginUser); // When a user logs in, it calls the loginUser function from the controller.

//route for getting the user profile
router.get('/profile', getUserProfile); 


module.exports = router; 