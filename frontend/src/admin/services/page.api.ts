import api from "@/api/axios";

/* =========================
   TYPES
========================= */

export interface Page {
  id: number;
  menu_id: number | null;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

/* =========================
   RESPONSE TYPE (IMPORTANT)
========================= */

interface ApiResponse<T> {
  data: T;
}

/* =========================
   DTOs
========================= */

export interface CreatePageDTO {
  title: string;
  slug: string;
  content?: string;
  status?: "draft" | "published";
  menu_id?: number | null;
}

export interface UpdatePageDTO {
  title?: string;
  slug?: string;
  content?: string;
  status?: "draft" | "published";
  menu_id?: number | null;
}

/* =========================
   GET ALL PAGES
========================= */

export const getPages = async (): Promise<Page[]> => {
  const res = await api.get<Page[] | ApiResponse<Page[]>>("/pages");

  // ✅ SAFE TYPE CHECK
  if (Array.isArray(res.data)) {
    return res.data;
  }

  return res.data.data;
};

/* =========================
   GET PAGE BY ID
========================= */

export const getPageById = async (id: number): Promise<Page> => {
  const res = await api.get<Page>(`/pages/${id}`);
  return res.data;
};

/* =========================
   GET PAGE BY SLUG
========================= */

export const getPageBySlug = async (slug: string): Promise<Page> => {
  const res = await api.get<Page | ApiResponse<Page>>(
    `/pages/slug/${slug}`
  );

  return "data" in res.data ? res.data.data : res.data;
};

/* =========================
   CREATE PAGE
========================= */

export const createPage = async (
  data: CreatePageDTO
): Promise<Page> => {
  const res = await api.post<Page>("/pages", {
    ...data,
    slug: data.slug.replace(/^\/+/, ""),
  });

  return res.data;
};

/* =========================
   UPDATE PAGE
========================= */

export const updatePage = async (
  id: number,
  data: UpdatePageDTO
): Promise<Page> => {
  const res = await api.put<Page>(`/pages/${id}`, {
    ...data,
    slug: data.slug ? data.slug.replace(/^\/+/, "") : undefined,
  });

  return res.data;
};

/* =========================
   DELETE PAGE
========================= */

export const deletePage = async (id: number): Promise<void> => {
  await api.delete(`/pages/${id}`);
};

/* =========================
   REORDER PAGES
========================= */

export const reorderPages = async (
  pages: { id: number; sort_order: number }[]
): Promise<void> => {
  await api.put("/pages/reorder", { pages });
};

/* =========================
   PUBLISH HELPERS
========================= */

export const publishPage = async (id: number): Promise<Page> => {
  return updatePage(id, { status: "published" });
};

export const unpublishPage = async (id: number): Promise<Page> => {
  return updatePage(id, { status: "draft" });
};

/* =========================
   FILTER HELPERS
========================= */

export const getPublishedPages = async (): Promise<Page[]> => {
  const pages = await getPages();
  return pages.filter((p) => p.status === "published");
};