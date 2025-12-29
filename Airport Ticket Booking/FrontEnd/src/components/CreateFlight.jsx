// src/components/CreateFlight.jsx
import { useState } from "react";
import api from "../api/axios";

export default function CreateFlight() {
  const [form, setForm] = useState({
    flightNumber: "",
    airlineName: "",
    origin: "",
    destinationCity: "",
    departureTime: "",
    arrivalTime: "",
    price: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        departureTime: new Date(form.departureTime),
        arrivalTime: new Date(form.arrivalTime),
      };

      await api.post("/flights/create", payload);

      setSuccess("Flight created successfully!");
      setForm({
        flightNumber: "",
        airlineName: "",
        origin: "",
        destinationCity: "",
        departureTime: "",
        arrivalTime: "",
        price: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create flight");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow w-full">
      <h2 className="text-xl font-bold mb-4">Create New Flight</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <div className="flex flex-col gap-3">
        <input name="flightNumber" placeholder="Flight Number" value={form.flightNumber} onChange={handleChange} className="p-2 border rounded" />
        <input name="airlineName" placeholder="Airline Name" value={form.airlineName} onChange={handleChange} className="p-2 border rounded" />
        <input name="origin" placeholder="Origin City" value={form.origin} onChange={handleChange} className="p-2 border rounded" />
        <input name="destinationCity" placeholder="Destination City" value={form.destinationCity} onChange={handleChange} className="p-2 border rounded" />
        <input name="departureTime" type="datetime-local" value={form.departureTime} onChange={handleChange} className="p-2 border rounded" />
        <input name="arrivalTime" type="datetime-local" value={form.arrivalTime} onChange={handleChange} className="p-2 border rounded" />

        <button onClick={handleSubmit} className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700">
          Create Flight
        </button>
      </div>
    </div>
  );
}
