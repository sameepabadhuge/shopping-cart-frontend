import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-green-50 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white shadow rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-green-600">
            Welcome to FreshCart
          </h1>

          <p className="text-gray-600 mt-2">
            Hello {user?.user?.name || "User"} 👋
          </p>

          <p className="mt-4 text-gray-500">
            Your shopping experience starts here.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">Products</h2>
            <p className="text-gray-500 mt-2">
              Browse fresh items and groceries.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">Cart</h2>
            <p className="text-gray-500 mt-2">
              Add products and manage cart.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">Profile</h2>
            <p className="text-gray-500 mt-2">
              Manage your account details.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}