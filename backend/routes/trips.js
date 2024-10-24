const express = require('express');
const { createTrip, getUserTrips, updateTrip, deleteTrip } = require('../controllers/tripController');
const authenticateJWT = require('../middlewares/auth');

const router = express.Router();


router.post('/create', authenticateJWT, createTrip);

router.get('/view', authenticateJWT, getUserTrips);

router.put('/view/:tripId', authenticateJWT, updateTrip);

router.delete('/view/:tripId', authenticateJWT, deleteTrip);

module.exports = router;
