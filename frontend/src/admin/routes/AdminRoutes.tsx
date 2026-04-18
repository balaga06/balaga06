import React from "react";
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
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default function AdminRoutes() {
  return (
    <Routes>

      {/* ========= LOGIN ========= */}
      <Route path="login" element={<Login />} />

      {/* ========= PROTECTED ROUTES ========= */}
      <Route element={<RequireAuth />}>

        <Route path="/" element={<AdminLayout />}>

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* ================= CMS ================= */}
          <Route path="menus" element={<Menus />} />
          <Route path="pages" element={<Pages />} />
          <Route path="media" element={<Media />} />

          {/* ================= ACADEMIC ================= */}
          <Route path="programmes" element={<Programmes />} />

          {/* ================= COMMUNICATION ================= */}
          <Route path="feedback" element={<Feedback />} />
          <Route path="notifications" element={<Notifications />} />

          {/* ================= ADMIN ================= */}
          <Route path="admins" element={<Admins />} />
          <Route path="settings" element={<Settings />} />

          {/* ================= PROFILE ================= */}
          <Route path="profile" element={<Profile />} />

          {/* ================= HELP ================= */}
          <Route path="help-support" element={<HelpSupport />} />

        </Route>
      </Route>

      {/* ========= DEFAULT REDIRECT ========= */}
      <Route path="*" element={<Navigate to="/admin" replace />} />

    </Routes>
  );
}