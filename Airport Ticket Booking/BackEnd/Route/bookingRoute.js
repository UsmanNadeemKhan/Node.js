const express = require('express');
const router = express.Router();
const { addBooking, fetchAllBookings, fetchBooking, modifyBooking, removeBooking } = require('../Controller/bookingController');
const authenticateToken = require('../Middleware/auth');

// Protected routes
router.post('/create', authenticateToken, addBooking);
router.get('/', authenticateToken, fetchAllBookings);
router.get('/:id', authenticateToken, fetchBooking);
router.put('/:id', authenticateToken, modifyBooking);
router.delete('/:id', authenticateToken, removeBooking);

module.exports = router;
