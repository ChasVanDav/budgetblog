import express from 'express';
import { createTrip, getUserTrips, updateTrip, deleteTrip } from '../controllers/tripController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();


router.post('/create', authenticateJWT, createTrip);

router.get('/view', authenticateJWT, getUserTrips);

router.put('/view/:tripId', authenticateJWT, updateTrip);

router.delete('/view/:tripId', authenticateJWT, deleteTrip);

export default router; 