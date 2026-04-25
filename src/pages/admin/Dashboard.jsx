import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/admin/StatCard";

import {
  FaBoxOpen,
  FaTags,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,
    inventoryValue: 0,
    recentProducts: [],
  });

  const [loading, setLoading] = useState(true);

  /* ===============================
     Format Price
  =============================== */
  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString();
  };

  /* ===============================
     Load Dashboard Data
  =============================== */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard"
        );

        setStats(res.data);
      } catch (error) {
        console.log("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const recentItems =
    stats?.recentProducts?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-[#f6f8f4] px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base lg:text-lg">
            Welcome to FreshCart Admin Panel
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-3xl shadow-sm border p-8 text-center text-gray-500 text-lg">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                subtitle="Products in catalog"
                icon={<FaBoxOpen />}
                bg="bg-green-100"
                color="text-green-600"
              />

              <StatCard
                title="Total Categories"
                value={stats.totalCategories}
                subtitle="Product categories"
                icon={<FaTags />}
                bg="bg-yellow-100"
                color="text-yellow-600"
              />

              <StatCard
                title="Total Stock"
                value={stats.totalStock}
                subtitle="Items in inventory"
                icon={<FaChartLine />}
                bg="bg-orange-100"
                color="text-orange-600"
              />

              <StatCard
                title="Inventory Value"
                value={`Rs ${formatPrice(
                  stats.inventoryValue
                )}`}
                subtitle="Total stock value"
                icon={<FaMoneyBillWave />}
                bg="bg-red-100"
                color="text-red-600"
              />
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-3xl border shadow-sm p-5 sm:p-8">

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
                  Recent Products
                </h2>

                <span className="text-sm text-gray-400">
                  Latest 5 items
                </span>
              </div>

              <div className="space-y-4">

                {recentItems.length > 0 ? (
                  recentItems.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:bg-gray-50 transition"
                    >
                      <div>
                        <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          {item.category}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xl sm:text-3xl font-bold text-green-600">
                          Rs {formatPrice(item.price)}
                        </p>

                        <p className="text-gray-400 text-sm mt-1">
                          {item.stock} in stock
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 py-8 border rounded-2xl">
                    No recent products found
                  </div>
                )}

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}