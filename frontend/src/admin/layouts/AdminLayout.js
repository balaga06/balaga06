import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
export default function AdminLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen bg-slate-100", children: [_jsx("div", { className: "hidden lg:block", children: _jsx(Sidebar, { isCollapsed: isSidebarCollapsed, onToggle: () => setIsSidebarCollapsed(!isSidebarCollapsed) }) }), isMobileMenuOpen && (_jsx("div", { className: "lg:hidden fixed inset-0 bg-black/40 z-30", onClick: () => setIsMobileMenuOpen(false) })), _jsx("div", { className: `lg:hidden fixed left-0 top-0 h-screen z-40 bg-white shadow-xl
        transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`, children: _jsx(Sidebar, { isCollapsed: false, onToggle: () => setIsMobileMenuOpen(false) }) }), _jsxs("div", { className: `min-h-screen transition-all duration-300
        ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"}`, children: [_jsx(Header, { onMenuClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), isMobileMenuOpen: isMobileMenuOpen }), _jsx("main", { className: "p-4 sm:p-6 lg:p-8", children: _jsx("div", { className: "max-w-[1600px] mx-auto", children: _jsx("div", { className: "bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[70vh]", children: _jsx(Outlet, {}) }) }) })] })] }));
}
