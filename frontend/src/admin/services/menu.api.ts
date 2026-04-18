import api from "@/api/axios";

/* =========================
   TYPES
========================= */

export interface Menu {
  id: number;
  name: string;
  slug: string;
  type: "page" | "docs" | "external";
  link?: string | null;
  position: number;
  is_active: boolean;
}

/* =========================
   GET MENUS
========================= */

export const getMenus = async (): Promise<Menu[]> => {
  const res = await api.get("/menus");

  const data = Array.isArray(res.data) ? res.data : res.data.data;

  // ✅ normalize type (very important safety)
  return data.map((m: any) => ({
    ...m,
    type: m.type || "page", // fallback
  }));
};

/* =========================
   CREATE MENU
========================= */

export const createMenu = async (data: {
  name: string;
  slug: string;
  type: "page" | "docs" | "external";
  link?: string;
  position: number;
  is_active: boolean;
}) => {
  return api.post("/menus", {
    ...data,
    slug: data.slug.replace(/^\/+/, ""),
  });
};

/* =========================
   UPDATE MENU
========================= */

export const updateMenu = async (
  id: number,
  data: {
    name: string;
    slug: string;
    type: "page" | "docs" | "external";
    link?: string;
    position: number;
    is_active: boolean;
  }
) => {
  return api.put(`/menus/${id}`, {
    ...data,
    slug: data.slug.replace(/^\/+/, ""),
  });
};

/* =========================
   DELETE MENU
========================= */

export const deleteMenu = async (id: number) => {
  return api.delete(`/menus/${id}`);
};

/* =========================
   HELPERS
========================= */

/* ✅ Active menus (navbar) */
export const getActiveMenus = async (): Promise<Menu[]> => {
  const menus = await getMenus();

  return menus
    .filter((m) => m.is_active)
    .sort((a, b) => a.position - b.position);
};

/* ✅ FIXED LINK RESOLVER */
export const resolveMenuLink = (menu: Menu): string => {
  if (menu.type === "page") {
    return `/pages/${menu.slug}`;
  }

  if (menu.type === "docs") {
    return `/documents/${menu.slug}`; // ✅ FIXED
  }

  if (menu.type === "external") {
    return menu.link || "#";
  }

  return "#";
};