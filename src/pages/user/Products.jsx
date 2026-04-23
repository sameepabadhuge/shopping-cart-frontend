import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

export default function Products() {
  const allProducts = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 450,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
    },
    {
      id: 2,
      name: "Red Apples",
      category: "Fruits",
      price: 890,
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      category: "Bakery",
      price: 1500,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    },
    {
      id: 4,
      name: "Orange Juice",
      category: "Beverages",
      price: 650,
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8",
    },
    {
      id: 5,
      name: "Fresh Carrots",
      category: "Vegetables",
      price: 350,
      image: "https://images.unsplash.com/photo-1447175008436-054170c2e979",
    },
    {
      id: 6,
      name: "Bananas",
      category: "Fruits",
      price: 300,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
    },
    {
      id: 7,
      name: "Milk Bottle",
      category: "Dairy",
      price: 420,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
    },
    {
      id: 8,
      name: "Cookies Pack",
      category: "Snacks",
      price: 520,
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredProducts = allProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            All Products
          </h1>

          <p className="text-gray-500 text-center mt-3">
            Browse our fresh and quality products
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-8">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  image={item.image}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}