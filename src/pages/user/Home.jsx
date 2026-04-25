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
  FaArrowRight,
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
          "http://localhost:5000/api/products"
        );

      const categoryRes =
        await axios.get(
          "http://localhost:5000/api/categories"
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
      <section className="bg-gradient-to-r from-green-50 to-white px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>

            <p className="text-green-600 font-semibold text-lg">
              100% Fresh & Organic
            </p>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-4 text-gray-800">
              Fresh Products <br />
              Delivered Fast
            </h1>

            <p className="text-gray-600 mt-5 text-lg leading-8">
              Shop vegetables, fruits, bakery items and groceries delivered directly to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link to="/products">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition shadow-lg">
                  Shop Now
                </button>
              </Link>

              <Link to="/products">
                <button className="border px-8 py-4 rounded-xl hover:bg-white transition flex items-center gap-2">
                  View Products <FaArrowRight />
                </button>
              </Link>

            </div>

          </div>

          {/* Right */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Fresh Grocery"
              className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="border rounded-2xl p-6 text-center hover:shadow-xl transition">
            <FaLeaf className="mx-auto text-3xl text-green-600" />
            <h3 className="font-bold text-xl mt-4">
              Fresh Products
            </h3>
            <p className="text-gray-500 mt-2">
              Daily selected fresh groceries.
            </p>
          </div>

          <div className="border rounded-2xl p-6 text-center hover:shadow-xl transition">
            <FaTruck className="mx-auto text-3xl text-green-600" />
            <h3 className="font-bold text-xl mt-4">
              Fast Delivery
            </h3>
            <p className="text-gray-500 mt-2">
              Fast and reliable doorstep delivery.
            </p>
          </div>

          <div className="border rounded-2xl p-6 text-center hover:shadow-xl transition">
            <FaLock className="mx-auto text-3xl text-green-600" />
            <h3 className="font-bold text-xl mt-4">
              Secure Payment
            </h3>
            <p className="text-gray-500 mt-2">
              Safe checkout every time.
            </p>
          </div>

          <div className="border rounded-2xl p-6 text-center hover:shadow-xl transition">
            <FaHeadset className="mx-auto text-3xl text-green-600" />
            <h3 className="font-bold text-xl mt-4">
              24/7 Support
            </h3>
            <p className="text-gray-500 mt-2">
              Friendly support anytime.
            </p>
          </div>

        </div>
      </section>

      {/* CATEGORY */}
      <section className="bg-gray-50 px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold text-center">
            Shop by Category
          </h2>

          <p className="text-gray-500 text-center mt-3">
            Browse our fresh collections
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">

            {categories.map((item) => (
              <CategoryCard
                key={item._id}
                name={item.name}
                image={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : ""
                 }
              />
            ))}

              

          </div>

        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

            <div>
              <h2 className="text-4xl font-bold">
                Recent Products
              </h2>

              <p className="text-gray-500 mt-2">
                Latest items added by admin
              </p>
            </div>

            <Link to="/products">
              <button className="border px-6 py-3 rounded-xl hover:bg-gray-50 transition">
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
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/300"
                  }
                />
              ))}

            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto bg-green-600 rounded-3xl text-white text-center px-6 py-16 shadow-xl">

          <h2 className="text-4xl md:text-5xl font-bold">
            Start Shopping Fresh Today
          </h2>

          <p className="mt-4 text-lg opacity-90">
            Join thousands of happy customers and enjoy fresh groceries every day.
          </p>

          <Link to="/products">
            <button className="mt-8 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition">
              Explore Products
            </button>
          </Link>

        </div>
      </section>

      <Footer />
    </>
  );
}