//USER ROUTES
const express = require('express');
const { registerUser, loginUser, getUserProfile, deleteUser } = require('../controllers/userController');
const router = express.Router();
const authenticateJWT = require('../middlewares/auth');



router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/profile', authenticateJWT, getUserProfile); 

router.delete('/delete', authenticateJWT, deleteUser);


module.exports = router; 