import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
/* ================= PAGES ================= */
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Menus from "../pages/Menus";
import Pages from "../pages/Pages";
import Media from "../pages/media";
import Programmes from "../pages/programmes";
import Feedback from "../pages/feedback";
import Notifications from "../pages/Notifications";
import Admins from "../pages/Admins";
import Settings from "../pages/settings";
import HelpSupport from "../pages/HelpSupport";
import Profile from "../pages/Profile";
/* ================= AUTH GUARD ================= */
const RequireAuth = () => {
    const token = localStorage.getItem("token");
    // Optional: token expiry check (future upgrade)
    if (!token) {
        return _jsx(Navigate, { to: "/admin/login", replace: true });
    }
    return _jsx(Outlet, {});
};
export default function AdminRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "login", element: _jsx(Login, {}) }), _jsx(Route, { element: _jsx(RequireAuth, {}), children: _jsxs(Route, { path: "/", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "menus", element: _jsx(Menus, {}) }), _jsx(Route, { path: "pages", element: _jsx(Pages, {}) }), _jsx(Route, { path: "media", element: _jsx(Media, {}) }), _jsx(Route, { path: "programmes", element: _jsx(Programmes, {}) }), _jsx(Route, { path: "feedback", element: _jsx(Feedback, {}) }), _jsx(Route, { path: "notifications", element: _jsx(Notifications, {}) }), _jsx(Route, { path: "admins", element: _jsx(Admins, {}) }), _jsx(Route, { path: "settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "help-support", element: _jsx(HelpSupport, {}) })] }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/admin", replace: true }) })] }));
}
