import api from "@/api/axios";
/* =========================
   GET
========================= */
export const getNotifications = () => api.get("/notifications");
export const getNotificationById = (id) => api.get(`/notifications/${id}`);
/* =========================
   CREATE (now supports file upload)
========================= */
export const createNotification = (formData) => api.post("/notifications", formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
/* =========================
   UPDATE (now supports file upload)
========================= */
export const updateNotification = (id, formData) => api.put(`/notifications/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});
/* =========================
   DELETE
========================= */
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);
