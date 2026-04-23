import { useEffect, useState } from "react";
import axios from "axios";

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
  const [products, setProducts] = useState([]);

  const categories = [
    "Vegetables",
    "Fruits",
    "Bakery",
    "Beverages",
    "Snacks",
    "Dairy",
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data.slice(0, 4)); // latest 4
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      {/* Keep your Hero section same */}

      {/* Categories */}
      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
            {categories.map((item, index) => (
              <CategoryCard key={index} name={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">
              Featured Products
            </h2>

            <Link to="/products">
              <button className="border px-5 py-2 rounded-xl">
                View All
              </button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                category={item.category}
                price={item.price}
                image={`http://localhost:5000/uploads/${item.image}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}