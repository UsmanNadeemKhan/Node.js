import { useState } from "react";
import { signup } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");

    try {
      // Determine role from email
      const role = form.email.endsWith("@admin.com") ? "admin" : "passenger";

      await signup({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: "0000000000",
        role, // send role to backend (optional)
      });

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/business-travel-perspective-view-jet-airliner-flight-bokeh-background-39743030.jpg')"
      }}
    >
      <div className="bg-white/90 p-10 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Create Account
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          name="fullName"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded border"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-3 rounded border"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full p-3 mb-5 rounded border"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white p-3 rounded font-semibold"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
