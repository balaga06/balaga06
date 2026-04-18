import api from "@/api/axios";

/* =========================
   TYPES (FINAL ✅)
========================= */

export interface Notification {
  id: number;
  title: string;

  // 🔗 File / Link
  link?: string | null;
  file_url?: string | null;

  // 📂 Category + Filters
  category?: string | null;
  type?: string | null;
  programme?: string | null;
  branch?: string | null;

  // 📅 Dates
  starts_at?: string | null;
  ends_at?: string | null;

  // ⚙️ Controls
  is_scrolling?: boolean; // scroll control
  is_active: boolean;     // website control

  created_at: string;
}

/* =========================
   RESPONSE TYPE
========================= */

type ApiResponse<T> = {
  data: T;
};

/* =========================
   SAFE DATA EXTRACTOR 🔥
========================= */

const extractData = <T>(res: {
  data: T | ApiResponse<T> | null;
}): T => {
  if (!res || res.data == null) {
    return [] as unknown as T;
  }

  if (Array.isArray(res.data)) {
    return res.data;
  }

  if (
    typeof res.data === "object" &&
    "data" in res.data &&
    res.data.data != null
  ) {
    return res.data.data;
  }

  return res.data as T;
};

/* =========================
   GET ALL (ADMIN)
========================= */

export const getNotifications = async (): Promise<Notification[]> => {
  const res = await api.get<
    Notification[] | ApiResponse<Notification[]> | null
  >("/notifications");

  return extractData<Notification[]>(res);
};

/* =========================
   GET PUBLIC
========================= */

export const getPublicNotifications = async (): Promise<Notification[]> => {
  const res = await api.get<
    Notification[] | ApiResponse<Notification[]> | null
  >("/notifications/public");

  return extractData<Notification[]>(res);
};

/* =========================
   GET SINGLE
========================= */

export const getNotificationById = async (
  id: number
): Promise<Notification> => {
  const res = await api.get<Notification | null>(
    `/notifications/${id}`
  );

  if (!res.data) {
    throw new Error("Notification not found");
  }

  return res.data;
};

/* =========================
   CREATE
========================= */

export const createNotification = async (
  formData: FormData
): Promise<Notification> => {
  const res = await api.post<Notification | null>(
    "/notifications",
    formData
  );

  if (!res.data) {
    throw new Error("Failed to create notification");
  }

  return res.data;
};

/* =========================
   UPDATE
========================= */

export const updateNotification = async (
  id: number,
  formData: FormData
): Promise<Notification> => {
  const res = await api.put<Notification | null>(
    `/notifications/${id}`,
    formData
  );

  if (!res.data) {
    throw new Error("Failed to update notification");
  }

  return res.data;
};

/* =========================
   DELETE
========================= */

export const deleteNotification = async (
  id: number
): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};

/* =========================
   HELPERS (FINAL LOGIC ✅)
========================= */

/* ✅ WEBSITE (documents/pages) */
export const getActiveNotifications = async (): Promise<Notification[]> => {
  const data = await getPublicNotifications();

  return data
    .filter((n) => n.is_active) // show only active
    .sort((a, b) => b.id - a.id);
};

/* ✅ CATEGORY FILTER (website only) */
export const getNotificationsByCategory = async (
  category: string
): Promise<Notification[]> => {
  const data = await getPublicNotifications();

  return data
    .filter(
      (n) =>
        n.is_active &&
        n.category?.toLowerCase().trim() ===
          category.toLowerCase().trim()
    )
    .sort((a, b) => b.id - a.id);
};

/* ✅ SCROLL BAR ONLY */
export const getScrollingNotifications = async (): Promise<Notification[]> => {
  const data = await getPublicNotifications();

  return data
    .filter(
      (n) =>
        n.is_active &&                 // must be visible
        (n.is_scrolling ?? true)       // scroll control
    )
    .sort((a, b) => b.id - a.id);
};