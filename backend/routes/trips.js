// Import necessary modules and functions
import express from 'express';
import {
    createTrip,
    getUserTrips,
    updateTrip,
    deleteTrip
} from '../controllers/tripController.js';
import authenticateJWT from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new trip
// authenticateJWT middleware ensures that only authenticated users can create a trip
router.post('/', authenticateJWT, createTrip);  // /trips

// Route to get all trips for the authenticated user
// authenticateJWT middleware ensures that only authenticated users can access their trips
router.get('/', authenticateJWT, getUserTrips);  // /trips

// Route to update a specific trip by tripId
// authenticateJWT middleware ensures that only authenticated users can update their trips
router.put('/:tripId', authenticateJWT, updateTrip);  // /trips/:tripId

// Route to delete a specific trip by tripId
// authenticateJWT middleware ensures that only authenticated users can delete their trips
router.delete('/:tripId', authenticateJWT, deleteTrip);  // /trips/:tripId

// Export the router to be used in other parts of the application
export default router;
