import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
} from "react-icons/fa";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // Fetch Products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        form
      );

      setForm({
        name: "",
        category: "",
        price: "",
        stock: "",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // Filter
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
    <div className="p-8 bg-[#f6f8f4] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Products
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your product catalog
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* Add Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6 mb-6 grid md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border rounded-xl px-4 py-3"
          required
        />
      </form>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-xl pl-12 pr-4 py-3"
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6">
          All Products (
          {filteredProducts.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="pb-4">Image</th>
                <th className="pb-4">Name</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4 text-right">
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
                    <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                  </td>

                  <td className="py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="py-4">
                    {item.category}
                  </td>

                  <td className="py-4">
                    ${item.price}
                  </td>

                  <td className="py-4">
                    {item.stock}
                  </td>

                  <td className="py-4">
                    <div className="flex justify-end gap-4">
                      <button className="text-gray-700 hover:text-black">
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

              {filteredProducts.length ===
                0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-400"
                  >
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}