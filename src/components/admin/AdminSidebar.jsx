

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaSignOutAlt,
} from "react-icons/fa";

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
  ];

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin-login");
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 px-4 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-gray-900">
          FreshCart
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="text-2xl text-gray-700"
        >
          <FaBars />
        </button>

      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeMenu}
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r flex flex-col justify-between transition-transform duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      >
        {/* Top */}
        <div>

          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">

              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  FreshCart
                </h1>

                <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">
                  Admin
                </span>
              </div>

              <button
                onClick={closeMenu}
                className="lg:hidden text-xl text-gray-500"
              >
                <FaTimes />
              </button>

            </div>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">

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

          </nav>
        </div>

        {/* Bottom */}
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
      </aside>
    </>
  );
}