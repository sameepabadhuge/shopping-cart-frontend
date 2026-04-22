import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f6f8f4] flex">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Content */}
      <main className="ml-72 w-full p-8">
        <Outlet />
      </main>

    </div>
  );
}