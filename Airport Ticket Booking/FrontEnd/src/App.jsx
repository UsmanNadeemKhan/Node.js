import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"; // Passenger dashboard
import AdminDashboard from "./pages/AdminDashboard"; // Admin dashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />          {/* passenger */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* admin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
