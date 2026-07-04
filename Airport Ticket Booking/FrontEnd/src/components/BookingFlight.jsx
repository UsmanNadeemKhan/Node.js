import { useEffect, useState } from "react";
import api from "../api/axios";

export default function BookingFlight() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [form, setForm] = useState({
    passengerName: "",
    seats: 1,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // fetch flights
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await api.get("/flights");
        setFlights(res.data);
      } catch {
        setError("Failed to load flights");
      }
    };
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleBooking = async () => {
    if (!selectedFlight) {
      setError("Please select a flight");
      return;
    }

    try {
      const flightData = flights.find(f => f._id === selectedFlight);
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const userId = currentUser._id;

      await api.post("/bookings/create", {
        flightId: selectedFlight,
        userId: userId,
        seatsBooked: form.seats,
        price: flightData?.price || 0, // still sent to backend
      });

      setMessage("Flight booked successfully");
      setForm({ passengerName: "", seats: 1 });
      setSelectedFlight("");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Book a Flight</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      {/* Flight dropdown */}
      <select
        value={selectedFlight}
        onChange={(e) => setSelectedFlight(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="">Select Flight</option>
        {flights.map((f) => (
          <option key={f._id} value={f._id}>
            {f.flightNumber} — {f.origin} → {f.destinationCity}
          </option>
        ))}
      </select>

      <input
        name="passengerName"
        placeholder="Passenger Name"
        value={form.passengerName}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <select
        name="seats"
        value={form.seats}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      >
        {[1,2,3,4,5].map(n => (
          <option key={n} value={n}>{n} Seat(s)</option>
        ))}
      </select>

      <button
        onClick={handleBooking}
        className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
      >
        Book Flight
      </button>
    </div>
  );
}
