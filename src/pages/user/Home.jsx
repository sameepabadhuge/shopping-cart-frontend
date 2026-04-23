import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

import {
  FaTruck,
  FaLock,
  FaHeadset,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";

export default function Home() {
  const categories = [
    "Vegetables",
    "Fruits",
    "Bakery",
    "Beverages",
    "Snacks",
    "Dairy",
  ];

  const products = [
    {
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 450,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
    },
    {
      name: "Red Apples",
      category: "Fruits",
      price: 890,
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    },
    {
      name: "Chocolate Cake",
      category: "Bakery",
      price: 1500,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    },
    {
      name: "Orange Juice",
      category: "Beverages",
      price: 650,
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-green-50 px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <p className="text-green-600 font-semibold mb-3">
              100% Fresh & Organic
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800">
              Fresh Products <br />
              Delivered Fast
            </h1>

            <p className="text-gray-600 mt-5 text-lg">
              Shop vegetables, fruits, bakery items and groceries delivered to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/products">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
                  Shop Now
                </button>
              </Link>

              <Link to="/products">
                <button className="border px-6 py-3 rounded-xl hover:bg-white transition flex items-center gap-2">
                  View Products <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow text-center">
              <FaLeaf className="text-green-600 text-3xl mx-auto mb-3" />
              <p className="font-semibold">Fresh</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow text-center">
              <FaTruck className="text-green-600 text-3xl mx-auto mb-3" />
              <p className="font-semibold">Fast Delivery</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow text-center">
              <FaLock className="text-green-600 text-3xl mx-auto mb-3" />
              <p className="font-semibold">Secure</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow text-center">
              <FaHeadset className="text-green-600 text-3xl mx-auto mb-3" />
              <p className="font-semibold">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Shop by Category
          </h2>

          <p className="text-gray-500 text-center mt-3">
            Browse our fresh collections
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
            {categories.map((item, index) => (
              <CategoryCard key={index} name={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-gray-50 px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured Products
              </h2>

              <p className="text-gray-500 mt-2">
                Fresh handpicked products for you
              </p>
            </div>

            <Link to="/products">
              <button className="border px-5 py-2 rounded-xl hover:bg-white transition">
                View All
              </button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {products.map((item, index) => (
              <ProductCard
                key={index}
                name={item.name}
                category={item.category}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto bg-green-600 rounded-3xl text-white text-center px-6 py-14">
          <h2 className="text-3xl md:text-5xl font-bold">
            Start Shopping Fresh Today
          </h2>

          <p className="mt-4 text-lg opacity-90">
            Join thousands of happy customers.
          </p>

          <Link to="/products">
            <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Explore Products
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}