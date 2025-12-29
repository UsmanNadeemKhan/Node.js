// src/components/BookedFlights.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function BookedFlights() {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookedFlights = async () => {
      try {
        const response = await api.get("/bookings"); // fetch all bookings
        setBookedFlights(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch booked flights.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookedFlights();
  }, []);

  if (loading) return <p className="text-gray-700 mt-4">Loading booked flights...</p>;
  if (error) return <p className="text-red-500 mt-4">{error}</p>;
  if (bookedFlights.length === 0)
    return <p className="text-gray-700 mt-4">You have no booked flights.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">My Booked Flights</h2>
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
          {bookedFlights.map((booking) => {
            const flight = booking.flightId; // access nested flight object
            if (!flight) return null; // skip if flight data is missing

            return (
              <tr key={booking._id} className="text-center">
                <td className="py-2 px-4 border-b">{flight.flightNumber || "N/A"}</td>
                <td className="py-2 px-4 border-b">{flight.airlineName || "N/A"}</td>
                <td className="py-2 px-4 border-b">{flight.origin || "N/A"}</td>
                <td className="py-2 px-4 border-b">{flight.destinationCity || "N/A"}</td>
                <td className="py-2 px-4 border-b">
                  {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
