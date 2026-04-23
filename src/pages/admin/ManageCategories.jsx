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
  const [categories, setCategories] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [isEdit, setIsEdit] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] =
    useState({
      name: "",
      image: null,
    });

  /* =========================
     Load Categories
  ========================= */
  const loadCategories =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/categories"
          );

        setCategories(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  useEffect(() => {
    const fetchData =
      async () => {
        await loadCategories();
      };

    fetchData();
  }, []);

  /* =========================
     Input Change
  ========================= */
  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      files,
    } = e.target;

    if (name === "image") {
      const file =
        files[0];

      setForm({
        ...form,
        image: file,
      });

      if (file) {
        setPreview(
          URL.createObjectURL(
            file
          )
        );
      }
    } else {
      setForm({
        ...form,
        [name]:
          value,
      });
    }
  };

  /* =========================
     Add Popup
  ========================= */
  const openAddModal =
    () => {
      setIsEdit(
        false
      );

      setEditId(
        null
      );

      setForm({
        name: "",
        image: null,
      });

      setPreview(
        ""
      );

      setShowModal(
        true
      );
    };

  /* =========================
     Edit Popup
  ========================= */
  const openEditModal =
    (item) => {
      setIsEdit(
        true
      );

      setEditId(
        item._id
      );

      setForm({
        name: item.name,
        image: null,
      });

      setPreview(
        item.image
          ? `http://localhost:5000/uploads/${item.image}`
          : ""
      );

      setShowModal(
        true
      );
    };

  /* =========================
     Submit
  ========================= */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const data =
          new FormData();

        data.append(
          "name",
          form.name
        );

        if (
          form.image
        ) {
          data.append(
            "image",
            form.image
          );
        }

        if (
          isEdit
        ) {
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

        loadCategories();

        setShowModal(
          false
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  /* =========================
     Delete
  ========================= */
  const deleteCategory =
    async (id) => {
      const ok =
        window.confirm(
          "Delete this category?"
        );

      if (!ok)
        return;

      try {
        await axios.delete(
          `http://localhost:5000/api/categories/${id}`
        );

        loadCategories();
      } catch (error) {
        console.log(
          error
        );
      }
    };

  /* =========================
     Search
  ========================= */
  const filtered =
    categories.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="p-4 sm:p-8 bg-[#f6f8f4] min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 mt-1">
            Manage product categories
          </p>
        </div>

        <button
          onClick={
            openAddModal
          }
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-8">

        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

          <input
            type="text"
            placeholder="Search categories..."
            value={
              search
            }
            onChange={(
              e
            ) =>
              setSearch(
                e.target
                  .value
              )
            }
            className="w-full border rounded-xl pl-11 pr-4 py-2.5"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 overflow-x-auto">

        <h2 className="text-xl font-bold mb-5">
          All Categories (
          {
            filtered.length
          }
          )
        </h2>

        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-4">
                Image
              </th>
              <th>
                Name
              </th>
              <th>
                Products
              </th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(
              (
                item
              ) => (
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
                        alt=""
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    )}
                  </td>

                  <td>
                    {
                      item.name
                    }
                  </td>

                  <td>
                    {item.productCount ||
                      0}{" "}
                    products
                  </td>

                  <td>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() =>
                          openEditModal(
                            item
                          )
                        }
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          deleteCategory(
                            item._id
                          )
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}

            {filtered.length ===
              0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-400"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-3">

          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">

            <button
              onClick={() =>
                setShowModal(
                  false
                )
              }
              className="absolute top-4 right-4 text-gray-500"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-bold mb-1">
              {isEdit
                ? "Edit Category"
                : "Add New Category"}
            </h2>

            <p className="text-gray-500 text-sm mb-5">
              {isEdit
                ? "Update category details"
                : "Fill in details for new category"}
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full border rounded-xl px-4 py-2.5"
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Category Image
                </label>

                <div className="flex items-center gap-3 flex-wrap">

                  <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                    {preview && (
                      <img
                        src={
                          preview
                        }
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
                      onChange={
                        handleChange
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="border px-5 py-2 rounded-xl"
                >
                  Cancel
                </button>

                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
                  {isEdit
                    ? "Update Category"
                    : "Add Category"}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}