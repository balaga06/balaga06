import api from "./axios";
/* ================= GET PROGRAMMES ================= */
// ✅ FIXED: returns data directly (NO .data needed in UI)
export const getProgrammes = async (type) => {
    const res = await api.get(`/programmes?type=${type}`);
    return res.data;
};
