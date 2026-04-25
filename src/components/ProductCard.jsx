import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import {
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import axios from "../utils/axiosInstance";

import { useAuth } from "../context/AuthContext";

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !user._id) {
      localStorage.setItem(
        "redirectAfterLogin",
        location.pathname
      );

      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "/cart/add",
        {
          userId: user._id,
          product: {
            productId: id,
            name,
            price,
            image: image.replace(
              "http://localhost:5000/uploads/",
              ""
            ),
            qty: 1,
          },
        }
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      navigate("/cart");

    } catch (error) {
      setMessage(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm">

      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover rounded-xl"
        />

        <p className="text-sm text-gray-500 mt-4">
          {category}
        </p>

        <h3 className="font-bold text-lg">
          {name}
        </h3>
      </Link>

      <div className="flex gap-1 text-yellow-500 mt-2">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      <p className="text-green-600 text-2xl font-bold mt-3">
        Rs {price}
      </p>

      <button
        onClick={addToCart}
        disabled={loading}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl"
      >
        <FaShoppingCart className="inline mr-2" />

        {loading
          ? "Adding..."
          : "Add To Cart"}
      </button>

      {message && (
        <p className="text-red-500 text-sm mt-2 text-center">
          {message}
        </p>
      )}

    </div>
  );
}