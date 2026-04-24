import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaGoogle,
  FaFacebookF,
  FaFingerprint,
} from "react-icons/fa";

import {
  startAuthentication,
} from "@simplewebauthn/browser";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const from =
    location.state?.from?.pathname || "/";

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );

    const token =
      params.get("token");

    if (token) {
      localStorage.setItem(
        "token",
        token
      );

      login({ token });

      navigate(from);
    }
  }, [login, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data =
        await loginUser(
          formData
        );

      login(data);

      navigate(from);

    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  const handleGoogleLogin =
    () => {
      window.open(
        "http://localhost:5000/api/auth/google",
        "_self"
      );
    };

  const handlePasskeyLogin =
    async () => {
      try {
        const res =
          await fetch(
            "http://localhost:5000/api/passkey/login/options",
            {
              method:
                "POST",
            }
          );

        const options =
          await res.json();

        await startAuthentication(
          options
        );

        const verify =
          await fetch(
            "http://localhost:5000/api/passkey/login/verify",
            {
              method:
                "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  email:
                    formData.email,
                }
              ),
            }
          );

        const data =
          await verify.json();

        login(data);

        navigate(from);

      } catch {
        setError(
          "Passkey login failed"
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

          <button
            type="button"
            onClick={
              handleGoogleLogin
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2"
          >
            <FaGoogle />
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2"
          >
            <FaFacebookF />
            Continue with Facebook
          </button>

          <button
            type="button"
            onClick={
              handlePasskeyLogin
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2"
          >
            <FaFingerprint />
            Use Passkey
          </button>

        </div>

        <div className="my-5 text-center text-gray-400">
          or
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

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
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Sign In
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}