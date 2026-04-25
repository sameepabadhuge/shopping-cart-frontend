import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";

export default function Navbar() {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  /* =========================
     LOAD CART COUNT
  ========================= */
  const loadCartCount =
    async () => {
      try {
        if (!user?._id) {
          setCartCount(0);
          return;
        }

        const res =
          await axios.get(
            `/cart/${user._id}`
          );

        const totalQty =
          res.data.items?.reduce(
            (sum, item) =>
              sum + item.qty,
            0
          ) || 0;

        setCartCount(
          totalQty
        );

      } catch (error) {
        setCartCount(0);
      }
    };

  /* =========================
     EFFECT
  ========================= */
  useEffect(() => {
    loadCartCount();

    window.addEventListener(
      "cartUpdated",
      loadCartCount
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCartCount
      );
    };
  }, [user]);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout =
    () => {
      logout();

      localStorage.removeItem(
        "pendingCart"
      );

      localStorage.removeItem(
        "redirectAfterLogin"
      );

      navigate("/login");
    };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          FreshCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-green-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-green-600"
          >
            Products
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-green-600"
          >
            <FaShoppingCart size={20} />

            {cartCount >
              0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <>
              <span className="text-sm font-medium">
                Hi, {user.name}
              </span>

              <button
                onClick={
                  handleLogout
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <FaUser className="inline mr-2" />
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu */}
        <button
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
          className="md:hidden text-xl"
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white">

          <Link
            to="/"
            className="block"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="block"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="block"
          >
            Cart
            {cartCount >
              0 &&
              ` (${cartCount})`}
          </Link>

          {user ? (
            <>
              <p>
                Hi, {user.name}
              </p>

              <button
                onClick={
                  handleLogout
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="block bg-green-600 text-white px-4 py-2 rounded-lg text-center"
            >
              Login
            </Link>
          )}

        </div>
      )}

    </nav>
  );
}