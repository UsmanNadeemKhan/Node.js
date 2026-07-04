const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airlineName: { type: String, required: true },
  origin: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true } // new field
});

module.exports = mongoose.model("Flight", flightSchema);
