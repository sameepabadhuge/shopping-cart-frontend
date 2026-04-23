import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaReact,
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useState } from "react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

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

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin-login");
  };

  /* =========================
     CLOSE MOBILE MENU
  ========================= */
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 text-white p-2 rounded-lg">
            <FaReact />
          </div>

          <h1 className="text-xl font-bold">
            FreshCart
          </h1>
        </div>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="text-xl text-gray-700"
        >
          <FaBars />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={closeMenu}
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 bg-white border-r min-h-screen w-72 flex flex-col justify-between transition-all duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >
        {/* TOP */}
        <div>
          {/* LOGO */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between lg:justify-start">
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

              {/* CLOSE MOBILE */}
              <button
                onClick={
                  closeMenu
                }
                className="lg:hidden text-xl text-gray-500"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* MENU */}
          <div className="p-4 space-y-2">
            {menuItems.map(
              (item) => {
                const active =
                  location.pathname ===
                  item.path;

                return (
                  <Link
                    key={
                      item.path
                    }
                    to={
                      item.path
                    }
                    onClick={
                      closeMenu
                    }
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium transition-all duration-200 ${
                      active
                        ? "bg-green-600 text-white shadow"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">
                      {
                        item.icon
                      }
                    </span>

                    {
                      item.name
                    }
                  </Link>
                );
              }
            )}
          </div>
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t">
          <button
            onClick={
              handleLogout
            }
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-red-600 hover:bg-red-50 font-medium"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}