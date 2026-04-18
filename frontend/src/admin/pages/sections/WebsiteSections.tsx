import { useState, useEffect } from "react";
import { Pencil, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllSections,
  type PageSection,
} from "@/admin/services/pageSection.api";

import SectionEditorModal from "./SectionEditorModal";

/* ================= GROUP LABELS ================= */
const groupLabels: Record<string, string> = {
  home: "Home Page",
  global: "Global (Header/Footer)",
  contact: "Contact Page",
  iqac: "IQAC Page",
};

export default function WebsiteSections() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingSection, setEditingSection] =
    useState<PageSection | null>(null);

  /* ================= FETCH ================= */
  const fetchSections = async () => {
    try {
      setLoading(true);

      const data: PageSection[] = await getAllSections(); // ✅ FIXED
      setSections(data);

    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ VERY IMPORTANT (MISSING FIX) */
  useEffect(() => {
    fetchSections();
  }, []);

  /* ================= DATE FORMAT ================= */
  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* ================= GROUP ================= */
  const grouped = sections.reduce<Record<string, PageSection[]>>(
    (acc, s) => {
      if (!acc[s.page_group]) acc[s.page_group] = [];
      acc[s.page_group].push(s);
      return acc;
    },
    {}
  );

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Website Sections
        </h2>
        <p className="text-sm text-slate-500">
          Manage homepage, IQAC, and global sections dynamically
        </p>
      </div>

      {/* EMPTY */}
      {sections.length === 0 && (
        <div className="text-center py-10 text-slate-500">
          No sections found
        </div>
      )}

      {/* GROUPS */}
      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="space-y-3">

          <h3 className="text-md font-semibold text-slate-700">
            {groupLabels[group] || group}
          </h3>

          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left">Section</th>
                  <th className="px-6 py-3 text-left">Key</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Updated</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {items.map((section) => (
                  <tr key={section.id} className="hover:bg-slate-50">

                    <td className="px-6 py-4 font-medium">
                      {section.title}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {section.section_key}
                    </td>

                    <td className="px-6 py-4">
                      {section.is_active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                          <Eye size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-gray-100 text-gray-500">
                          <EyeOff size={12} /> Hidden
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {formatDate(section.updated_at)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setEditingSection(section)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {items.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No sections found
              </div>
            )}
          </div>
        </div>
      ))}

      {/* MODAL */}
      {editingSection && (
        <SectionEditorModal
          section={editingSection}
          onClose={() => setEditingSection(null)}
          onSaved={() => {
            setEditingSection(null);
            fetchSections(); // ✅ refresh
          }}
        />
      )}
    </div>
  );
}