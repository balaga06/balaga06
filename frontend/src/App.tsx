import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

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
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/* ================= APP ================= */
export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>

        {/* MAIN WEBSITE */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="programmes" element={<Programmes />} />

          {/* DOCUMENT PAGES */}
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="naac" element={<NAAC />} />
          <Route path="nirf" element={<NIRF />} />
          <Route path="reports" element={<Reports />} />
          <Route path="minutes" element={<Minutes />} />

          {/* CMS */}
          <Route path="pages/:slug" element={<DynamicPage />} />
          <Route path="documents/:slug" element={<DocumentsPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* GLOBAL 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}