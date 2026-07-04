// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateFlight from "../components/CreateFlight";
import UpdateFlight from "../components/UpdateFlight";
import DeleteFlight from "../components/DeleteFlight";
import ViewAllFlights from "../components/ViewAllFlights";
import ViewAllUsers from "../components/ViewAllUsers";
import ViewBookedFlights from "../components/ViewBookedFlights";


// import other components if needed

export default function AdminDashboard() {
  const [selected, setSelected] = useState(""); // track selected menu

  const renderContent = () => {
    switch (selected) {
      case "create":
        return <CreateFlight />;
      case "update":
        return <UpdateFlight />;
      case "delete":
        return <DeleteFlight />;
        case "users":
        return <ViewAllUsers />;
      case "flights":
        return <ViewAllFlights />;
      case "booked":
        return <ViewBookedFlights />;
      // you can add other cases like users, booked, cancelled
      default:
        return (
          <div className="text-gray-700 text-center mt-20">
            <h2 className="text-2xl font-semibold">Welcome to Admin Dashboard</h2>
            <p>Select an option from the sidebar to manage flights or users.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelect={setSelected} />
      <div className="flex-1 p-6 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
}
