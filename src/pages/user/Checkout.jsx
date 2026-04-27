import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../utils/axiosInstance";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      return;
    }

    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await axios.get(
        `/cart/${user._id}`
      );

      setCartItems(
        res.data.items || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Phone numbers only
    if (name === "phone") {
      value = value.replace(
        /\D/g,
        ""
      );
    }

    // Postal code only numbers
    if (
      name ===
      "postalCode"
    ) {
      value = value
        .replace(/\D/g, "")
        .slice(0, 5);
    }

    // City letters only
    if (name === "city") {
      value = value.replace(
        /[^a-zA-Z\s]/g,
        ""
      );
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm =
    () => {
      const newErrors = {};

      if (
        formData.fullName
          .trim()
          .length < 3
      ) {
        newErrors.fullName =
          "Enter valid full name";
      }

      if (
        !/^\d{10}$/.test(
          formData.phone
        )
      ) {
        newErrors.phone =
          "Phone must be 10 digits";
      }

      if (
        formData.address
          .trim()
          .length < 8
      ) {
        newErrors.address =
          "Enter full address";
      }

      if (
        formData.city
          .trim()
          .length < 2
      ) {
        newErrors.city =
          "Enter valid city";
      }

      if (
        !/^\d{5}$/.test(
          formData
            .postalCode
        )
      ) {
        newErrors.postalCode =
          "Postal code must be 5 digits";
      }

      setErrors(newErrors);

      return (
        Object.keys(
          newErrors
        ).length === 0
      );
    };

  const subtotal =
    cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.qty,
      0
    );

  const shipping =
    subtotal > 5000
      ? 0
      : 200;

  const total =
    subtotal + shipping;

  const handleOrder =
    async () => {
      if (
        !validateForm()
      )
        return;

      try {
        setPlacingOrder(true);

        await axios.post(
          "/orders/create",
          {
            userId:
              user._id,
            customerName:
              formData.fullName,
            phone:
              formData.phone,
            address:
              formData.address,
            city:
              formData.city,
            postalCode:
              formData.postalCode,
            items:
              cartItems,
            subtotal,
            shipping,
            total,
          }
        );

        await axios.delete(
          "/cart/clear",
          {
            data: {
              userId:
                user._id,
            },
          }
        );

        window.dispatchEvent(
          new Event(
            "cartUpdated"
          )
        );

        navigate(
          "/order-success"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Failed to place order"
        );
      } finally {
        setPlacingOrder(false);
      }
    };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 min-h-screen px-4 md:px-6 py-10">
        <div className="max-w-7xl mx-auto">

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600"
          >
            <FaArrowLeft />
            Back to Cart
          </Link>

          <h1 className="text-4xl font-bold mt-6">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete your order details
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* LEFT */}
            <div className="bg-white rounded-3xl shadow-sm border p-6">

              <h2 className="text-2xl font-bold mb-6">
                Delivery Details
              </h2>

              <div className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="font-medium block mb-2">
                    Full Name
                  </label>

                  <div className="relative">
                    <FaUser className="absolute top-4 left-4 text-gray-400" />

                    <input
                      type="text"
                      name="fullName"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="W.B.S.Sameepa"
                      className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>

                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        errors.fullName
                      }
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="font-medium block mb-2">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute top-4 left-4 text-gray-400" />

                    <input
                      type="text"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="0702256830"
                      maxLength="10"
                      className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-600"
                    />
                  </div>

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        errors.phone
                      }
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="font-medium block mb-2">
                    Delivery Address
                  </label>

                  <div className="relative">
                    <FaMapMarkerAlt className="absolute top-4 left-4 text-gray-400" />

                    <textarea
                      rows="4"
                      name="address"
                      value={
                        formData.address
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter full address"
                      className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:border-green-600"
                    ></textarea>
                  </div>

                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {
                        errors.address
                      }
                    </p>
                  )}
                </div>

                {/* City + Postal */}
                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="font-medium block mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Colombo"
                      className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
                    />

                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.city
                        }
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium block mb-2">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={
                        formData.postalCode
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="10100"
                      maxLength="5"
                      className="w-full border rounded-xl px-4 py-3 outline-none focus:border-green-600"
                    />

                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.postalCode
                        }
                      </p>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="bg-white rounded-3xl shadow-sm border p-6 h-fit">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {loading ? (
                <p>
                  Loading...
                </p>
              ) : (
                <>
                  <div className="space-y-5">

                    {cartItems.map(
                      (item) => (
                        <div
                          key={
                            item.productId
                          }
                          className="flex gap-4 items-center"
                        >
                          <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={
                              item.name
                            }
                            className="w-16 h-16 rounded-xl object-cover"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {
                                item.name
                              }
                            </h3>

                            <p className="text-sm text-gray-500">
                              Qty: {item.qty}
                            </p>
                          </div>

                          <p className="font-semibold">
                            Rs{" "}
                            {item.price *
                              item.qty}
                          </p>
                        </div>
                      )
                    )}

                  </div>

                  <hr className="my-6" />

                  <div className="space-y-3 text-gray-600">

                    <div className="flex justify-between">
                      <span>
                        Subtotal
                      </span>

                      <span>
                        Rs {subtotal}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        Shipping
                      </span>

                      <span className="text-green-600">
                        {shipping === 0
                          ? "Free"
                          : `Rs ${shipping}`}
                      </span>
                    </div>

                  </div>

                  <hr className="my-6" />

                  <div className="flex justify-between text-2xl font-bold">
                    <span>
                      Total
                    </span>

                    <span className="text-green-600">
                      Rs {total}
                    </span>
                  </div>

                  <button
                    onClick={
                      handleOrder
                    }
                    disabled={
                      placingOrder
                    }
                    className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
                  >
                    {placingOrder
                      ? "Processing..."
                      : "Confirm Order"}
                  </button>

                  <p className="text-xs text-center text-gray-400 mt-4">
                    By placing your
                    order, you agree
                    to our Terms of
                    Service
                  </p>
                </>
              )}

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}