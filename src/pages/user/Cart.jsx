import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import axios from "../../utils/axiosInstance";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
} from "react-icons/fa";

export default function Cart() {
  const navigate =
    useNavigate();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // old support
  if (
    user &&
    !user._id &&
    user.id
  ) {
    user._id = user.id;
  }

  const loadCart =
    useCallback(async () => {
      try {
        if (!user?._id) return;

        const res =
          await axios.get(
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
    }, [user]);

  useEffect(() => {
    if (!user?._id) {
      navigate("/login", {
        state: {
          from: {
            pathname:
              "/cart",
          },
        },
      });

      return;
    }

    loadCart();

    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };
  }, [
    user,
    navigate,
    loadCart,
  ]);

  // Increase
  const increaseQty =
    async (
      productId,
      qty
    ) => {
      try {
        await axios.put(
          "/cart/update",
          {
            userId:
              user._id,
            productId,
            qty:
              qty + 1,
          }
        );

        loadCart();

      } catch (error) {
        console.log(error);
      }
    };

  // Decrease
  const decreaseQty =
    async (
      productId,
      qty
    ) => {
      if (qty <= 1) return;

      try {
        await axios.put(
          "/cart/update",
          {
            userId:
              user._id,
            productId,
            qty:
              qty - 1,
          }
        );

        loadCart();

      } catch (error) {
        console.log(error);
      }
    };

  // Remove
  const removeItem =
    async (productId) => {
      try {
        await axios.delete(
          "/cart/remove",
          {
            data: {
              userId:
                user._id,
              productId,
            },
          }
        );

        loadCart();

        window.dispatchEvent(
          new Event(
            "cartUpdated"
          )
        );

      } catch (error) {
        console.log(error);
      }
    };

  const total =
    cartItems.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.qty,
      0
    );

  return (
    <>
      <Navbar />

      <section className="px-4 md:px-6 py-14 min-h-screen">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-10">
            Shopping Cart
          </h1>

          {loading ? (
            <p className="text-center">
              Loading...
            </p>

          ) : cartItems.length ===
            0 ? (

            <div className="text-center py-20">

              <FaShoppingBag className="mx-auto text-6xl text-gray-300 mb-5" />

              <h2 className="text-2xl font-bold">
                Cart is Empty
              </h2>

              <Link
                to="/products"
                className="inline-block mt-6 bg-green-600 text-white px-8 py-3 rounded-xl"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            <div className="grid lg:grid-cols-3 gap-10">

              {/* Items */}
              <div className="lg:col-span-2 space-y-5">

                {cartItems.map(
                  (item) => (
                    <div
                      key={
                        item.productId
                      }
                      className="border rounded-2xl p-4 flex gap-5 items-center"
                    >

                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={
                          item.name
                        }
                        className="w-24 h-24 rounded-xl object-cover"
                      />

                      <div className="flex-1">

                        <h2 className="text-xl font-bold">
                          {
                            item.name
                          }
                        </h2>

                        <p className="text-green-600">
                          Rs{" "}
                          {
                            item.price
                          }
                        </p>

                        <div className="flex gap-3 mt-3 items-center">

                          <button
                            onClick={() =>
                              decreaseQty(
                                item.productId,
                                item.qty
                              )
                            }
                          >
                            <FaMinus />
                          </button>

                          <span>
                            {
                              item.qty
                            }
                          </span>

                          <button
                            onClick={() =>
                              increaseQty(
                                item.productId,
                                item.qty
                              )
                            }
                          >
                            <FaPlus />
                          </button>

                        </div>

                      </div>

                      <div>

                        <p className="font-bold">
                          Rs{" "}
                          {item.price *
                            item.qty}
                        </p>

                        <button
                          onClick={() =>
                            removeItem(
                              item.productId
                            )
                          }
                          className="text-red-500 mt-3"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* Summary */}
              <div className="border rounded-2xl p-6 h-fit">

                <h2 className="text-2xl font-bold mb-5">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span>Total</span>

                  <span>
                    Rs {total}
                  </span>
                </div>

                <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
                  Checkout
                </button>

              </div>

            </div>
          )}

        </div>

      </section>

      <Footer />
    </>
  );
}