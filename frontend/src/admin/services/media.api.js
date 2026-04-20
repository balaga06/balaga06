import api from "@/api/axios";
/* =========================
   HELPER (SAFE RESPONSE)
========================= */
const parseResponse = (res) => {
    if (Array.isArray(res.data))
        return res.data;
    return res.data?.data ?? [];
};
/* =========================
   GET ALL MEDIA
========================= */
export const getMedia = async () => {
    const res = await api.get("/media");
    return parseResponse(res);
};
/* =========================
   GET BY SECTION
========================= */
export const getMediaBySection = async (section) => {
    const res = await api.get("/media", {
        params: { section },
    });
    return parseResponse(res);
};
/* =========================
   GET BY CATEGORY
========================= */
export const getMediaByCategory = async (category) => {
    const res = await api.get("/media", {
        params: { category },
    });
    return parseResponse(res);
};
/* =========================
   GET SINGLE MEDIA
========================= */
export const getMediaById = async (id) => {
    const res = await api.get(`/media/${id}`);
    return res.data;
};
/* =========================
   CREATE MEDIA (FINAL FIX)
========================= */
export const createMedia = async ({ file, caption, section, category, }) => {
    const formData = new FormData();
    // ✅ MUST MATCH BACKEND (multer.single("image"))
    formData.append("image", file);
    // ✅ SAFE NULL HANDLING
    formData.append("caption", caption ?? "");
    formData.append("section", section);
    formData.append("category", category);
    const res = await api.post("/media", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
/* =========================
   UPDATE MEDIA (FINAL FIX)
========================= */
export const updateMedia = async (id, { file, caption, section, category, }) => {
    const formData = new FormData();
    // ✅ FILE (OPTIONAL)
    if (file) {
        formData.append("image", file);
    }
    // ✅ SAFE APPEND
    if (caption !== undefined)
        formData.append("caption", caption);
    if (section !== undefined)
        formData.append("section", section);
    if (category !== undefined)
        formData.append("category", category);
    const res = await api.put(`/media/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
/* =========================
   DELETE MEDIA
========================= */
export const deleteMedia = async (id) => {
    await api.delete(`/media/${id}`);
};
