import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/* ================= USER PAGES ================= */
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import OrderSuccess from "../pages/user/OrderSuccess";

/* Profile Pages */
import Settings from "../pages/user/profile/Settings";
import Security from "../pages/user/profile/Security";

/* ================= ADMIN PAGES ================= */
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageCategories from "../pages/admin/ManageCategories";

/* ================= LAYOUT ================= */
import AdminLayout from "../layouts/AdminLayout";

/* ==========================================
   PRIVATE USER ROUTE
========================================== */
function PrivateRoute({
  children,
}) {
  const { user } =
    useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

/* ==========================================
   PRIVATE ADMIN ROUTE
========================================== */
function AdminRoute({
  children,
}) {
  const { user } =
    useAuth();

  if (
    !user ||
    user.role !==
      "admin"
  ) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

/* ==========================================
   APP ROUTES
========================================== */
export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= USER ROUTES ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/products/:id"
        element={
          <ProductDetails />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={
          <Register />
        }
      />

      {/* ================= PROTECTED USER ================= */}

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />

      <Route
        path="/order-success"
        element={
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        }
      />

      {/* My Account -> Settings */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      {/* Security */}
      <Route
        path="/profile/security"
        element={
          <PrivateRoute>
            <Security />
          </PrivateRoute>
        }
      />

      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin/login"
        element={
          <AdminLogin />
        }
      />

      <Route
        path="/admin-login"
        element={
          <Navigate
            to="/admin/login"
            replace
          />
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route
          path="dashboard"
          element={
            <Dashboard />
          }
        />

        <Route
          path="products"
          element={
            <ManageProducts />
          }
        />

        <Route
          path="categories"
          element={
            <ManageCategories />
          }
        />
      </Route>

      {/* ================= NOT FOUND ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}