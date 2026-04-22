import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Home from "../pages/user/Home";

import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* User Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />


      {/* 404 */}
      <Route path="*" element={<h1 className="text-center mt-10 text-2xl">Page Not Found</h1>} />




    </Routes>
  );
}