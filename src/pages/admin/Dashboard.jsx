import {
  FaThLarge,
  FaBoxOpen,
  FaTags,
  FaSignOutAlt,
  FaCube,
  FaChartLine,
  FaDollarSign,
  FaReact,
} from "react-icons/fa";

export default function Dashboard() {
  const recentProducts = [
    {
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: "$3.99",
      stock: "50 in stock",
    },
    {
      name: "Green Broccoli",
      category: "Vegetables",
      price: "$4.49",
      stock: "35 in stock",
    },
    {
      name: "Carrots Bundle",
      category: "Vegetables",
      price: "$2.99",
      stock: "60 in stock",
    },
    {
      name: "Fresh Apples",
      category: "Fruits",
      price: "$5.99",
      stock: "100 in stock",
    },
    {
      name: "Ripe Bananas",
      category: "Fruits",
      price: "$2.49",
      stock: "80 in stock",
    },
  ];

  const cards = [
    {
      title: "Total Products",
      value: "16",
      desc: "Products in catalog",
      icon: <FaCube />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Categories",
      value: "6",
      desc: "Product categories",
      icon: <FaTags />,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Total Stock",
      value: "730",
      desc: "Items in inventory",
      icon: <FaChartLine />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Inventory Value",
      value: "$3890",
      desc: "Total stock value",
      icon: <FaDollarSign />,
      color: "bg-red-100 text-red-500",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f6f2]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="p-5 border-b flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-2xl">
              <FaReact />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              FreshCart
            </h1>

            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md">
              Admin
            </span>
          </div>

          {/* Menu */}
          <div className="p-3 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-green-600 text-white font-semibold">
              <FaThLarge />
              Dashboard
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-gray-600 hover:bg-gray-100">
              <FaBoxOpen />
              Products
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-gray-600 hover:bg-gray-100">
              <FaTags />
              Categories
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="p-3 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-gray-700 hover:bg-gray-100">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-5xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2 text-xl">
          Welcome to FreshCart Admin Panel
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-5 mt-10">
          {cards.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border p-7"
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-500 text-lg">
                  {item.title}
                </p>

                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>

              <h2 className="text-5xl font-bold mt-8">
                {item.value}
              </h2>

              <p className="text-gray-400 mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-3xl border mt-10 p-7">
          <h2 className="text-3xl font-bold mb-8">
            Recent Products
          </h2>

          <div className="space-y-5">
            {recentProducts.map((item, index) => (
              <div
                key={index}
                className="border rounded-2xl px-6 py-5 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {item.category}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-600 font-bold text-2xl">
                    {item.price}
                  </p>

                  <p className="text-gray-400 mt-1">
                    {item.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}