import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaBoxOpen,
} from "react-icons/fa";

import {
  useEffect,
  useState,
  useCallback,
} from "react";

import axios from "axios";

export default function Navbar() {
  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const loadCartCount = useCallback(
    async () => {
      try {
        if (!user) {
          setCartCount(0);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/cart/${user._id}`
        );

        const items =
          res.data.items || [];

        const totalQty =
          items.reduce(
            (sum, item) =>
              sum + item.qty,
            0
          );

        setCartCount(totalQty);

      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

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
  }, [loadCartCount]);

  const handleLogout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    setProfileOpen(false);

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          FreshCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">

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
            Shop
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-green-600"
          >
            <FaShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {!user ? (
            <Link
              to="/login"
              className="hover:text-green-600"
            >
              <FaUser size={20} />
            </Link>
          ) : (
            <div className="relative">

              <button
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                className="hover:text-green-600"
              >
                <FaUser size={20} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg p-2">

                  <p className="px-3 py-2 text-sm font-semibold border-b">
                    {user.name ||
                      "My Account"}
                  </p>

                  <Link
                    to="/orders"
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg"
                    onClick={() =>
                      setProfileOpen(
                        false
                      )
                    }
                  >
                    <FaBoxOpen />
                    My Orders
                  </Link>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg text-left text-red-500"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Mobile Button */}
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
        <div className="md:hidden border-t px-4 py-4 space-y-4 bg-white">

          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block"
          >
            Home
          </Link>

          <Link
            to="/products"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block"
          >
            Shop
          </Link>

          <Link
            to="/cart"
            onClick={() =>
              setMenuOpen(false)
            }
            className="block"
          >
            Cart ({cartCount})
          </Link>

          {!user ? (
            <Link
              to="/login"
              onClick={() =>
                setMenuOpen(false)
              }
              className="block"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/orders"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="block"
              >
                My Orders
              </Link>

              <button
                onClick={
                  handleLogout
                }
                className="block text-red-500"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}