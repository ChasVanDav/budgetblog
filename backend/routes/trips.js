const express = require('express');
const { createTrip, getUserTrips, updateTrip, deleteTrip } = require('../controllers/tripController');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();


router.post('/trip', authenticateJWT, createTrip);

router.get('/trip', authenticateJWT, getUserTrips);

router.put('/trip/:tripId', authenticateJWT, updateTrip);

router.delete('/trip/:tripId', authenticateJWT, deleteTrip);

module.exports = router;
