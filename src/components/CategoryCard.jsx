import { FaLeaf } from "react-icons/fa";

export default function CategoryCard({
  name,
  image,
}) {
  return (
    <div className="bg-white border rounded-2xl p-6 text-center hover:shadow-lg transition">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded-full mx-auto"
        />
      ) : (
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <FaLeaf className="text-green-600 text-2xl" />
        </div>
      )}

      <h3 className="mt-4 font-bold text-lg">
        {name}
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        Fresh Products
      </p>
    </div>
  );
}