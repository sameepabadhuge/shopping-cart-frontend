import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);

    } catch (error) {
      console.log(error);
      setProduct(null);

    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // ✅ Fixed Login Check
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
      }, 1500);

      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId: user._id,
          product: {
            productId:
              product._id,

            name:
              product.name,

            price:
              product.price,

            image:
              product.image,

            qty: 1,
          },
        }
      );

      window.dispatchEvent(
        new Event(
          "cartUpdated"
        )
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
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="text-center py-32 text-xl font-semibold">
          Loading...
        </div>

        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="text-center py-32 text-xl font-semibold text-red-500">
          Product Not Found
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="px-4 md:px-6 py-14">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Product Image */}
          <div>
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div>

            <p className="text-green-600 font-semibold text-lg">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 text-yellow-500 mt-4">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

              <span className="text-gray-500 ml-2">
                (5 Reviews)
              </span>
            </div>

            <p className="text-green-600 text-4xl font-bold mt-6">
              Rs {product.price}
            </p>

            <p className="text-gray-600 mt-6 leading-8 text-lg">
              {product.description ||
                "No description available."}
            </p>

            <p className="mt-5 text-base text-gray-500">
              Stock Available: {product.stock}
            </p>

            <button
              onClick={addToCart}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition"
            >
              <FaShoppingCart />
              Add To Cart
            </button>

            {message && (
              <p className="text-green-600 font-semibold mt-4">
                {message}
              </p>
            )}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}