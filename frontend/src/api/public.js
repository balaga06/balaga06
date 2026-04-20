import api from "./axios";
/* =========================
   HELPER (VERY IMPORTANT)
========================= */
const unwrap = (res) => {
    return Array.isArray(res.data) ? res.data : res.data?.data ?? res.data;
};
/* =========================
   SECTIONS
========================= */
export const getSectionsByGroup = async (group) => {
    const res = await api.get(`/page-sections/group/${group}`);
    return unwrap(res);
};
export const getSectionByKey = async (key) => {
    const res = await api.get(`/page-sections/key/${key}`);
    return unwrap(res);
};
/* =========================
   DOWNLOADS / NOTIFICATIONS
========================= */
export const getDownloads = async () => {
    const res = await api.get("/notifications/public");
    return unwrap(res);
};
/* =========================
   MEDIA
========================= */
export const getImages = async (section) => {
    const res = await api.get("/media", {
        params: section ? { section } : {},
    });
    return unwrap(res);
};
/* =========================
   MENUS
========================= */
export const getMenus = async () => {
    const res = await api.get("/menus");
    return unwrap(res);
};
export const createMenu = async (data) => {
    return api.post("/menus", {
        ...data,
        slug: data.slug.replace("/", ""),
    });
};
export const updateMenu = async (id, data) => {
    return api.put(`/menus/${id}`, {
        ...data,
        slug: data.slug.replace("/", ""),
    });
};
export const deleteMenu = async (id) => {
    return api.delete(`/menus/${id}`);
};
/* =========================
   PROGRAMMES (NEW)
========================= */
export const getProgrammes = async (type) => {
    const res = await api.get(`/programmes?type=${type}`);
    return unwrap(res);
};
/* =========================
   EXPORT
========================= */
export default api;
