import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function ViewBookedFlights() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings"); // your backend route
        setBookings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Booked Flights</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Flight Number</th>
            <th className="border px-4 py-2">Airline</th>
            <th className="border px-4 py-2">Origin</th>
            <th className="border px-4 py-2">Destination</th>
            <th className="border px-4 py-2">Departure</th>
            <th className="border px-4 py-2">Arrival</th>
            <th className="border px-4 py-2">Seats</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => {
            const flight = booking.flightId || {};
            const user = booking.userId || {};
            return (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{flight.flightNumber || "-"}</td>
                <td className="border px-4 py-2">{flight.airlineName || "-"}</td>
                <td className="border px-4 py-2">{flight.origin || "-"}</td>
                <td className="border px-4 py-2">{flight.destinationCity || "-"}</td>
                <td className="border px-4 py-2">
                  {flight.departureTime ? new Date(flight.departureTime).toLocaleString() : "-"}
                </td>
                <td className="border px-4 py-2">
                  {flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : "-"}
                </td>
                <td className="border px-4 py-2">{booking.seatsBooked || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
