const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require('../Service/bookingService');
const mongoose = require('mongoose');

// Create booking
async function addBooking(req, res) {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all bookings
async function fetchAllBookings(req, res) {
  try {
    const bookings = await getAllBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get single booking
async function fetchBooking(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid booking ID" });

  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update booking
async function modifyBooking(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid booking ID" });

  try {
    const booking = await updateBooking(req.params.id, req.body);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking updated successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete booking
async function removeBooking(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid booking ID" });

  try {
    const booking = await deleteBooking(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { addBooking, fetchAllBookings, fetchBooking, modifyBooking, removeBooking };
