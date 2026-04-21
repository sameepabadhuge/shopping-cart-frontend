import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaFingerprint } from "react-icons/fa";

import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);

      alert("Account created successfully");

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
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
          Create your account
        </p>

        <div className="mt-6 space-y-3">

          <button
            type="button"
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FaGoogle /> Continue with Google
          </button>

          <button
            type="button"
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FaFacebookF /> Continue with Facebook
          </button>

          <button
            type="button"
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FaFingerprint /> Use Passkey
          </button>

        </div>

        <div className="my-5 text-center text-gray-400">or</div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

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
            Create Account
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}