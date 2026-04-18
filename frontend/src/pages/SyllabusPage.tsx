import { useEffect, useState } from "react";
import { Download, Eye, Loader2 } from "lucide-react";
import api from "@/api/axios";

const BASE_URL = "http://localhost:5000";

/* ================= TYPES ================= */
interface Doc {
  id: number;
  title: string;
  file_url?: string;
  type?: string;
  programme?: string;
  branch?: string;
  created_at: string;
}

export default function SyllabusPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState<"UG" | "PG" | "">("");
  const [programme, setProgramme] = useState("");
  const [branch, setBranch] = useState("");

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get(
          "/notifications/public?category=syllabus"
        );
        setDocs(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setDocs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  /* ================= DYNAMIC PROGRAMMES ================= */
  const programmes = [
    ...new Set(
      docs
        .filter((d) => (type ? d.type === type : true))
        .map((d) => d.programme)
        .filter(Boolean)
    ),
  ];

  /* ================= DYNAMIC BRANCHES ================= */
  const branches = [
    ...new Set(
      docs
        .filter((d) =>
          programme ? d.programme === programme : true
        )
        .map((d) => d.branch)
        .filter(Boolean)
    ),
  ];

  /* ================= FILTER ================= */
  const filteredDocs = docs
    .filter((d) => (type ? d.type === type : true))
    .filter((d) =>
      programme ? d.programme === programme : true
    )
    .filter((d) => (branch ? d.branch === branch : true))
    .sort((a, b) => b.id - a.id);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">SYLLABUS</h1>
        </div>

        {/* ================= UG / PG BUTTONS ================= */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setType("UG");
              setProgramme("");
              setBranch("");
            }}
            className={`px-6 py-2 rounded ${
              type === "UG"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            UG
          </button>

          <button
            onClick={() => {
              setType("PG");
              setProgramme("");
              setBranch("");
            }}
            className={`px-6 py-2 rounded ${
              type === "PG"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            PG
          </button>
        </div>

        {/* ================= DROPDOWNS ================= */}
        {type && (
          <div className="flex gap-4 justify-center mb-8 flex-wrap">

            {/* PROGRAMME */}
            <select
              value={programme}
              onChange={(e) => {
                setProgramme(e.target.value);
                setBranch("");
              }}
              className="border p-2 rounded"
            >
              <option value="">Select Programme</option>
              {programmes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            {/* BRANCH */}
            {programme && (
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* ================= DOCUMENTS ================= */}
        {filteredDocs.length === 0 ? (
          <p className="text-center text-gray-500">
            No syllabus available
          </p>
        ) : (
          <div className="space-y-4">
            {filteredDocs.map((item) => {
              const fileUrl = item.file_url
                ? `${BASE_URL}${item.file_url}`
                : undefined;

              const viewUrl =
                fileUrl &&
                (fileUrl.endsWith(".doc") ||
                  fileUrl.endsWith(".docx"))
                  ? `https://docs.google.com/gview?url=${fileUrl}&embedded=true`
                  : fileUrl;

              return (
                <div
                  key={item.id}
                  className="bg-white px-6 py-4 border rounded flex justify-between items-center"
                >
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <div className="flex gap-2">
                    {viewUrl && (
                      <a href={viewUrl} target="_blank">
                        <button className="bg-black text-white px-3 py-1 rounded flex gap-1 items-center">
                          <Eye size={14} /> View
                        </button>
                      </a>
                    )}

                    {fileUrl && (
                      <a href={fileUrl} download>
                        <button className="border px-3 py-1 rounded flex gap-1 items-center">
                          <Download size={14} /> Download
                        </button>
                      </a>
                    )}
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