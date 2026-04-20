import api from "@/api/axios";
/* =========================
   SAFE DATA EXTRACTOR 🔥
========================= */
const extractData = (res) => {
    if (!res || res.data == null) {
        return [];
    }
    if (Array.isArray(res.data)) {
        return res.data;
    }
    if (typeof res.data === "object" &&
        "data" in res.data &&
        res.data.data != null) {
        return res.data.data;
    }
    return res.data;
};
/* =========================
   GET ALL (ADMIN)
========================= */
export const getNotifications = async () => {
    const res = await api.get("/notifications");
    return extractData(res);
};
/* =========================
   GET PUBLIC
========================= */
export const getPublicNotifications = async () => {
    const res = await api.get("/notifications/public");
    return extractData(res);
};
/* =========================
   GET SINGLE
========================= */
export const getNotificationById = async (id) => {
    const res = await api.get(`/notifications/${id}`);
    if (!res.data) {
        throw new Error("Notification not found");
    }
    return res.data;
};
/* =========================
   CREATE
========================= */
export const createNotification = async (formData) => {
    const res = await api.post("/notifications", formData);
    if (!res.data) {
        throw new Error("Failed to create notification");
    }
    return res.data;
};
/* =========================
   UPDATE
========================= */
export const updateNotification = async (id, formData) => {
    const res = await api.put(`/notifications/${id}`, formData);
    if (!res.data) {
        throw new Error("Failed to update notification");
    }
    return res.data;
};
/* =========================
   DELETE
========================= */
export const deleteNotification = async (id) => {
    await api.delete(`/notifications/${id}`);
};
/* =========================
   HELPERS (FINAL LOGIC ✅)
========================= */
/* ✅ WEBSITE (documents/pages) */
export const getActiveNotifications = async () => {
    const data = await getPublicNotifications();
    return data
        .filter((n) => n.is_active) // show only active
        .sort((a, b) => b.id - a.id);
};
/* ✅ CATEGORY FILTER (website only) */
export const getNotificationsByCategory = async (category) => {
    const data = await getPublicNotifications();
    return data
        .filter((n) => n.is_active &&
        n.category?.toLowerCase().trim() ===
            category.toLowerCase().trim())
        .sort((a, b) => b.id - a.id);
};
/* ✅ SCROLL BAR ONLY */
export const getScrollingNotifications = async () => {
    const data = await getPublicNotifications();
    return data
        .filter((n) => n.is_active && // must be visible
        (n.is_scrolling ?? true) // scroll control
    )
        .sort((a, b) => b.id - a.id);
};
