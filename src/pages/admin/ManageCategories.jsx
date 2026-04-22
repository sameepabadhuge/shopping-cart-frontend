import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  // Load Categories
  const loadCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Add / Update Category
  const submitHandler = async () => {
    try {
      if (!name) return alert("Enter category name");

      if (editId) {
        await axios.put(
          `http://localhost:5000/api/categories/${editId}`,
          { name, image }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/categories",
          { name, image }
        );
      }

      setName("");
      setImage("");
      setEditId(null);

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Category
  const editHandler = (item) => {
    setName(item.name);
    setImage(item.image);
    setEditId(item._id);
  };

  // Delete Category
  const deleteHandler = async (id) => {
    try {
      if (!window.confirm("Delete this category?")) return;

      await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  // Search Filter
  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#f6f8f5] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Categories
          </h1>
          <p className="text-gray-500">
            Manage product categories
          </p>
        </div>

        <button
          onClick={submitHandler}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <FaPlus />
          {editId
            ? "Update Category"
            : "Add Category"}
        </button>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl mt-8 shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="border p-3 rounded-xl"
          />

          <div className="relative">
            <FaSearch className="absolute top-4 left-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border p-3 pl-10 rounded-xl w-full"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl mt-8 shadow">
        <h2 className="text-2xl font-bold mb-6">
          All Categories ({filtered.length})
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3">Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-b"
                >
                  <td className="py-4">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/50"
                      }
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  <td>{item.name}</td>

                  <td className="flex gap-4 py-4">
                    <button
                      onClick={() =>
                        editHandler(item)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        deleteHandler(item._id)
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}