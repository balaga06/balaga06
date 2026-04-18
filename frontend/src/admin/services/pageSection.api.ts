import api from "@/api/axios";

/* =========================
   TYPES
========================= */

export interface PageSection {
  id: number;
  page_group: string;        // home | global | contact | iqac
  section_key: string;       // hero | intro | footer | etc.
  title: string;
  content: Record<string, any>; // 🔥 flexible JSON
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/* =========================
   DTOs
========================= */

export interface CreateSectionDTO {
  page_group: string;
  section_key: string;
  title: string;
  content?: Record<string, any>;
  sort_order?: number;
  is_active?: boolean;
}

export interface UpdateSectionDTO {
  title?: string;
  content?: Record<string, any>;
  is_active?: boolean;
  sort_order?: number;
}

/* =========================
   GET ALL (ADMIN)
========================= */

export const getAllSections = async (): Promise<PageSection[]> => {
  const res = await api.get("/page-sections");

  return Array.isArray(res.data) ? res.data : res.data.data;
};

/* =========================
   GET BY KEY (SINGLE SECTION)
========================= */

export const getSectionByKey = async (
  key: string
): Promise<PageSection> => {
  const res = await api.get(`/page-sections/key/${key}`);

  return res.data.data ?? res.data;
};

/* =========================
   GET BY GROUP (VERY IMPORTANT)
========================= */

export const getSectionsByGroup = async (
  group: string
): Promise<PageSection[]> => {
  const res = await api.get(`/page-sections/group/${group}`);

  return Array.isArray(res.data) ? res.data : res.data.data;
};

/* =========================
   CREATE SECTION
========================= */

export const createSection = async (
  data: CreateSectionDTO
): Promise<PageSection> => {
  const res = await api.post("/page-sections", data);
  return res.data;
};

/* =========================
   UPDATE SECTION
========================= */

export const updateSection = async (
  id: number,
  data: UpdateSectionDTO
): Promise<PageSection> => {
  const res = await api.put(`/page-sections/${id}`, data);
  return res.data;
};

/* =========================
   DELETE SECTION
========================= */

export const deleteSection = async (id: number) => {
  return api.delete(`/page-sections/${id}`);
};

/* =========================
   REORDER (DRAG & DROP)
========================= */

export const reorderSections = async (
  sections: { id: number; sort_order: number }[]
) => {
  return api.put("/page-sections/reorder", { sections });
};

/* =========================
   HELPERS (VERY IMPORTANT)
========================= */

/* ✅ Only active sections */
export const getActiveSectionsByGroup = async (
  group: string
): Promise<PageSection[]> => {
  const sections = await getSectionsByGroup(group);

  return sections
    .filter((s) => s.is_active)
    .sort((a, b) => a.sort_order - b.sort_order);
};

/* ✅ Convert array → key-value map (for SectionContext) */
export const mapSections = (
  sections: PageSection[]
): Record<string, any> => {
  const map: Record<string, any> = {};

  sections.forEach((section) => {
    map[section.section_key] = section.content;
  });

  return map;
};