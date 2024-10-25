//USER ROUTES
import express from 'express';
import { registerUser, loginUser, getUserProfile, deleteUser } from '../controllers/userController.js';
const router = express.Router();
import authenticateJWT from '../middlewares/auth.js';



router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/profile', authenticateJWT, getUserProfile); 

router.delete('/delete', authenticateJWT, deleteUser);


export default router; 