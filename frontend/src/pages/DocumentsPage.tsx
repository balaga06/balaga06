import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, Eye, Loader2 } from "lucide-react";
import api from "@/api/axios";

/* 🔥 IMPORT SYLLABUS PAGE */
import SyllabusPage from "./SyllabusPage";

const BASE_URL = "http://localhost:5000";

/* ================= TYPES ================= */
interface DocumentItem {
  id: number;
  title: string;
  link?: string | null;
  file_url?: string | null;
  category?: string | null;
  created_at: string;
}

/* ================= COMPONENT ================= */
export default function DocumentsPage({
  category,
}: {
  category?: string;
}) {
  const { slug } = useParams<{ slug: string }>();

  const finalCategory = (category || slug || "").toLowerCase();

  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!finalCategory) return;

    const fetchDocs = async () => {
      try {
        const res = await api.get("/notifications/public");

        const data: DocumentItem[] = Array.isArray(res.data)
          ? res.data
          : [];

        const categoryMap: Record<string, string[]> = {
          "minutes-meetings": ["minutes", "meetings", "minutes-meetings"],
          reports: ["reports"],
          naac: ["naac"],
          nirf: ["nirf"],
          syllabus: ["syllabus"], // keep this
        };

        const filtered = data.filter((item) => {
          if (!item.category) return false;

          const itemCategory = item.category.toLowerCase();
          const allowed = categoryMap[finalCategory] || [finalCategory];

          return allowed.includes(itemCategory);
        });

        const uniqueDocs = filtered.filter(
          (doc, index, self) =>
            index === self.findIndex((d) => d.id === doc.id)
        );

        const sorted = uniqueDocs.sort((a, b) => b.id - a.id);

        setDocs(sorted);
      } catch (err) {
        console.error("Documents fetch error:", err);
        setDocs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [finalCategory]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  /* 🔥 VERY IMPORTANT: SYLLABUS OVERRIDE */
  if (finalCategory === "syllabus") {
    return <SyllabusPage />;
  }

  /* ================= UI ================= */
  return (
    <div className="bg-[#faf9f6] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold uppercase text-[#0f172a]">
            {finalCategory.replace("-", " ")}
          </h1>
          <p className="text-gray-500">Documents & Reports</p>
        </div>

        {docs.length === 0 ? (
          <p className="text-center text-gray-500">
            No documents available
          </p>
        ) : (
          <div className="space-y-4">

            {docs.map((item) => {
              const fileUrl: string | undefined = item.file_url
                ? `${BASE_URL}${item.file_url}`
                : item.link || undefined;

              const viewUrl: string | undefined =
                fileUrl &&
                (fileUrl.endsWith(".doc") ||
                  fileUrl.endsWith(".docx"))
                  ? `https://docs.google.com/gview?url=${fileUrl}&embedded=true`
                  : fileUrl;

              return (
                <div
                  key={item.id}
                  className="bg-white px-6 py-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center"
                >
                  {/* TITLE */}
                  <h3 className="font-semibold text-lg text-[#0f172a]">
                    {item.title}
                  </h3>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-6">

                    {/* DATE */}
                    <p className="text-sm text-gray-400 whitespace-nowrap">
                      {new Date(item.created_at).toDateString()}
                    </p>

                    {/* BUTTONS */}
                    <div className="flex gap-2">

                      {/* VIEW */}
                      {fileUrl && viewUrl && (
                        <a href={viewUrl} target="_blank" rel="noreferrer">
                          <button className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm">
                            <Eye size={14} /> View
                          </button>
                        </a>
                      )}

                      {/* DOWNLOAD */}
                      {fileUrl && (
                        <a href={fileUrl} download>
                          <button className="border border-gray-300 px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-gray-100">
                            <Download size={14} /> Download
                          </button>
                        </a>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}