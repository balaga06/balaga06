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
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        {/* ================= HOME ================= */}
        <Route index element={<Home />} />

        {/* ================= STATIC ================= */}
        <Route path="pages/programmes" element={<Programmes />} />
        <Route path="pages/about-iqac" element={<AboutIQAC />} />
        <Route path="pages/iqac-committee" element={<IQACCommittee />} />

        {/* 🔥 ADD THIS (VERY IMPORTANT) */}
        <Route path="pages/syllabus" element={<Syllabus />} />

        {/* 🔥 ALSO KEEP THIS */}
        <Route path="syllabus" element={<Syllabus />} />

        {/* ================= DOCUMENTS ================= */}
        <Route path="documents/:slug" element={<DocumentsPage />} />

        {/* ❗ ALWAYS LAST */}
        <Route path="pages/:slug" element={<DynamicPage />} />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />

      </Route>

      {/* GLOBAL 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}