import { Routes, Route, Navigate } from "react-router-dom";

/* User Pages */
import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Cart from "../pages/user/Cart";

/* Admin Pages */
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ManageProducts from "../pages/admin/ManageProducts";
import ManageCategories from "../pages/admin/ManageCategories";

/* Layout */
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />

      
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Redirect old admin-login URL */}
      <Route
        path="/admin-login"
        element={<Navigate to="/admin/login" />}
      />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<AdminLayout />}>
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
          element={<ManageCategories />}
        />
      </Route>

      {/* ================= NOT FOUND ================= */}
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
}