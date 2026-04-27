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

import axios from "../../utils/axiosInstance";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const { login } =
    useAuth();

  const from =
    localStorage.getItem(
      "redirectAfterLogin"
    ) ||
    location.state?.from
      ?.pathname ||
    "/";

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    passkeyLoading,
    setPasskeyLoading,
  ] = useState(false);

  /* =========================
     GOOGLE + FACEBOOK TOKEN LOGIN
  ========================= */
  useEffect(() => {
    const socialLogin =
      async () => {
        const params =
          new URLSearchParams(
            window.location.search
          );

        const token =
          params.get("token");

        if (!token) return;

        try {
          const res =
            await fetch(
              `${import.meta.env.VITE_API_URL}/auth/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const profile =
            await res.json();

          login({
            ...profile,
            token,
          });

          window.history.replaceState(
            {},
            document.title,
            "/login"
          );

          navigate(from, {
            replace: true,
          });
        } catch {
          setError(
            "Social login failed"
          );
        }
      };

    socialLogin();
  }, [
    login,
    navigate,
    from,
  ]);

  /* =========================
     EMAIL LOGIN
  ========================= */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        const data =
          await loginUser(
            formData
          );

        login(data);

        navigate(from, {
          replace: true,
        });
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  /* =========================
     GOOGLE LOGIN
  ========================= */
  const handleGoogleLogin =
    () => {
      window.open(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        "_self"
      );
    };

  /* =========================
     FACEBOOK LOGIN
  ========================= */
  const handleFacebookLogin =
    () => {
      window.open(
        `${import.meta.env.VITE_API_URL}/auth/facebook`,
        "_self"
      );
    };

  /* =========================
     PASSKEY LOGIN
  ========================= */
  const handlePasskeyLogin =
    async () => {
      try {
        setPasskeyLoading(
          true
        );

        setError("");

        const {
          data: options,
        } = await axios.post(
          "/passkey/login/options"
        );

        const credential =
          await startAuthentication(
            {
              optionsJSON:
                options,
            }
          );

        const {
          data,
        } = await axios.post(
          "/passkey/login/verify",
          {
            credential,
          }
        );

        login(data);

        navigate(from, {
          replace: true,
        });
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            err.message ||
            "Passkey login failed"
        );
      } finally {
        setPasskeyLoading(
          false
        );
      }
    };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-green-600">
          FreshCart
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue
          shopping
        </p>

        {/* Social Login */}
        <div className="mt-6 space-y-3">
          {/* Google */}
          <button
            type="button"
            onClick={
              handleGoogleLogin
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <FaGoogle />
            Continue with Google
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={
              handleFacebookLogin
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-blue-50 transition"
          >
            <FaFacebookF />
            Continue with Facebook
          </button>

          {/* Passkey */}
          <button
            type="button"
            onClick={
              handlePasskeyLogin
            }
            disabled={
              passkeyLoading
            }
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 disabled:opacity-60 hover:bg-gray-50 transition"
          >
            <FaFingerprint />

            {passkeyLoading
              ? "Loading..."
              : "Use Passkey"}
          </button>
        </div>

        <div className="my-5 text-center text-gray-400">
          or
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-3 text-sm text-center">
            {error}
          </p>
        )}

        {/* Email Login */}
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3"
            value={
              formData.email
            }
            onChange={(
              e
            ) =>
              setFormData({
                ...formData,
                email:
                  e.target
                    .value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3"
            value={
              formData.password
            }
            onChange={(
              e
            ) =>
              setFormData({
                ...formData,
                password:
                  e.target
                    .value,
              })
            }
          />

          <button
            type="submit"
            disabled={
              loading
            }
            className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-60 hover:bg-green-700 transition"
          >
            {loading
              ? "Please wait..."
              : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          Don&apos;t have an
          account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}