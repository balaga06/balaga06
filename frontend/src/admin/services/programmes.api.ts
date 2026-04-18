import api from "@/api/axios";

/* =========================
   TYPES
========================= */

export interface Programme {
  id: number;
  name: string;
  degree: string;
  duration: string;
  department: string;
  branch_code?: string;
  type: "UG" | "PG";
  is_active: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

/* =========================
   DTOs
========================= */

export interface CreateProgrammeDTO {
  name: string;
  degree: string;
  duration: string;
  department: string;
  branch_code?: string;
  type: "UG" | "PG";
  is_active?: boolean;
  order_index?: number;
}

export interface UpdateProgrammeDTO {
  name?: string;
  degree?: string;
  duration?: string;
  department?: string;
  branch_code?: string;
  type?: "UG" | "PG";
  is_active?: boolean;
  order_index?: number;
}

/* =========================
   RESPONSE HANDLER
========================= */

type ApiResponse<T> = {
  data: T;
};

const extractData = <T>(res: {
  data: T | ApiResponse<T> | null | undefined;
}): T => {
  const raw = res?.data;

  if (!raw) return [] as unknown as T;

  if (Array.isArray(raw)) return raw;

  if (typeof raw === "object" && "data" in raw) {
    return (raw as ApiResponse<T>).data;
  }

  return raw as T;
};

/* =========================
   ADMIN (ALL DATA)
========================= */

export const getProgrammes = async (
  type?: "UG" | "PG"
): Promise<Programme[]> => {
  const res = await api.get("/programmes", {
    params: type ? { type } : {},
  });

  const data = extractData<Programme[]>(res);

  return (data || []).sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
};

/* =========================
   PUBLIC (WEBSITE ONLY)
========================= */

export const getPublicProgrammes = async (
  type?: "UG" | "PG"
): Promise<Programme[]> => {
  const res = await api.get("/programmes/public", {
    params: type ? { type } : {},
  });

  return extractData<Programme[]>(res);
};

/* =========================
   GET BY ID
========================= */

export const getProgrammeById = async (
  id: number
): Promise<Programme> => {
  const res = await api.get(`/programmes/${id}`);
  return extractData<Programme>(res);
};

/* =========================
   CREATE
========================= */

export const createProgramme = async (
  data: CreateProgrammeDTO
): Promise<Programme> => {
  const payload = {
    ...data,
    type: data.type.toUpperCase(),
    is_active: data.is_active ?? true,
  };

  const res = await api.post("/programmes", payload);
  return extractData<Programme>(res);
};

/* =========================
   UPDATE
========================= */

export const updateProgramme = async (
  id: number,
  data: UpdateProgrammeDTO
): Promise<Programme> => {
  const payload = {
    ...data,
    type: data.type ? data.type.toUpperCase() : undefined,
  };

  const res = await api.put(`/programmes/${id}`, payload);
  return extractData<Programme>(res);
};

/* =========================
   DELETE
========================= */

export const deleteProgramme = async (id: number) => {
  return api.delete(`/programmes/${id}`);
};

/* =========================
   REORDER
========================= */

export const reorderProgrammes = async (
  items: { id: number; order_index: number }[]
) => {
  return api.put("/programmes/reorder", { items });
};

/* =========================
   HELPERS (FIXED)
========================= */

/* ✅ WEBSITE ONLY */
export const getActiveProgrammes = async (
  type?: "UG" | "PG"
): Promise<Programme[]> => {
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