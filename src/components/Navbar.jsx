import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCog,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] =
    useState(false);
  const [cartCount, setCartCount] =
    useState(0);

  const dropdownRef = useRef(null);

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
            `/api/cart/${user._id}`
          );

        const totalQty =
          res.data.items?.reduce(
            (sum, item) =>
              sum + item.qty,
            0
          ) || 0;

        setCartCount(totalQty);
      } catch {
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
     CLOSE DROPDOWN OUTSIDE CLICK
  ========================= */
  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {
          setAccountOpen(false);
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

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

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logged User */}
          {user ? (
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  setAccountOpen(
                    !accountOpen
                  )
                }
                className="flex items-center gap-2 font-medium hover:text-green-600"
              >
                <FaUser />
                
                <FaChevronDown size={12} />
              </button>

              {/* Dropdown */}
              {accountOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-lg py-2">
                  <div className="px-4 py-2 border-b text-sm text-gray-500">
                    Hi, {user.name}
                  </div>

                  <Link
                    to="/profile"
                    onClick={() =>
                      setAccountOpen(
                        false
                      )
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FaCog />
                    Settings
                  </Link>

                  <Link
                    to="/profile/security"
                    onClick={() =>
                      setAccountOpen(
                        false
                      )
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FaShieldAlt />
                    Security
                  </Link>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
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

        {/* Mobile Menu Button */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
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

      {/* Mobile Menu */}
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
            {cartCount > 0 &&
              ` (${cartCount})`}
          </Link>

          {user ? (
            <>
              <p className="font-medium">
                Hi, {user.name}
              </p>

              <Link
                to="/profile"
                className="block"
              >
                Settings
              </Link>

              <Link
                to="/profile/security"
                className="block"
              >
                Security
              </Link>

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