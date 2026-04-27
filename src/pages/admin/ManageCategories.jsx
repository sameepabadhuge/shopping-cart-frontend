import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    image: null,
  });

  /* ===============================
     Load Categories
  =============================== */
  useEffect(() => {
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

    loadCategories();
  }, []);

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

  /* ===============================
     Input Change
  =============================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setForm((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* ===============================
     Open Add Modal
  =============================== */
  const openAddModal = () => {
    setIsEdit(false);
    setEditId(null);

    setForm({
      name: "",
      image: null,
    });

    setPreview("");
    setShowModal(true);
  };

  /* ===============================
     Open Edit Modal
  =============================== */
  const openEditModal = (item) => {
    setIsEdit(true);
    setEditId(item._id);

    setForm({
      name: item.name,
      image: null,
    });

    setPreview(
      item.image
        ? `http://localhost:5000/uploads/${item.image}`
        : ""
    );

    setShowModal(true);
  };

  /* ===============================
     Submit
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);

      if (form.image) {
        data.append("image", form.image);
      }

      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/categories/${editId}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/categories",
          data
        );
      }

      await loadCategories();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     Delete
  =============================== */
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this category?"
    );

    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      await loadCategories();
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     Search Filter
  =============================== */
  const filtered = categories.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f6f8f4] px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Categories
            </h1>

            <p className="text-gray-500 mt-1">
              Manage product categories
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <FaPlus />
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl border shadow-sm p-5 sm:p-6">
          <div className="relative max-w-md">

            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-xl pl-11 pr-4 py-2.5"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border shadow-sm p-5 sm:p-6 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-5">
            All Categories ({filtered.length})
          </h2>

          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-4">Image</th>
                <th>Name</th>
                <th>Products</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">
                    {item.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    )}
                  </td>

                  <td>{item.name}</td>

                  <td>
                    {item.productCount || 0} products
                  </td>

                  <td>
                    <div className="flex justify-end gap-4">

                      <button
                        onClick={() =>
                          openEditModal(item)
                        }
                        className="text-blue-500"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  {isEdit
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <input
                  type="text"
                  name="name"
                  placeholder="Category name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />

                <label className="border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer">

                  <FaUpload className="text-2xl mb-2 text-gray-500" />

                  <span className="text-sm text-gray-500">
                    Upload Image
                  </span>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-24 h-24 rounded-xl object-cover mx-auto"
                  />
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                  {isEdit
                    ? "Update Category"
                    : "Add Category"}
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}