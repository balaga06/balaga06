import { useEffect, useState } from "react";
import { Users, X, Loader2, ZoomIn } from "lucide-react";
import { getMedia } from "@/admin/services/media.api";

const BASE_URL = "http://localhost:5000";

/* ================= TYPES ================= */
interface MediaItem {
  id?: number;
  file_url?: string | null;
  file_path?: string | null;
  url?: string | null;
  path?: string | null;
  caption?: string | null;
  section?: string | null;
  category?: string | null;
}

/* ================= COMPONENT ================= */
export default function IQACCommittee() {
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);
  const [filtered, setFiltered] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const [type, setType] = useState("committee");

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const media = (await getMedia()) as MediaItem[];

        if (!Array.isArray(media)) {
          setAllMedia([]);
          return;
        }

        setAllMedia(media);
      } catch (err) {
        console.error(err);
        setAllMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaData();
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {
    const result = allMedia.filter(
      (m) =>
        (m.section || "").toLowerCase() === "iqac" &&
        (m.category || "").toLowerCase() === type
    );

    setFiltered(result);
  }, [allMedia, type]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-700" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full mb-4">
          <Users className="w-4 h-4" />
          IQAC
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          IQAC {type === "gallery" ? "Gallery" : "Committee"}
        </h1>

        <p className="text-gray-500">
          {type === "gallery"
            ? "Explore IQAC activities and events."
            : "Meet our committee members."}
        </p>

        {/* DROPDOWN */}
        <div className="mt-6">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="gallery">IQAC Gallery</option>
            <option value="committee">IQAC Committee</option>
          </select>
        </div>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500">
          No data available
        </p>
      )}

      {/* ================= COMMITTEE LAYOUT (UPDATED) ================= */}
      {type === "committee" && (
        <div className="flex flex-col items-center gap-10 px-6">
          {filtered.map((item, index) => {
            const [name, role] = (item.caption || "").split("-");

            const imgPath =
              item.file_url || item.file_path || item.url || item.path || "";

            const fullUrl = imgPath.startsWith("http")
              ? imgPath
              : `${BASE_URL}${imgPath}`;

            return (
              <div
                key={item.id || index}
                onClick={() => setSelected(item)}
                className="w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
              >
                {/* IMAGE */}
                <div className="h-80 overflow-hidden">
                  <img
                    src={fullUrl || "/images/default-avatar.png"}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                {/* INFO */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {name || "Member"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {role || ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= GALLERY (UNCHANGED) ================= */}
      {type === "gallery" && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((item, index) => {
            const imgPath =
              item.file_url || item.file_path || item.url || item.path || "";

            const fullUrl = imgPath.startsWith("http")
              ? imgPath
              : `${BASE_URL}${imgPath}`;

            return (
              <div
                key={item.id || index}
                onClick={() => setSelected(item)}
                className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={fullUrl || "/images/default-avatar.png"}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <div className="bg-black/60 p-2 rounded-full">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= LIGHTBOX ================= */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <button className="absolute top-6 right-6 text-white">
            <X className="w-6 h-6" />
          </button>

          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={
                (selected.file_url ||
                  selected.file_path ||
                  selected.url ||
                  selected.path ||
                  "").startsWith("http")
                  ? selected.file_url ||
                    selected.file_path ||
                    selected.url ||
                    selected.path ||
                    ""
                  : `${BASE_URL}${
                      selected.file_url ||
                      selected.file_path ||
                      selected.url ||
                      selected.path ||
                      ""
                    }`
              }
              className="max-h-[80vh] rounded-lg"
            />

            {selected.caption && (
              <p className="text-white text-center mt-4">
                {selected.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}