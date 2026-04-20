import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
/* ================= LAYOUT ================= */
import MainLayout from "@/layouts/MainLayout";
/* ================= PAGES ================= */
import Home from "@/pages/Home";
import DynamicPage from "@/pages/DynamicPage";
import DocumentsPage from "@/pages/DocumentsPage";
import Programmes from "@/pages/Programmes";
import NotFound from "@/pages/NotFound";
import AboutIQAC from "@/pages/AboutIQAC";
import IQACCommittee from "@/pages/IQACCommittee";
/* 🔥 SYLLABUS */
import Syllabus from "@/pages/Syllabus";
export default function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "pages/programmes", element: _jsx(Programmes, {}) }), _jsx(Route, { path: "pages/about-iqac", element: _jsx(AboutIQAC, {}) }), _jsx(Route, { path: "pages/iqac-committee", element: _jsx(IQACCommittee, {}) }), _jsx(Route, { path: "pages/syllabus", element: _jsx(Syllabus, {}) }), _jsx(Route, { path: "syllabus", element: _jsx(Syllabus, {}) }), _jsx(Route, { path: "documents/:slug", element: _jsx(DocumentsPage, {}) }), _jsx(Route, { path: "pages/:slug", element: _jsx(DynamicPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }));
}
