import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/* User Pages */
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import OrderSuccess from "../pages/user/OrderSuccess";

/* Admin Pages */
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageCategories from "../pages/admin/ManageCategories";

/* Layout */
import AdminLayout from "../layouts/AdminLayout";

/* =========================
   Protected User Route
========================= */
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

/* =========================
   Protected Admin Route
========================= */
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

      {/* Protected Cart */}
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }

      />

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin/login"
        element={
          <AdminLogin />
        }
      />

      {/* Old URL Redirect */}
      <Route
        path="/admin-login"
        element={
          <Navigate
            to="/admin/login"
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
          />
        }
      />

    </Routes>
  );
}