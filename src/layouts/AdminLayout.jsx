
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f6f8f4] overflow-x-hidden">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="w-full lg:pl-72 pt-16 lg:pt-0">
        <Outlet />
      </main>

    </div>
  );
}