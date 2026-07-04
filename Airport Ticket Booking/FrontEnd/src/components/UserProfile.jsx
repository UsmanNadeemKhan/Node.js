// src/components/UserProfile.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios"; // your axios instance

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch current user info
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me"); // your endpoint to get user data
        setProfile({ ...res.data, password: "" }); // don't fill password
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", profile); // update endpoint
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
