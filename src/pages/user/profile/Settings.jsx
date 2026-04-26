import {
  useState,
  useEffect,
} from "react";

import {
  FaArrowLeft,
  FaUserCog,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import axios from "../../../utils/axiosInstance";

import {
  useAuth,
} from "../../../context/AuthContext";

export default function Settings() {
  const navigate =
    useNavigate();

  const {
    user,
    updateUser,
  } = useAuth();

  const [form,
    setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [message,
    setMessage] =
    useState("");

  /* =========================
     LOAD USER DATA
  ========================= */
  useEffect(() => {
    if (user) {
      setForm({
        name:
          user.name || "",
        email:
          user.email || "",
        phone:
          user.phone || "",
      });
    }
  }, [user]);

  /* =========================
     INPUT CHANGE
  ========================= */
  const handleChange =
    (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

  /* =========================
     SAVE PROFILE
  ========================= */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        setMessage("");

        const res =
          await axios.put(
            "/user/update-profile",
            form,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        updateUser(
          res.data.user
        );

        setMessage(
          "Profile updated successfully"
        );
      } catch {
        setMessage(
          "Update failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() =>
              navigate("/")
            }
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50"
          >
            <FaArrowLeft />
            Home
          </button>

          <h1 className="text-4xl font-bold text-green-600 flex items-center gap-3">
            <FaUserCog />
            Settings
          </h1>

          <div></div>

        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border">

          {message && (
            <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">
              {message}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}