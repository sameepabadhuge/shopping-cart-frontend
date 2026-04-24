import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {
  FaCheckCircle,
} from "react-icons/fa";

export default function OrderSuccess() {
  return (
    <>
      <Navbar />

      <section className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-sm border p-10 max-w-2xl w-full text-center">

          <div className="w-28 h-28 mx-auto rounded-full bg-green-100 flex items-center justify-center">

            <FaCheckCircle className="text-green-600 text-6xl" />

          </div>

          <h1 className="text-4xl font-bold mt-8">
            Order Confirmed!
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Thank you for your order.
            We'll deliver it to you soon!
          </p>

          <Link to="/products">
            <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold">
              Continue Shopping
            </button>
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
}