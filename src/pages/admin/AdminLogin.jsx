import { Link } from "react-router-dom";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
            A
          </div>

          <h1 className="text-2xl font-bold mt-4">
            Admin Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to manage FreshCart
          </p>
        </div>

        <form className="mt-6 space-y-4">

          <input
            type="email"
            placeholder="admin@freshcart.com"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90">
            Sign In to Admin Panel
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          <Link to="/login" className="text-gray-600 hover:text-black">
            ← Back to User Login
          </Link>
        </p>

      </div>
    </div>
  );
}