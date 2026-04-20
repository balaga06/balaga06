import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from "react-router-dom";
import { SectionProvider } from "../context/SectionContext";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import FeatureCards from "../components/FeatureCards";
import Footer from "../components/Footer";
import NotificationTicker from "../components/NotificationTicker";
/* ================= LAYOUT ================= */
export default function MainLayout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isAboutPage = location.pathname === "/pages/about-iqac";
    return (_jsx(SectionProvider, { children: _jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [_jsx(TopBar, {}), _jsx(Header, {}), _jsx(Navbar, {}), _jsx(NotificationTicker, {}), _jsxs("main", { className: "flex-1", children: [isHomePage && (_jsxs(_Fragment, { children: [_jsx(Hero, {}), _jsx(Intro, {}), _jsx(FeatureCards, {})] })), isAboutPage && (_jsxs(_Fragment, { children: [_jsx(Intro, {}), _jsx(FeatureCards, {})] })), !isHomePage && !isAboutPage && _jsx(Outlet, {})] }), _jsx(Footer, {})] }) }));
}
