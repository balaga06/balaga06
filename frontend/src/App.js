import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
/* ================= LAYOUT ================= */
import MainLayout from "./layouts/MainLayout";
/* ================= ADMIN ================= */
import AdminRoutes from "./admin/routes/AdminRoutes";
import Login from "./admin/pages/Login";
/* ================= PUBLIC PAGES ================= */
import Home from "./pages/Home";
import DynamicPage from "./pages/DynamicPage";
import DocumentsPage from "./pages/DocumentsPage";
import Programmes from "./pages/Programmes";
/* ================= DOCUMENT PAGES ================= */
import Syllabus from "./pages/Syllabus";
import NAAC from "./pages/NAAC";
import NIRF from "./pages/NIRF";
import Reports from "./pages/Reports";
import Minutes from "./pages/MinutesMeetings";
/* ================= NOT FOUND ================= */
import NotFound from "./pages/NotFound";
/* ================= PROTECTED ROUTE ================= */
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
/* ================= APP ================= */
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { position: "top-right" }), _jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "programmes", element: _jsx(Programmes, {}) }), _jsx(Route, { path: "syllabus", element: _jsx(Syllabus, {}) }), _jsx(Route, { path: "naac", element: _jsx(NAAC, {}) }), _jsx(Route, { path: "nirf", element: _jsx(NIRF, {}) }), _jsx(Route, { path: "reports", element: _jsx(Reports, {}) }), _jsx(Route, { path: "minutes", element: _jsx(Minutes, {}) }), _jsx(Route, { path: "pages/:slug", element: _jsx(DynamicPage, {}) }), _jsx(Route, { path: "documents/:slug", element: _jsx(DocumentsPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/admin/*", element: _jsx(ProtectedRoute, { children: _jsx(AdminRoutes, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] })] }));
}
