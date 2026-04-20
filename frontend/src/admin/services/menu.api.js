import api from "@/api/axios";
/* =========================
   GET MENUS
========================= */
export const getMenus = async () => {
    const res = await api.get("/menus");
    const data = Array.isArray(res.data) ? res.data : res.data.data;
    // ✅ normalize type (very important safety)
    return data.map((m) => ({
        ...m,
        type: m.type || "page", // fallback
    }));
};
/* =========================
   CREATE MENU
========================= */
export const createMenu = async (data) => {
    return api.post("/menus", {
        ...data,
        slug: data.slug.replace(/^\/+/, ""),
    });
};
/* =========================
   UPDATE MENU
========================= */
export const updateMenu = async (id, data) => {
    return api.put(`/menus/${id}`, {
        ...data,
        slug: data.slug.replace(/^\/+/, ""),
    });
};
/* =========================
   DELETE MENU
========================= */
export const deleteMenu = async (id) => {
    return api.delete(`/menus/${id}`);
};
/* =========================
   HELPERS
========================= */
/* ✅ Active menus (navbar) */
export const getActiveMenus = async () => {
    const menus = await getMenus();
    return menus
        .filter((m) => m.is_active)
        .sort((a, b) => a.position - b.position);
};
/* ✅ FIXED LINK RESOLVER */
export const resolveMenuLink = (menu) => {
    if (menu.type === "page") {
        return `/pages/${menu.slug}`;
    }
    if (menu.type === "docs") {
        return `/documents/${menu.slug}`; // ✅ FIXED
    }
    if (menu.type === "external") {
        return menu.link || "#";
    }
    return "#";
};
