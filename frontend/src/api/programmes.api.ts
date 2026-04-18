import api from "./axios";

/* ================= TYPES ================= */

export interface Programme {
  id: number;
  type: "UG" | "PG";
  name: string;
  degree: string;
  duration: string;
  department: string;
  status: "Active" | "Inactive";
}

/* ================= GET PROGRAMMES ================= */

// ✅ FIXED: returns data directly (NO .data needed in UI)
export const getProgrammes = async (
  type: "UG" | "PG"
): Promise<Programme[]> => {
  const res = await api.get<Programme[]>(`/programmes?type=${type}`);
  return res.data;
};