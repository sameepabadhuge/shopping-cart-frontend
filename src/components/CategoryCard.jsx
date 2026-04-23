import { FaLeaf } from "react-icons/fa";

export default function CategoryCard({ name }) {
  return (
    <div className="bg-white border rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 cursor-pointer">
      {/* Icon */}
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
        <FaLeaf />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-gray-800 text-base md:text-lg">
        {name}
      </h3>

      {/* Sub text */}
      <p className="text-sm text-gray-500 mt-1">
        Fresh Products
      </p>
    </div>
  );
}