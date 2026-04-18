import api from "@/api/axios";

/* =========================
   TYPES
========================= */

export interface Media {
  id: number;
  file_url: string;
  caption?: string | null;
  section?: string | null;
  category?: string | null;
  created_at: string;
}

/* =========================
   RESPONSE TYPE
========================= */

interface ApiResponse<T> {
  data: T;
}

/* =========================
   HELPER (SAFE RESPONSE)
========================= */

const parseResponse = <T>(res: any): T => {
  if (Array.isArray(res.data)) return res.data;
  return res.data?.data ?? [];
};

/* =========================
   GET ALL MEDIA
========================= */

export const getMedia = async (): Promise<Media[]> => {
  const res = await api.get<Media[] | ApiResponse<Media[]>>("/media");
  return parseResponse<Media[]>(res);
};

/* =========================
   GET BY SECTION
========================= */

export const getMediaBySection = async (
  section: string
): Promise<Media[]> => {
  const res = await api.get<Media[] | ApiResponse<Media[]>>("/media", {
    params: { section },
  });
  return parseResponse<Media[]>(res);
};

/* =========================
   GET BY CATEGORY
========================= */

export const getMediaByCategory = async (
  category: string
): Promise<Media[]> => {
  const res = await api.get<Media[] | ApiResponse<Media[]>>("/media", {
    params: { category },
  });
  return parseResponse<Media[]>(res);
};

/* =========================
   GET SINGLE MEDIA
========================= */

export const getMediaById = async (id: number): Promise<Media> => {
  const res = await api.get<Media>(`/media/${id}`);
  return res.data;
};

/* =========================
   CREATE MEDIA (FINAL FIX)
========================= */

export const createMedia = async ({
  file,
  caption,
  section,
  category,
}: {
  file: File;
  caption?: string;
  section: string;
  category: string;
}): Promise<Media> => {
  const formData = new FormData();

  // ✅ MUST MATCH BACKEND (multer.single("image"))
  formData.append("image", file);

  // ✅ SAFE NULL HANDLING
  formData.append("caption", caption ?? "");
  formData.append("section", section);
  formData.append("category", category);

  const res = await api.post<Media>("/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/* =========================
   UPDATE MEDIA (FINAL FIX)
========================= */

export const updateMedia = async (
  id: number,
  {
    file,
    caption,
    section,
    category,
  }: {
    file?: File;
    caption?: string;
    section?: string;
    category?: string;
  }
): Promise<Media> => {
  const formData = new FormData();

  // ✅ FILE (OPTIONAL)
  if (file) {
    formData.append("image", file);
  }

  // ✅ SAFE APPEND
  if (caption !== undefined) formData.append("caption", caption);
  if (section !== undefined) formData.append("section", section);
  if (category !== undefined) formData.append("category", category);

  const res = await api.put<Media>(`/media/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

/* =========================
   DELETE MEDIA
========================= */

export const deleteMedia = async (id: number): Promise<void> => {
  await api.delete(`/media/${id}`);
};