import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaGoogle,
  FaFacebookF,
} from "react-icons/fa";

import {
  registerUser,
} from "../../services/authService";

export default function Register() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* ===============================
     INPUT CHANGE
  =============================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

    setError("");
  };

  /* ===============================
     NORMAL REGISTER
  =============================== */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        await registerUser(
          formData
        );

        alert(
          "Account created successfully"
        );

        navigate("/login");
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  /* ===============================
     GOOGLE REGISTER
  =============================== */
  const handleGoogleRegister =
    () => {
      window.open(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        "_self"
      );
    };

  /* ===============================
     FACEBOOK REGISTER
  =============================== */
  const handleFacebookRegister =
    () => {
      window.open(
        `${import.meta.env.VITE_API_URL}/auth/facebook`,
        "_self"
      );
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

        {/* SOCIAL BUTTONS */}
        <div className="mt-6 space-y-3">

          <button
            type="button"
            onClick={
              handleGoogleRegister
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FaGoogle />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={
              handleFacebookRegister
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <FaFacebookF />
            Continue with Facebook
          </button>

        </div>

        <div className="my-5 text-center text-gray-400">
          or
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* FORM */}
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={
              formData.name
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg px-4 py-3"
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
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-70"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}