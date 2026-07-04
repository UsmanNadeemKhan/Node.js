// src/components/ViewAllUsers.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users"); // make sure you have a backend endpoint for /api/users
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Registered Users</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 rounded shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="py-2 px-4 border-b">{user.fullName}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.email.endsWith("@admin.com") ? "Admin" : "User"}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="3" className="py-4 text-gray-500">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
