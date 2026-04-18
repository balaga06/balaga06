import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Loader2 } from "lucide-react";

interface Programme {
  id: number;
  name: string;
  degree: string;
  duration: string;
  department: string;
  branch_code?: string;
  type: "UG" | "PG";
  is_active: boolean; // ✅ FIXED
}

export default function Programmes() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"UG" | "PG">("UG");

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        // ✅ FIXED API
        const res = await api.get("/programmes/public");

        const data: Programme[] = Array.isArray(res.data)
          ? res.data
          : res.data.data;

        setProgrammes(data);
      } catch (err) {
        console.error("Programmes error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  // ✅ FIXED FILTER
  const filtered = programmes.filter(
    (p) =>
      p.type?.toUpperCase() === activeTab &&
      p.is_active === true
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#0f172a] mb-2">
            Programmes Offered
          </h1>
          <p className="text-gray-500">
            Explore undergraduate and postgraduate programmes
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("UG")}
            className={`px-6 py-2 rounded-lg ${
              activeTab === "UG"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            UG
          </button>

          <button
            onClick={() => setActiveTab("PG")}
            className={`px-6 py-2 rounded-lg ${
              activeTab === "PG"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            PG
          </button>
        </div>

        {/* EMPTY */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No programmes available
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Degree:</strong> {p.degree}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {p.duration}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Department:</strong> {p.department}
                </p>

                <p className="text-sm text-gray-600">
                  <strong>Branch Code:</strong> {p.branch_code || "-"}
                </p>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}