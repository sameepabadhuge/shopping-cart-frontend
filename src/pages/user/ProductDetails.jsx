import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaShoppingCart, FaStar } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();

  // Dummy product for now
  const product = {
    id,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
    description:
      "Fresh organic tomatoes directly from farms. Rich in vitamins and perfect for daily cooking.",
    stock: 25,
  };

  return (
    <>
      <Navbar />

      <section className="px-4 md:px-6 py-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-green-600 font-semibold">
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
              <span className="text-gray-500 ml-2">(5 Reviews)</span>
            </div>

            <p className="text-green-600 text-4xl font-bold mt-6">
              Rs {product.price}
            </p>

            <p className="text-gray-600 mt-6 leading-7">
              {product.description}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Stock Available: {product.stock}
            </p>

            <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition">
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