import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "../../utils/axiosInstance";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [adding, setAdding] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct =
    async () => {
      try {
        setLoading(true);

        const res =
          await axios.get(
            `/products/${id}`
          );

        setProduct(
          res.data
        );

      } catch (error) {
        console.log(error);
        setProduct(null);

      } finally {
        setLoading(false);
      }
    };

  const addToCart =
    async () => {
      if (!user || !user._id) {
        localStorage.setItem(
          "redirectAfterLogin",
          `/products/${id}`
        );

        navigate("/login");
        return;
      }

      try {
        setAdding(true);
        setMessage("");

        await axios.post(
          "/cart/add",
          {
            userId:
              user._id,

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

        navigate("/cart");

      } catch (error) {
        console.log(error);

        setMessage(
          "Something went wrong"
        );

      } finally {
        setAdding(false);
      }
    };

  // Loading
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

  // Not found
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

          {/* Image */}
          <div>
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
            />
          </div>

          {/* Info */}
          <div>

            <p className="text-green-600 font-semibold text-lg">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              {product.name}
            </h1>

            {/* Stars */}
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

            {/* Price */}
            <p className="text-green-600 text-4xl font-bold mt-6">
              Rs {product.price}
            </p>

            {/* Description */}
            <p className="text-gray-600 mt-6 leading-8 text-lg">
              {product.description ||
                "No description available."}
            </p>

            {/* Stock */}
            <p className="mt-5 text-base text-gray-500">
              Stock Available:{" "}
              {product.stock}
            </p>

            {/* Button */}
            <button
              onClick={
                addToCart
              }
              disabled={adding}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition"
            >
              <FaShoppingCart />

              {adding
                ? "Adding..."
                : "Add To Cart"}
            </button>

            {/* Error */}
            {message && (
              <p className="text-red-500 font-semibold mt-4">
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