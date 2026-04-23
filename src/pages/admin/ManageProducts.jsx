import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaSearch,
  FaTimes,
  FaUpload,
  FaEdit,
} from "react-icons/fa";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  /* ===============================
     LOAD PRODUCTS
  =============================== */
  const loadProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     LOAD CATEGORIES
  =============================== */
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
     USE EFFECT FIXED
  =============================== */
  useEffect(() => {
    const fetchData = async () => {
      await loadProducts();
      await loadCategories();
    };

    fetchData();
  }, []);

  /* ===============================
     HANDLE INPUT CHANGE
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
     OPEN ADD MODAL
  =============================== */
  const openAddModal = () => {
    setIsEdit(false);
    setEditId(null);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    });

    setPreview("");
    setShowModal(true);
  };

  /* ===============================
     EDIT PRODUCT
  =============================== */
  const handleEdit = (item) => {
    setIsEdit(true);
    setEditId(item._id);

    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      description: item.description || "",
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
     SUBMIT FORM
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("category", form.category);
      data.append("price", form.price);
      data.append("stock", form.stock);
      data.append("description", form.description);

      if (form.image) {
        data.append("image", form.image);
      }

      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          data
        );
      }

      await loadProducts();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     DELETE PRODUCT
  =============================== */
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      await loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     SEARCH FILTER
  =============================== */
  const filteredProducts = products.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 bg-[#f6f8f4] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your catalog
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-8">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl pl-11 pr-4 py-2.5"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 overflow-x-auto">

        <h2 className="text-xl font-bold mb-5">
          All Products ({filteredProducts.length})
        </h2>

        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-4">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>Stock</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4">
                  {item.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                  )}
                </td>

                <td>{item.name}</td>
                <td>{item.category}</td>
                <td className="font-medium">
                  Rs. {item.price}
                </td>
                <td>{item.stock}</td>

                <td>
                  <div className="flex justify-end gap-4">

                    <button
                      onClick={() =>
                        handleEdit(item)
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item._id)
                      }
                      className="text-red-500 hover:text-red-700"
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-3">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl max-h-[92vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={() =>
                setShowModal(false)
              }
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-1">
              {isEdit
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p className="text-gray-500 text-sm mb-5">
              {isEdit
                ? "Update product information"
                : "Create a new product"}
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2.5"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2.5 bg-white"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat.name}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE + STOCK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="text-sm font-medium block mb-1">
                    Unit Price (Rs.)
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-2.5"
                  />
                </div>

              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Description
                </label>

                <textarea
                  rows="3"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-2.5 resize-none"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Image
                </label>

                <div className="flex items-center gap-3 flex-wrap">

                  <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden">
                    {preview && (
                      <img
                        src={preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <label className="cursor-pointer border px-4 py-2 rounded-xl flex gap-2 items-center text-sm">
                    <FaUpload />
                    Upload

                    <input
                      type="file"
                      hidden
                      name="image"
                      onChange={handleChange}
                    />
                  </label>

                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="border px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                >
                  {isEdit
                    ? "Update"
                    : "Add Product"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}