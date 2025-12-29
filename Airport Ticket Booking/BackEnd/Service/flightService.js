const Flight = require('../Model/Flight_info');

// Create flight
async function createFlight(data) {
  const flight = new Flight(data);
  await flight.save();
  return flight;
}

// Get all flights
async function getAllFlights() {
  return await Flight.find();
}

// Get flight by ID
async function getFlightById(id) {
  return await Flight.findById(id);
}

// Update flight
async function updateFlight(id, data) {
  return await Flight.findByIdAndUpdate(id, data, { new: true });
}

// Delete flight
async function deleteFlight(id) {
  return await Flight.findByIdAndDelete(id);
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight
};
