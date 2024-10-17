const express = require('express');
//from controller
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authenticateJWT = require('../middlewares/auth');
const router = express.Router();

//routes for registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);

//route for user profile display
router.get('/profile', authenticateJWT, getUserProfile);

module.exports = router;
