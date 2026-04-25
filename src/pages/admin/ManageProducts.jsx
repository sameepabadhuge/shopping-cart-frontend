import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaEdit,
  FaTimes,
  FaUpload,
  FaFilter,
} from "react-icons/fa";

export default function ManageProducts() {
  const API = "http://localhost:5000/api";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [isEdit, setIsEdit] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  /* ===============================
     Initial Load
  =============================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] =
          await Promise.all([
            axios.get(`${API}/products`),
            axios.get(`${API}/categories`),
          ]);

        setProducts(productRes.data || []);
        setCategories(
          categoryRes.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  /* ===============================
     Reload Products
  =============================== */
  const loadProducts = async () => {
    try {
      const res = await axios.get(
        `${API}/products`
      );

      setProducts(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     Input Change
  =============================== */
  const handleChange = (e) => {
    const { name, value, files } =
      e.target;

    if (name === "image") {
      const file = files?.[0] || null;

      setForm((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        setPreview(
          URL.createObjectURL(file)
        );
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
     Open Edit Modal
  =============================== */
  const openEditModal = (item) => {
    setIsEdit(true);
    setEditId(item._id);

    setForm({
      name: item.name || "",
      category:
        item.category || "",
      price: item.price || "",
      stock: item.stock || "",
      description:
        item.description || "",
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
      data.append(
        "category",
        form.category
      );
      data.append("price", form.price);
      data.append("stock", form.stock);
      data.append(
        "description",
        form.description
      );

      if (form.image) {
        data.append(
          "image",
          form.image
        );
      }

      if (isEdit) {
        await axios.put(
          `${API}/products/${editId}`,
          data
        );
      } else {
        await axios.post(
          `${API}/products`,
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
     Delete
  =============================== */
  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Delete this product?"
    );

    if (!ok) return;

    try {
      await axios.delete(
        `${API}/products/${id}`
      );

      await loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  /* ===============================
     Filtered Products
  =============================== */
  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (item) => {
          const text =
            `${item.name} ${item.category}`.toLowerCase();

          const matchSearch =
            text.includes(
              search.toLowerCase()
            );

          const matchCategory =
            filterCategory === ""
              ? true
              : item.category ===
                filterCategory;

          return (
            matchSearch &&
            matchCategory
          );
        }
      );
    }, [
      products,
      search,
      filterCategory,
    ]);

  return (
    <div className="min-h-screen bg-[#f6f8f4] px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

        {/* Search + Filter */}
        <div className="bg-white rounded-3xl border shadow-sm p-5 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-11 pr-4 py-3"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-4 top-4 text-gray-400" />

            <select
              value={
                filterCategory
              }
              onChange={(e) =>
                setFilterCategory(
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-11 pr-4 py-3 bg-white"
            >
              <option value="">
                All Categories
              </option>

              {categories.map(
                (cat) => (
                  <option
                    key={cat._id}
                    value={cat.name}
                  >
                    {cat.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border shadow-sm p-5 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-5">
            All Products (
            {
              filteredProducts.length
            }
            )
          </h2>

          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="pb-4">
                  Image
                </th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length >
              0 ? (
                filteredProducts.map(
                  (item) => (
                    <tr
                      key={
                        item._id
                      }
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-4">
                        {item.image ? (
                          <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={
                              item.name
                            }
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100"></div>
                        )}
                      </td>

                      <td>
                        {item.name}
                      </td>

                      <td>
                        {
                          item.category
                        }
                      </td>

                      <td>
                        Rs{" "}
                        {
                          item.price
                        }
                      </td>

                      <td>
                        {
                          item.stock
                        }
                      </td>

                      <td>
                        <div className="flex justify-end gap-4">

                          <button
                            onClick={() =>
                              openEditModal(
                                item
                              )
                            }
                            className="text-blue-500"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                            className="text-red-500"
                          >
                            <FaTrash />
                          </button>

                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-gray-400"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

            <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-xl max-h-[95vh] overflow-y-auto">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">
                  {isEdit
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <button
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                >
                  <FaTimes />
                </button>

              </div>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-4"
              >

                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full border rounded-xl px-4 py-3"
                />

                <select
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (cat) => (
                      <option
                        key={
                          cat._id
                        }
                        value={
                          cat.name
                        }
                      >
                        {
                          cat.name
                        }
                      </option>
                    )
                  )}
                </select>

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={
                      form.price
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={
                      form.stock
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full border rounded-xl px-4 py-3"
                  />

                </div>

                <textarea
                  name="description"
                  placeholder="Description"
                  rows="4"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
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
                    onChange={
                      handleChange
                    }
                    className="hidden"
                  />
                </label>

                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-28 h-28 rounded-xl object-cover mx-auto"
                  />
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                >
                  {isEdit
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}