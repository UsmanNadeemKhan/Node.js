// src/components/Sidebar.jsx
import React from "react";

export default function Sidebar({ onSelect }) {
  const menuItems = [
    { label: "View All Registered Users", key: "users" },
    { label: "View All Flights", key: "flights" },
    { label: "View All Booked Flights", key: "booked" },
    { label: "Create New Flight", key: "create" },
    { label: "Update Flight Information", key: "update" },
    { label: "Delete Flight Information", key: "delete" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-gray-900 text-gray-100 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>
        <ul className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className="cursor-pointer px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => onSelect(item.key)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
