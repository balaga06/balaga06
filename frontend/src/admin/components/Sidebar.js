import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LayoutDashboard, MenuSquare, FileText, Image, GraduationCap, MessageSquare, Megaphone, Shield, Settings, HelpCircle, LogOut, ChevronLeft, } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: MenuSquare, label: "Menus", path: "/admin/menus" },
    { icon: FileText, label: "Pages", path: "/admin/pages" },
    { icon: Image, label: "Media", path: "/admin/media" },
    { icon: GraduationCap, label: "Programmes", path: "/admin/programmes" },
    { icon: MessageSquare, label: "Feedback", path: "/admin/feedback" },
    { icon: Megaphone, label: "Notifications", path: "/admin/notifications" },
    { icon: Shield, label: "Admins", path: "/admin/admins" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
];
export default function Sidebar({ isCollapsed, onToggle }) {
    const location = useLocation();
    const navigate = useNavigate();
    /* ================= LOGOUT FUNCTION ================= */
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
    };
    return (_jsxs("aside", { className: `fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200
      transition-all duration-300 flex flex-col z-40
      ${isCollapsed ? "w-20" : "w-72"}`, children: [_jsxs("div", { className: "h-16 flex items-center gap-3 px-5 border-b border-slate-200", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center", children: _jsx(GraduationCap, { className: "w-5 h-5 text-white" }) }), !isCollapsed && (_jsxs("div", { children: [_jsx("h1", { className: "text-slate-800 font-semibold text-lg", children: "JNTUK" }), _jsx("p", { className: "text-xs text-slate-500 uppercase tracking-wide", children: "IQAC Admin" })] }))] }), _jsx("nav", { className: "flex-1 py-4 px-3 overflow-y-auto", children: _jsx("ul", { className: "space-y-1", children: navItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== "/admin" &&
                                location.pathname.startsWith(item.path));
                        return (_jsx("li", { children: _jsxs(NavLink, { to: item.path, className: `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${isActive
                                    ? "bg-indigo-100 text-indigo-700"
                                    : "text-slate-700 hover:bg-slate-200"}`, children: [_jsx(item.icon, { className: `w-5 h-5 ${isActive ? "text-indigo-700" : "text-slate-500"}` }), !isCollapsed && (_jsx("span", { className: "text-sm font-medium", children: item.label }))] }) }, item.path));
                    }) }) }), _jsxs("div", { className: "p-3 border-t border-slate-200 space-y-1", children: [_jsxs(NavLink, { to: "/admin/help-support", className: ({ isActive }) => `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition
            ${isActive
                            ? "bg-indigo-100 text-indigo-700"
                            : "text-slate-700 hover:bg-slate-200"}`, children: [_jsx(HelpCircle, { className: `w-5 h-5 ${location.pathname === "/admin/help-support"
                                    ? "text-indigo-700"
                                    : "text-slate-500"}` }), !isCollapsed && (_jsx("span", { className: "text-sm font-medium", children: "Help & Support" }))] }), _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg\n          text-red-600 hover:bg-red-100 transition", children: [_jsx(LogOut, { className: "w-5 h-5" }), !isCollapsed && (_jsx("span", { className: "text-sm font-medium", children: "Sign Out" }))] }), _jsxs("button", { onClick: onToggle, className: "w-full mt-2 flex items-center justify-center gap-2\n          px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 transition", children: [_jsx(ChevronLeft, { className: `w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}` }), !isCollapsed && (_jsx("span", { className: "text-sm font-medium", children: "Collapse" }))] })] })] }));
}
