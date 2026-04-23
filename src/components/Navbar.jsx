import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          FreshCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/" className="hover:text-green-600 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-green-600 transition">
            Shop
          </Link>

          <Link to="/cart" className="hover:text-green-600 transition">
            <FaShoppingCart size={20} />
          </Link>

          <Link to="/login" className="hover:text-green-600 transition">
            <FaUser size={20} />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 font-medium border-t">
          <Link to="/" className="block pt-3">
            Home
          </Link>

          <Link to="/products" className="block">
            Shop
          </Link>

          <Link to="/cart" className="block">
            Cart
          </Link>

          <Link to="/login" className="block">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}