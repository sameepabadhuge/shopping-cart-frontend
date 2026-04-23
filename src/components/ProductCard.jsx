import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";

export default function ProductCard({
  id = 1,
  name = "Fresh Tomatoes",
  category = "Vegetables",
  price = 450,
  image = "https://via.placeholder.com/300x220",
}) {
  return (
    <div className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-xl transition">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-44 object-cover rounded-xl"
        />

        <div className="mt-4">
          <p className="text-sm text-gray-500">{category}</p>

          <h3 className="font-bold text-lg mt-1">{name}</h3>
        </div>
      </Link>

      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
      </div>

      <p className="text-green-600 text-2xl font-bold mt-3">
        Rs {price}
      </p>

      <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl flex items-center justify-center gap-2">
        <FaShoppingCart />
        Add To Cart
      </button>
    </div>
  );
}