// src/components/ViewFlights.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios"; // make sure axios.js is in src/api/

export default function ViewFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get("/flights"); // adjust endpoint if different
        setFlights(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch flights.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) return <p className="text-gray-700">Loading flights...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (flights.length === 0) return <p className="text-gray-700">No flights available.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Available Flights</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Flight Number</th>
            <th className="py-2 px-4 border-b">Airline</th>
            <th className="py-2 px-4 border-b">Origin</th>
            <th className="py-2 px-4 border-b">Destination</th>
            <th className="py-2 px-4 border-b">Departure Time</th>
            <th className="py-2 px-4 border-b">Arrival Time</th>
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
        </tbody>
      </table>
    </div>
  );
}
