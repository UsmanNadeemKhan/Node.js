// src/components/DeleteFlight.jsx
import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function DeleteFlight() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all flights on component load
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.get("/flights");
        setFlights(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch flights");
      }
    };
    fetchFlights();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await api.delete(`/flights/${id}`);
      setFlights(flights.filter((f) => f._id !== id));
      setSuccess("Flight deleted successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete flight");
      setSuccess("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Flights</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Flight Number</th>
            <th className="py-2 px-4 border-b">Airline</th>
            <th className="py-2 px-4 border-b">Origin</th>
            <th className="py-2 px-4 border-b">Destination</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight._id} className="text-center">
              <td className="py-2 px-4 border-b">{flight.flightNumber}</td>
              <td className="py-2 px-4 border-b">{flight.airlineName}</td>
              <td className="py-2 px-4 border-b">{flight.origin}</td>
              <td className="py-2 px-4 border-b">{flight.destinationCity}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(flight._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {flights.length === 0 && (
            <tr>
              <td colSpan="5" className="py-4 text-gray-500">
                No flights available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
