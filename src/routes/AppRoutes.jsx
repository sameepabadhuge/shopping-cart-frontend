import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Home from "../pages/user/Home";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageCategories from "../pages/admin/ManageCategories";

import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default */}
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      {/* User */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route path="/home" element={<Home />} />

      {/* Admin Login */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Logout support route */}
      <Route
        path="/admin-login"
        element={
          <Navigate to="/admin/login" />
        }
      />

      {/* Admin Pages */}
      <Route
        path="/admin"
        element={<AdminLayout />}
      >
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="products"
          element={<ManageProducts />}
        />

        <Route
          path="categories"
          element={
            <ManageCategories />
          }
        />
      </Route>

      {/* Not Found */}
      <Route
        path="*"
        element={<Navigate to="/login" />}
      />
    </Routes>
  );
}