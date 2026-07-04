// src/components/UserSidebar.jsx
import React from "react";

export default function UserSidebar({ onSelect }) {
  const menuItems = [
    { label: "View Flights", key: "flights" },
    { label: "Booking Flight", key: "booking" },
    { label: "My Booked Flights", key: "booked" },
    { label: "My Profile", key: "profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-gray-900 text-gray-100 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-10 text-center">User Panel</h2>
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
        className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition mt-6"
      >
        Logout
      </button>
    </div>
  );
}
