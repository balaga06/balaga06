import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-screen z-40 bg-white shadow-xl
        transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          isCollapsed={false}
          onToggle={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Section */}
      <div
        className={`min-h-screen transition-all duration-300
        ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"}`}
      >
        {/* Header */}
        <Header
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Page Content Wrapper */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Content Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[70vh]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
