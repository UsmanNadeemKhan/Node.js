const express = require("express");
const router = express.Router();
const {createFlight , getAllFlights ,  getFlightById , updateFlight , deleteFlight } = require("../Controller/flightController");
const authenticateToken = require("../Middleware/auth");

// All endpoints protected
router.post("/create", authenticateToken, createFlight);
router.get("/", authenticateToken, getAllFlights);
router.get("/:id", authenticateToken,getFlightById);
router.put("/:id", authenticateToken,updateFlight);
router.delete("/:id", authenticateToken, deleteFlight);

module.exports = router;
