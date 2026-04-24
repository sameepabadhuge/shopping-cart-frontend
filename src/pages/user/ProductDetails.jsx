import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaShoppingCart, FaStar } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
              {product.description || "No description available."}
            </p>

            <p className="mt-5 text-base text-gray-500">
              Stock Available: {product.stock}
            </p>

            <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center gap-3 transition">
              <FaShoppingCart />
              Add To Cart
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}