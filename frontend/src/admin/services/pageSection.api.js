import api from "@/api/axios";
/* =========================
   GET ALL (ADMIN)
========================= */
export const getAllSections = async () => {
    const res = await api.get("/page-sections");
    return Array.isArray(res.data) ? res.data : res.data.data;
};
/* =========================
   GET BY KEY (SINGLE SECTION)
========================= */
export const getSectionByKey = async (key) => {
    const res = await api.get(`/page-sections/key/${key}`);
    return res.data.data ?? res.data;
};
/* =========================
   GET BY GROUP (VERY IMPORTANT)
========================= */
export const getSectionsByGroup = async (group) => {
    const res = await api.get(`/page-sections/group/${group}`);
    return Array.isArray(res.data) ? res.data : res.data.data;
};
/* =========================
   CREATE SECTION
========================= */
export const createSection = async (data) => {
    const res = await api.post("/page-sections", data);
    return res.data;
};
/* =========================
   UPDATE SECTION
========================= */
export const updateSection = async (id, data) => {
    const res = await api.put(`/page-sections/${id}`, data);
    return res.data;
};
/* =========================
   DELETE SECTION
========================= */
export const deleteSection = async (id) => {
    return api.delete(`/page-sections/${id}`);
};
/* =========================
   REORDER (DRAG & DROP)
========================= */
export const reorderSections = async (sections) => {
    return api.put("/page-sections/reorder", { sections });
};
/* =========================
   HELPERS (VERY IMPORTANT)
========================= */
/* ✅ Only active sections */
export const getActiveSectionsByGroup = async (group) => {
    const sections = await getSectionsByGroup(group);
    return sections
        .filter((s) => s.is_active)
        .sort((a, b) => a.sort_order - b.sort_order);
};
/* ✅ Convert array → key-value map (for SectionContext) */
export const mapSections = (sections) => {
    const map = {};
    sections.forEach((section) => {
        map[section.section_key] = section.content;
    });
    return map;
};
