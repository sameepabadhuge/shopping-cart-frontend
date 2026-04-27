import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";

import {
  FaTruck,
  FaLock,
  FaHeadset,
  FaLeaf,
  FaBoxOpen,
} from "react-icons/fa";

export default function Home() {
  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productRes =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        );

      const categoryRes =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );

      setProducts(
        productRes.data.slice(0, 10)
      );

      setCategories(
        categoryRes.data
      );

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        className="relative bg-cover bg-center bg-no-repeat px-4 md:px-6 py-24"
        style={{
          backgroundImage:
            "url('/images/5.avif')",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto">

          <div className="max-w-2xl text-white">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaLeaf className="text-green-400" />
              Fresh Daily Groceries
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Fresh Groceries
              <br />
              Delivered
              <span className="text-green-400">
                {" "}Fast
              </span>
            </h1>

            {/* Text */}
            <p className="text-lg text-gray-200 mt-5 leading-8 max-w-xl">
              Shop vegetables, fruits and essentials with quick delivery and trusted freshness every day.
            </p>

            {/* Button */}
            <div className="mt-8">
              <Link to="/products">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition">
                  Shop Now
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-green-400">
                  5k+
                </h3>

                <p className="text-sm text-gray-200 mt-1">
                  Orders
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-green-400">
                  99%
                </h3>

                <p className="text-sm text-gray-200 mt-1">
                  Fresh Rate
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-green-400">
                  24/7
                </h3>

                <p className="text-sm text-gray-200 mt-1">
                  Support
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border rounded-2xl p-6 bg-white hover:shadow-xl transition">
            <FaLeaf className="text-3xl text-green-600" />

            <h3 className="font-bold text-xl mt-4">
              Fresh Products
            </h3>

            <p className="text-gray-500 mt-2">
              Daily selected quality groceries.
            </p>
          </div>

          <div className="border rounded-2xl p-6 bg-white hover:shadow-xl transition">
            <FaTruck className="text-3xl text-green-600" />

            <h3 className="font-bold text-xl mt-4">
              Fast Delivery
            </h3>

            <p className="text-gray-500 mt-2">
              Quick doorstep delivery.
            </p>
          </div>

          <div className="border rounded-2xl p-6 bg-white hover:shadow-xl transition">
            <FaLock className="text-3xl text-green-600" />

            <h3 className="font-bold text-xl mt-4">
              Safe Payment
            </h3>

            <p className="text-gray-500 mt-2">
              Protected checkout process.
            </p>
          </div>

          <div className="border rounded-2xl p-6 bg-white hover:shadow-xl transition">
            <FaHeadset className="text-3xl text-green-600" />

            <h3 className="font-bold text-xl mt-4">
              Support
            </h3>

            <p className="text-gray-500 mt-2">
              Friendly customer help.
            </p>
          </div>

        </div>
      </section>

      {/* CATEGORY */}
      <section className="bg-gray-50 px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Shop by Category
            </h2>

            <p className="text-gray-500 mt-3">
              Browse products by category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">

            {categories.map((item) => (
              <CategoryCard
                key={item._id}
                name={item.name}
                image={
                  item.image
                    ? `${import.meta.env.VITE_API_URL.replace('/api','')}/uploads/${item.image}`
                    : ""
                }
              />
            ))}

          </div>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

            <div>
              <h2 className="text-4xl font-bold">
                Recent Products
              </h2>

              <p className="text-gray-500 mt-2">
                Latest items added
              </p>
            </div>

            <Link to="/products">
              <button className="border hover:bg-gray-50 px-6 py-3 rounded-xl transition font-medium">
                View All
              </button>
            </Link>

          </div>

          {loading ? (
            <p className="text-center mt-10">
              Loading...
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">

              {products.map((item) => (
                <ProductCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={
                    item.image
                      ? `${import.meta.env.VITE_API_URL.replace('/api','')}/uploads/${item.image}`
                      : "https://via.placeholder.com/300"
                  }
                />
              ))}

            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-7xl mx-auto bg-green-600 rounded-3xl px-6 md:px-12 py-14 text-white shadow-xl">

          <div className="grid md:grid-cols-2 gap-8 items-center">

            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Start Shopping Today
              </h2>

              <p className="mt-4 text-white/90 text-lg">
                Fresh groceries delivered quickly.
              </p>
            </div>

            <div className="flex md:justify-end">
              <Link to="/products">
                <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition">
                  <FaBoxOpen />
                  Explore Products
                </button>
              </Link>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}