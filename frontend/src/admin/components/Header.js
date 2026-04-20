import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown, User, Settings, LogOut, Menu, X, } from "lucide-react";
const notifications = [
    {
        id: 1,
        title: "New student application",
        message: "Sarah Mitchell submitted an application for Computer Science",
        time: "2 min ago",
        read: false,
    },
    {
        id: 2,
        title: "Faculty meeting reminder",
        message: "Department meeting starts in 30 minutes",
        time: "28 min ago",
        read: false,
    },
    {
        id: 3,
        title: "Course update",
        message: "Advanced Mathematics course has been updated",
        time: "1 hour ago",
        read: true,
    },
];
export default function Header({ onMenuClick, isMobileMenuOpen, }) {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const notificationsRef = useRef(null);
    const profileRef = useRef(null);
    const unreadCount = notifications.filter((n) => !n.read).length;
    /* ================= OUTSIDE CLICK ================= */
    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationsRef.current &&
                !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current &&
                !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    /* ================= LOGOUT ================= */
    const handleLogout = () => {
        // ✅ REMOVE TOKEN (IMPORTANT)
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
    };
    return (_jsxs("header", { className: "h-16 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onMenuClick, className: "lg:hidden p-2 rounded-md hover:bg-slate-200", children: isMobileMenuOpen ? (_jsx(X, { className: "w-6 h-6" })) : (_jsx(Menu, { className: "w-6 h-6" })) }), _jsxs("div", { className: "relative hidden sm:block", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search...", className: "w-64 h-10 pl-9 pr-4 rounded-md border border-slate-300 text-sm" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", ref: notificationsRef, children: [_jsxs("button", { onClick: () => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfile(false);
                                }, className: "p-2 rounded-md hover:bg-slate-200", children: [_jsx(Bell, { className: "w-5 h-5" }), unreadCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] px-1.5 rounded-full", children: unreadCount }))] }), showNotifications && (_jsxs("div", { className: "absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg", children: [_jsx("div", { className: "px-4 py-2 font-semibold border-b", children: "Notifications" }), notifications.map((n) => (_jsxs("div", { className: "px-4 py-3 text-sm border-b", children: [_jsx("p", { className: "font-medium", children: n.title }), _jsx("p", { className: "text-xs text-slate-500", children: n.message }), _jsx("p", { className: "text-xs text-slate-400", children: n.time })] }, n.id)))] }))] }), _jsxs("div", { className: "relative", ref: profileRef, children: [_jsxs("button", { onClick: () => {
                                    setShowProfile(!showProfile);
                                    setShowNotifications(false);
                                }, className: "flex items-center gap-2 hover:bg-slate-200 px-2 py-1 rounded-md", children: [_jsxs("div", { className: "text-right hidden sm:block", children: [_jsx("p", { className: "text-sm font-semibold", children: "Admin User" }), _jsx("p", { className: "text-xs text-slate-500", children: "admin@jntuk.edu.in" })] }), _jsx("div", { className: "w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold", children: "AU" }), _jsx(ChevronDown, { className: "w-4 h-4" })] }), showProfile && (_jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg", children: [_jsxs("button", { onClick: () => navigate("/admin/profile"), className: "w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100", children: [_jsx(User, { className: "w-4 h-4" }), "My Profile"] }), _jsxs("button", { onClick: () => navigate("/admin/settings"), className: "w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100", children: [_jsx(Settings, { className: "w-4 h-4" }), "Settings"] }), _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50", children: [_jsx(LogOut, { className: "w-4 h-4" }), "Logout"] })] }))] })] })] }));
}
