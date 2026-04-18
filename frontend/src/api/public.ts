import api from "./axios";

/* =========================
   TYPES
========================= */

/* ---------- SECTIONS ---------- */

export interface PageSection {
  id: number;
  page_group: string;
  section_key: string;
  title: string;
  content: any;
  sort_order: number;
  is_active: boolean;
}

/* ---------- DOWNLOADS ---------- */

export interface DownloadItem {
  id: number;
  title: string;
  file_url?: string;
  link?: string;
  created_at: string;
  category?: string;
}

/* ---------- MEDIA ---------- */

export interface Image {
  id: number;
  url: string;
  caption?: string;
  category?: string;
  section?: string;
}

/* ---------- MENUS ---------- */

export interface Menu {
  id: number;
  name: string;
  slug: string;
  type: "page" | "docs" | "external";
  link?: string;
  position: number;
  is_active: boolean;
}

/* ---------- PROGRAMMES ---------- */

export interface Programme {
  id: number;
  type: "UG" | "PG";
  name: string;
  degree: string;
  duration: string;
  department: string;
  status: "Active" | "Inactive";
}

/* =========================
   HELPER (VERY IMPORTANT)
========================= */

const unwrap = <T>(res: any): T => {
  return Array.isArray(res.data) ? res.data : res.data?.data ?? res.data;
};

/* =========================
   SECTIONS
========================= */

export const getSectionsByGroup = async (
  group: string
): Promise<PageSection[]> => {
  const res = await api.get(`/page-sections/group/${group}`);
  return unwrap<PageSection[]>(res);
};

export const getSectionByKey = async (
  key: string
): Promise<PageSection> => {
  const res = await api.get(`/page-sections/key/${key}`);
  return unwrap<PageSection>(res);
};

/* =========================
   DOWNLOADS / NOTIFICATIONS
========================= */

export const getDownloads = async (): Promise<DownloadItem[]> => {
  const res = await api.get("/notifications/public");
  return unwrap<DownloadItem[]>(res);
};

/* =========================
   MEDIA
========================= */

export const getImages = async (
  section?: string
): Promise<Image[]> => {
  const res = await api.get("/media", {
    params: section ? { section } : {},
  });

  return unwrap<Image[]>(res);
};

/* =========================
   MENUS
========================= */

export const getMenus = async (): Promise<Menu[]> => {
  const res = await api.get("/menus");
  return unwrap<Menu[]>(res);
};

export const createMenu = async (data: {
  name: string;
  slug: string;
  position: number;
  is_active: boolean;
}) => {
  return api.post("/menus", {
    ...data,
    slug: data.slug.replace("/", ""),
  });
};

export const updateMenu = async (
  id: number,
  data: {
    name: string;
    slug: string;
    position: number;
    is_active: boolean;
  }
) => {
  return api.put(`/menus/${id}`, {
    ...data,
    slug: data.slug.replace("/", ""),
  });
};

export const deleteMenu = async (id: number) => {
  return api.delete(`/menus/${id}`);
};

/* =========================
   PROGRAMMES (NEW)
========================= */

export const getProgrammes = async (
  type: "UG" | "PG"
): Promise<Programme[]> => {
  const res = await api.get(`/programmes?type=${type}`);
  return unwrap<Programme[]>(res);
};

/* =========================
   EXPORT
========================= */

export default api;