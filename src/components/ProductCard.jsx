import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";

import {
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { useState } from "react";

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // ✅ FIXED CHECK
    if (!user || !user._id) {
      setMessage(
        "Please login first"
      );

      setTimeout(() => {
        navigate("/login", {
          state: {
            from: location,
          },
        });
      }, 1200);

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId: user._id,
          product: {
            productId: id,
            name: name,
            price: price,
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

      setMessage(
        "Added to cart successfully!"
      );

      setTimeout(() => {
        setMessage("");
      }, 1500);

    } catch (error) {
      console.log(error);

      setMessage(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-xl transition">

      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover rounded-xl"
        />

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {category}
          </p>

          <h3 className="font-bold text-lg mt-1">
            {name}
          </h3>
        </div>
      </Link>

      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
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
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl flex items-center justify-center gap-2"
      >
        <FaShoppingCart />

        {loading
          ? "Adding..."
          : "Add To Cart"}
      </button>

      {message && (
        <p className="text-sm text-center mt-3 text-green-600 font-medium">
          {message}
        </p>
      )}

    </div>
  );
}