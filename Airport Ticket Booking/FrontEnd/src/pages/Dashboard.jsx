// src/pages/UserDashboard.jsx
import React, { useState } from "react";
import UserSidebar from "../components/UserSidebar";
import ViewFlights from "../components/ViewFlights";
import BookedFlights from "../components/BookedFlights";
import BookingFlight from "../components/BookingFlight";
import UserProfile from "../components/UserProfile";

export default function UserDashboard() {
  const [selected, setSelected] = useState("flights");

  const renderContent = () => {
    switch (selected) {
      case "flights":
        return <ViewFlights />;
      case "booking":
        return <BookingFlight />;
      case "booked":
        return <BookedFlights />;
      case "cancel":
        return <BookedFlights cancelable={true} />;
      case "profile":
        return <UserProfile />;
      default:
        return <div className="text-center mt-20">Select an option</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <UserSidebar onSelect={setSelected} />
      <div className="flex-1 p-6 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
}
