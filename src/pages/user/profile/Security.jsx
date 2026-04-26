import { useState } from "react";

import {
  FaArrowLeft,
  FaLock,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  startRegistration,
} from "@simplewebauthn/browser";

import axios from "../../../utils/axiosInstance";
import { useAuth } from "../../../context/AuthContext";

export default function Security() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* =========================
     ADD PASSKEY
  ========================= */
  const handleAddPasskey =
    async () => {
      try {
        setLoading(true);
        setMessage("");

        const {
          data: options,
        } = await axios.post(
          "/passkey/register/options",
          {
            email: user.email,
          }
        );

        // v13 FIX
        const credential =
          await startRegistration({
            optionsJSON:
              options,
          });

        const res =
          await axios.post(
            "/passkey/register/verify",
            {
              email:
                user.email,
              credential,
            }
          );

        setMessage(
          res.data.message
        );
      } catch (err) {
        setMessage(
          err.response?.data
            ?.message ||
            err.message ||
            "Failed to add passkey"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================
     REMOVE PASSKEY
  ========================= */
  const handleRemove =
    async () => {
      try {
        setLoading(true);
        setMessage("");

        const res =
          await axios.delete(
            "/passkey/remove",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

        setMessage(
          res.data.message
        );
      } catch (err) {
        setMessage(
          err.response?.data
            ?.message ||
            err.message ||
            "Failed to remove passkey"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-green-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() =>
              navigate("/")
            }
            className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm"
          >
            <FaArrowLeft />
            Home
          </button>

          <h1 className="text-4xl font-bold text-green-600 flex items-center gap-3">
            <FaLock />
            Security
          </h1>

          <div></div>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-xl">
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Add Passkey */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <div className="flex gap-3 items-center mb-5">
              <FaPlus className="text-green-600" />

              <h2 className="text-2xl font-semibold">
                Add Windows Hello Passkey
              </h2>
            </div>

            <button
              onClick={
                handleAddPasskey
              }
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : "Add Passkey"}
            </button>
          </div>

          {/* Remove Passkey */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <div className="flex gap-3 items-center mb-5">
              <FaTrash className="text-red-600" />

              <h2 className="text-2xl font-semibold">
                Remove Passkey
              </h2>
            </div>

            <button
              onClick={
                handleRemove
              }
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : "Remove Passkey"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}