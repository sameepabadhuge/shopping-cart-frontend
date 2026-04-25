import { useEffect, useState } from "react";
import axios from "axios";

import {
  useLocation, 
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const location =
    useLocation(); 

  
  // read category from URL
  // example /products?category=Juice
  const params =
    new URLSearchParams(
      location.search
    );

  const selectedCategory =
    params.get("category");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        setProducts(
          res.data
        );

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  
  // now filter by search + category
  const filteredProducts =
    products.filter(
      (item) => {
        const matchSearch =
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchCategory =
          selectedCategory
            ? item.category ===
              selectedCategory
            : true;

        return (
          matchSearch &&
          matchCategory
        );
      }
    );

  return (
    <>
      <Navbar />

      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center">

            {/* dynamic heading */}
            {selectedCategory
              ? `${selectedCategory} Products`
              : "All Products"}

          </h1>

          <p className="text-gray-500 text-center mt-3">
            Browse our fresh and quality products
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />
          </div>

          {/* Loading */}
          {loading ? (
            <p className="text-center mt-10">
              Loading...
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

              {filteredProducts.length >
              0 ? (

                filteredProducts.map(
                  (item) => (
                    <ProductCard
                      key={
                        item._id
                      }
                      id={
                        item._id
                      }
                      name={
                        item.name
                      }
                      category={
                        item.category
                      }
                      price={
                        item.price
                      }
                      image={`http://localhost:5000/uploads/${item.image}`}
                    />
                  )
                )

              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No products found
                </p>
              )}

            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}