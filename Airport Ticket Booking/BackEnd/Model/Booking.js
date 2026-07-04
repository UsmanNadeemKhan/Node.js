const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  bookingDate: { type: Date, default: Date.now },
  seatsBooked: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" }
});

module.exports = mongoose.model("Booking", bookingSchema);
