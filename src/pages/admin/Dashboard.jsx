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

  /* =========================
     Fetch Dashboard
  ========================= */
  const fetchDashboard =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/dashboard"
          );

        setStats(
          res.data
        );
      } catch (error) {
        console.log(
          "Dashboard Error:",
          error
        );
      }
    };

  useEffect(() => {
    const loadData =
      async () => {
        await fetchDashboard();
      };

    loadData();
  }, []);

  /* =========================
     Format Number
  ========================= */
  const formatPrice = (
    value
  ) => {
    return Number(
      value || 0
    ).toLocaleString();
  };

  /* Show only 5 recent */
  const recentItems =
    stats.recentProducts.slice(
      0,
      5
    );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-base sm:text-xl text-gray-500 mt-2">
          Welcome to FreshCart Admin Panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Products"
          value={
            stats.totalProducts
          }
          subtitle="Products in catalog"
          icon={<FaBoxOpen />}
          bg="bg-green-100"
          color="text-green-600"
        />

        <StatCard
          title="Total Categories"
          value={
            stats.totalCategories
          }
          subtitle="Product categories"
          icon={<FaTags />}
          bg="bg-yellow-100"
          color="text-yellow-600"
        />

        <StatCard
          title="Total Stock"
          value={
            stats.totalStock
          }
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
          icon={
            <FaMoneyBillWave />
          }
          bg="bg-red-100"
          color="text-red-600"
        />

      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border shadow-sm">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-4xl font-bold">
            Recent Products
          </h2>

          <span className="text-sm text-gray-400">
            Latest 5 items
          </span>
        </div>

        <div className="space-y-4">

          {recentItems.length >
          0 ? (
            recentItems.map(
              (
                item
              ) => (
                <div
                  key={
                    item._id
                  }
                  className="border rounded-2xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:bg-gray-50 transition"
                >
                  <div>
                    <h3 className="text-lg sm:text-2xl font-semibold">
                      {
                        item.name
                      }
                    </h3>

                    <p className="text-gray-500 text-sm sm:text-base mt-1">
                      {
                        item.category
                      }
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xl sm:text-3xl font-bold text-green-600">
                      Rs{" "}
                      {formatPrice(
                        item.price
                      )}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {
                        item.stock
                      }{" "}
                      in stock
                    </p>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="border rounded-2xl px-6 py-8 text-center text-gray-400">
              No recent products found
            </div>
          )}

        </div>
      </div>

    </div>
  );
}