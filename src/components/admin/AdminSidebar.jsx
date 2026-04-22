import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaReact,
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FaTags />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  return (
    <div className="w-72 bg-white border-r min-h-screen fixed left-0 top-0 flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 text-white p-3 rounded-xl text-xl">
              <FaReact />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                FreshCart
              </h1>

              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all duration-200 ${
                  active
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">
                  {item.icon}
                </span>

                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-red-600 hover:bg-red-50 font-medium"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}