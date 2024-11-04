import express from 'express';
import {
    createTrip,
    getUserTrips,
    updateTrip,
    deleteTrip
} from '../controllers/tripController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticateJWT, createTrip);  // /trips
router.get('/', authenticateJWT, getUserTrips);  // /trips
router.put('/:tripId', authenticateJWT, updateTrip);  // /trips/:tripId
router.delete('/:tripId', authenticateJWT, deleteTrip);  // /trips/:tripId

export default router;