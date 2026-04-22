import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
            A
          </div>

          <h1 className="text-2xl font-bold mt-4">
            Admin Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to manage FreshCart
          </p>
        </div>

        <form
          onSubmit={handleAdminLogin}
          className="mt-6 space-y-4"
        >
          <input
            type="email"
            placeholder="admin@freshcart.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
          >
            Sign In to Admin Panel
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          <Link
            to="/login"
            className="text-gray-600 hover:text-black"
          >
            ← Back to User Login
          </Link>
        </p>

      </div>
    </div>
  );
}