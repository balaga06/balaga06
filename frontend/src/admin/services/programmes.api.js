import api from "@/api/axios";
const extractData = (res) => {
    const raw = res?.data;
    if (!raw)
        return [];
    if (Array.isArray(raw))
        return raw;
    if (typeof raw === "object" && "data" in raw) {
        return raw.data;
    }
    return raw;
};
/* =========================
   ADMIN (ALL DATA)
========================= */
export const getProgrammes = async (type) => {
    const res = await api.get("/programmes", {
        params: type ? { type } : {},
    });
    const data = extractData(res);
    return (data || []).sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
};
/* =========================
   PUBLIC (WEBSITE ONLY)
========================= */
export const getPublicProgrammes = async (type) => {
    const res = await api.get("/programmes/public", {
        params: type ? { type } : {},
    });
    return extractData(res);
};
/* =========================
   GET BY ID
========================= */
export const getProgrammeById = async (id) => {
    const res = await api.get(`/programmes/${id}`);
    return extractData(res);
};
/* =========================
   CREATE
========================= */
export const createProgramme = async (data) => {
    const payload = {
        ...data,
        type: data.type.toUpperCase(),
        is_active: data.is_active ?? true,
    };
    const res = await api.post("/programmes", payload);
    return extractData(res);
};
/* =========================
   UPDATE
========================= */
export const updateProgramme = async (id, data) => {
    const payload = {
        ...data,
        type: data.type ? data.type.toUpperCase() : undefined,
    };
    const res = await api.put(`/programmes/${id}`, payload);
    return extractData(res);
};
/* =========================
   DELETE
========================= */
export const deleteProgramme = async (id) => {
    return api.delete(`/programmes/${id}`);
};
/* =========================
   REORDER
========================= */
export const reorderProgrammes = async (items) => {
    return api.put("/programmes/reorder", { items });
};
/* =========================
   HELPERS (FIXED)
========================= */
/* ✅ WEBSITE ONLY */
export const getActiveProgrammes = async (type) => {
    const data = await getPublicProgrammes(type); // ✅ FIXED
    return data;
};
/* ✅ GROUPED (WEBSITE) */
export const getGroupedProgrammes = async () => {
    const data = await getPublicProgrammes();
    return {
        UG: data.filter((p) => p.type === "UG"),
        PG: data.filter((p) => p.type === "PG"),
    };
};
