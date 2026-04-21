import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaFingerprint } from "react-icons/fa";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      login(data);

      navigate("/home");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-green-600">
          FreshCart
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue shopping
        </p>

        <div className="mt-6 space-y-3">

          <button type="button" className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            <FaGoogle /> Continue with Google
          </button>

          <button type="button" className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            <FaFacebookF /> Continue with Facebook
          </button>

          <button type="button" className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50">
            <FaFingerprint /> Use Passkey
          </button>

        </div>

        <div className="my-5 text-center text-gray-400">or</div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Sign In
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Sign up
          </Link>
        </p>

        <p className="text-center mt-3 text-sm">
          <Link to="/admin/login" className="text-gray-600 hover:text-green-600">
            Admin Login
          </Link>
        </p>

      </div>
    </div>
  );
}