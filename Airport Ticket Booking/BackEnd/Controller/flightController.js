const flightService = require('../Service/flightService');
const mongoose = require('mongoose');

// Create flight
async function createFlight(req, res) {
  try {
    const flight = await flightService.createFlight(req.body);
    res.status(201).json({ message: "Flight created successfully", flight });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all flights
async function getAllFlights(req, res) {
  try {
    const flights = await flightService.getAllFlights();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get flight by ID
async function getFlightById(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid flight ID" });

  try {
    const flight = await flightService.getFlightById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update flight
async function updateFlight(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid flight ID" });

  try {
    const flight = await flightService.updateFlight(req.params.id, req.body);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json({ message: "Flight updated successfully", flight });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete flight
async function deleteFlight(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid flight ID" });

  try {
    const flight = await flightService.deleteFlight(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json({ message: "Flight deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight
};
