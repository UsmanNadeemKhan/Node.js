// src/components/UpdateFlight.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function UpdateFlight() {
  const [flights, setFlights] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchFlights = async () => {
    try {
      const res = await api.get("/flights");
      setFlights(res.data);
    } catch {
      setError("Failed to fetch flights");
    }
  };

  const handleSelect = (flight) => {
    setSelected(flight._id);
    setForm({
      flightNumber: flight.flightNumber,
      airlineName: flight.airlineName,
      origin: flight.origin,
      destinationCity: flight.destinationCity,
      departureTime: new Date(flight.departureTime).toISOString().slice(0,16),
      arrivalTime: new Date(flight.arrivalTime).toISOString().slice(0,16)
    });
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/flights/${selected}`, {
        ...form,
        departureTime: new Date(form.departureTime),
        arrivalTime: new Date(form.arrivalTime)
      });
      setSuccess("Flight updated successfully!");
      fetchFlights();
      setSelected(null);
      setForm({});
    } catch {
      setError("Failed to update flight");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">Update Flight</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}
      
      <ul className="flex flex-col gap-2 mb-4">
        {flights.map((flight) => (
          <li key={flight._id} className="flex justify-between items-center bg-white p-3 rounded shadow">
            <span>{flight.flightNumber} - {flight.airlineName}</span>
            <button
              onClick={() => handleSelect(flight)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
          <input name="flightNumber" value={form.flightNumber} onChange={handleChange} placeholder="Flight Number" className="p-2 border rounded" />
          <input name="airlineName" value={form.airlineName} onChange={handleChange} placeholder="Airline Name" className="p-2 border rounded" />
          <input name="origin" value={form.origin} onChange={handleChange} placeholder="Origin" className="p-2 border rounded" />
          <input name="destinationCity" value={form.destinationCity} onChange={handleChange} placeholder="Destination City" className="p-2 border rounded" />
          <input type="datetime-local" name="departureTime" value={form.departureTime} onChange={handleChange} className="p-2 border rounded" />
          <input type="datetime-local" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} className="p-2 border rounded" />
          <button onClick={handleUpdate} className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700">Update Flight</button>
        </div>
      )}
    </div>
  );
}
