import { useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });
      const user = res.data.user;
      const token = res.data.token;

      // Store token
      localStorage.setItem("token", token);

      // Determine role by email domain
      const role = user.email.endsWith("@admin.com") ? "admin" : "passenger";
      localStorage.setItem("user", JSON.stringify({ ...user, role }));

      // Redirect based on role
      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/airport-scene-with-airplane-person_23-2152005588.jpg?semt=ais_hybrid&w=740&q=80')",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full p-3 mb-3 rounded border"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="w-full p-3 mb-5 rounded border"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white p-3 rounded font-semibold"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
