import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

export default function AdminLogin() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            "http://localhost:5000/api/auth/admin-login",
            formData
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        navigate(
          "/admin/dashboard"
        );

      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">

        <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold mx-auto">
          A
        </div>

        <h1 className="text-4xl font-bold text-center mt-6">
          Admin Portal
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to manage FreshCart
        </p>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5 mt-8"
        >

          <input
            type="email"
            name="email"
            placeholder="admin@freshcart.com"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl px-4 py-4"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl px-4 py-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            Sign In to Admin Panel
          </button>

        </form>

      </div>

    </div>
  );
}