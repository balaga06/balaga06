import { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  ArrowLeft,
  Loader2,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";
import type { OutputData } from "@editorjs/editorjs";

import {
  getPages,
  createPage,
  updatePage,
  deletePage,
  type Page,
} from "@/admin/services/page.api";

import BlockEditor from "@/admin/components/BlockEditor";

type View = "list" | "editor";

export default function CustomPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<View>("list");
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  /* ================= FORM ================= */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [editorData, setEditorData] = useState<OutputData>({ blocks: [] });

  /* ================= FETCH ================= */
  const fetchPages = async () => {
    try {
      setLoading(true);

      const data: Page[] = await getPages(); // ✅ always array
      setPages(data);

    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch pages");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ CALL API */
  useEffect(() => {
    fetchPages();
  }, []);

  /* ================= EDITOR ================= */
  const openEditor = (page?: Page) => {
    if (page) {
      setEditingPage(page);
      setTitle(page.title);
      setSlug(page.slug);
      setStatus(page.status);

      try {
        const parsed =
          typeof page.content === "string"
            ? JSON.parse(page.content)
            : page.content;

        setEditorData(parsed?.blocks ? parsed : { blocks: [] });
      } catch {
        setEditorData({ blocks: [] });
      }
    } else {
      resetForm();
    }

    setView("editor");
  };

  const resetForm = () => {
    setEditingPage(null);
    setTitle("");
    setSlug("");
    setStatus("draft");
    setEditorData({ blocks: [] });
  };

  const closeEditor = () => {
    setView("list");
    resetForm();
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    setSubmitting(true);

    try {
      const content = JSON.stringify(editorData);

      if (editingPage) {
        await updatePage(editingPage.id, {
          title,
          slug,
          content,
          status,
        });
        toast.success("Page updated");
      } else {
        await createPage({
          title,
          slug,
          content,
          status,
        });
        toast.success("Page created");
      }

      await fetchPages();
      closeEditor();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this page?")) return;

    try {
      await deletePage(id);
      toast.success("Deleted successfully");
      fetchPages();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= UTIL ================= */
  const autoSlug = (value: string) => {
    setTitle(value);

    if (!editingPage) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
      );
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN");

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  /* ================= LIST ================= */
  if (view === "list") {
    return (
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              IQAC Pages
            </h2>
            <p className="text-sm text-slate-500">
              Manage dynamic pages
            </p>
          </div>

          <button
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={16} /> Create Page
          </button>
        </div>

        {/* EMPTY */}
        {pages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No pages found
          </div>
        ) : (
          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left">Title</th>
                  <th className="px-6 py-3">Slug</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Updated</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pages.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium">{p.title}</td>

                    <td className="px-6 py-4 text-xs font-mono">
                      /pages/{p.slug}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          p.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(p.updated_at)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => openEditor(p)}>
                          <Pencil size={16} />
                        </button>

                        {p.status === "published" && (
                          <a href={`/pages/${p.slug}`} target="_blank">
                            <ExternalLink size={16} />
                          </a>
                        )}

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  /* ================= EDITOR ================= */
  return (
    <div className="space-y-6">
      <button onClick={closeEditor} className="flex items-center gap-2">
        <ArrowLeft size={16} /> Back
      </button>

      <input
        value={title}
        onChange={(e) => autoSlug(e.target.value)}
        placeholder="Title"
        className="w-full border-b text-xl"
      />

      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        className="w-full text-sm text-gray-500"
      />

      <BlockEditor data={editorData} onChange={setEditorData} />

      <button
        onClick={handleSave}
        disabled={submitting}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {submitting ? "Saving..." : "Save"}
      </button>
    </div>
  );
}