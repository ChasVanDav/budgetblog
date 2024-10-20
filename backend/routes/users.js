//USER ROUTES
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

//route for user registration
router.post('/register', registerUser);

//route for user login
router.post('/login', loginUser);

//route for getting the user profile
router.get('/profile', getUserProfile); 


module.exports = router; 