import api from "@/api/axios";
/* =========================
   GET ALL PAGES
========================= */
export const getPages = async () => {
    const res = await api.get("/pages");
    // ✅ SAFE TYPE CHECK
    if (Array.isArray(res.data)) {
        return res.data;
    }
    return res.data.data;
};
/* =========================
   GET PAGE BY ID
========================= */
export const getPageById = async (id) => {
    const res = await api.get(`/pages/${id}`);
    return res.data;
};
/* =========================
   GET PAGE BY SLUG
========================= */
export const getPageBySlug = async (slug) => {
    const res = await api.get(`/pages/slug/${slug}`);
    return "data" in res.data ? res.data.data : res.data;
};
/* =========================
   CREATE PAGE
========================= */
export const createPage = async (data) => {
    const res = await api.post("/pages", {
        ...data,
        slug: data.slug.replace(/^\/+/, ""),
    });
    return res.data;
};
/* =========================
   UPDATE PAGE
========================= */
export const updatePage = async (id, data) => {
    const res = await api.put(`/pages/${id}`, {
        ...data,
        slug: data.slug ? data.slug.replace(/^\/+/, "") : undefined,
    });
    return res.data;
};
/* =========================
   DELETE PAGE
========================= */
export const deletePage = async (id) => {
    await api.delete(`/pages/${id}`);
};
/* =========================
   REORDER PAGES
========================= */
export const reorderPages = async (pages) => {
    await api.put("/pages/reorder", { pages });
};
/* =========================
   PUBLISH HELPERS
========================= */
export const publishPage = async (id) => {
    return updatePage(id, { status: "published" });
};
export const unpublishPage = async (id) => {
    return updatePage(id, { status: "draft" });
};
/* =========================
   FILTER HELPERS
========================= */
export const getPublishedPages = async () => {
    const pages = await getPages();
    return pages.filter((p) => p.status === "published");
};
