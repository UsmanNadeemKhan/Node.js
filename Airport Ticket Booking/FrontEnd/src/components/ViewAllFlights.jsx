// src/components/ViewAllFlights.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function ViewAllFlights() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Flights</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Flight Number</th>
            <th className="py-2 px-4 border-b">Airline</th>
            <th className="py-2 px-4 border-b">Origin</th>
            <th className="py-2 px-4 border-b">Destination</th>
            <th className="py-2 px-4 border-b">Departure</th>
            <th className="py-2 px-4 border-b">Arrival</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight._id} className="text-center">
              <td className="py-2 px-4 border-b">{flight.flightNumber}</td>
              <td className="py-2 px-4 border-b">{flight.airlineName}</td>
              <td className="py-2 px-4 border-b">{flight.origin}</td>
              <td className="py-2 px-4 border-b">{flight.destinationCity}</td>
              <td className="py-2 px-4 border-b">{new Date(flight.departureTime).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(flight.arrivalTime).toLocaleString()}</td>
            </tr>
          ))}
          {flights.length === 0 && (
            <tr>
              <td colSpan="6" className="py-4 text-gray-500">
                No flights available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
