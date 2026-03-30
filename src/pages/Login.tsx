import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [role, setRole] = useState("cashier");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock validation - replace with real API later
      if (role === "cashier") {
        if (pin !== "1234" && pin !== "5678") {
          throw new Error("Invalid PIN");
        }
        login({ username: `cashier-${pin}`, role });
      } else {
        if (!username || !password) {
          throw new Error("Username and password required");
        }
        // Mock credentials: admin/admin, manager/manager
        if ((username === "admin" && password === "admin") ||
            (username === "manager" && password === "manager")) {
          login({ username, role });
        } else {
          throw new Error("Invalid credentials");
        }
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/50"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Hardware Hub POS
        </h2>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Role</label>
          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="cashier">Cashier</option>
          </select>
        </div>
        {role === "cashier" ? (
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">PIN</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pr-12"
              placeholder="Enter 4-6 digit PIN"
              value={pin}
              onChange={e => setPin(e.target.value)}
              maxLength={6}
              pattern="\d{4,6}"
              required
              disabled={loading}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">Username</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required={!loading}
                disabled={loading}
              />
            </div>
            <div className="mb-8">
              <label className="block mb-2 font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required={!loading}
                disabled={loading}
              />
            </div>
          </>
        )}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

