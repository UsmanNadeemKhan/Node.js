const Booking = require('../Model/Booking');
const Flight = require('../Model/Flight_info');


// Create booking
async function createBooking(data) {
  const flight = await Flight.findById(data.flightId);
  if (!flight) throw new Error("Flight not found");

  // Calculate total price automatically
  const totalPrice = flight.price * data.seatsBooked;

  const booking = new Booking({
    ...data,
    price: totalPrice
  });

  await booking.save();
  return booking;
}

// Get all bookings
async function getAllBookings() {
  return await Booking.find().populate('userId').populate('flightId');
}

// Get single booking
async function getBookingById(id) {
  return await Booking.findById(id).populate('userId').populate('flightId');
}

// Update booking
async function updateBooking(id, data) {
  return await Booking.findByIdAndUpdate(id, data, { new: true });
}

// Delete booking
async function deleteBooking(id) {
  return await Booking.findByIdAndDelete(id);
}

module.exports = { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };
