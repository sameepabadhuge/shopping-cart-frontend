import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../components/admin/StatCard";

import {
  FaBoxOpen,
  FaTags,
  FaChartLine,
  FaDollarSign,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalStock: 0,
    inventoryValue: 0,
    recentProducts: [],
  });

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(res.data);
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

  // Load on page open
  useEffect(() => {
    const loadDashboard = async () => {
      await fetchDashboard();
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-xl text-gray-500 mt-2">
          Welcome to FreshCart Admin Panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

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
          value={`$${stats.inventoryValue}`}
          subtitle="Total stock value"
          icon={<FaDollarSign />}
          bg="bg-red-100"
          color="text-red-600"
        />

      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-3xl p-8 border shadow-sm">
        <h2 className="text-4xl font-bold mb-8">
          Recent Products
        </h2>

        <div className="space-y-4">

          {stats.recentProducts.length >
          0 ? (
            stats.recentProducts.map(
              (item) => (
                <div
                  key={item._id}
                  className="border rounded-2xl px-6 py-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      {item.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">
                      ${item.price}
                    </p>

                    <p className="text-gray-400 mt-1">
                      {item.stock} in stock
                    </p>
                  </div>
                </div>
              )
            )
          ) : (
            <p className="text-gray-400">
              No recent products found
            </p>
          )}

        </div>
      </div>

    </div>
  );
}