import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  getMenus,
  createMenu,
  deleteMenu,
  updateMenu,
  type Menu,
} from "@/admin/services/menu.api";

type MenuFormData = {
  name: string;
  slug: string;
  type: "page" | "docs" | "external";
  link: string;
  position: number;
  is_active: boolean;
};

const initialFormData: MenuFormData = {
  name: "",
  slug: "",
  type: "page",
  link: "",
  position: 1,
  is_active: true,
};

export default function Menus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<MenuFormData>(initialFormData);

  /* ================= FETCH MENUS ================= */
  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await getMenus(); // ✅ expects Menu[]
      const sortedMenus = [...data].sort((a, b) => a.position - b.position);
      setMenus(sortedMenus);
    } catch (error) {
      console.error("Failed to load menus:", error);
      toast.error("Failed to load menus");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  /* ================= HELPERS ================= */
  const resetForm = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setEditingId(null);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const autoSlug = (value: string) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const openAddModal = () => {
    resetForm();
    setFormData((prev) => ({
      ...prev,
      position: menus.length > 0 ? Math.max(...menus.map((m) => m.position)) + 1 : 1,
    }));
    setShowModal(true);
  };

  const handleEdit = (menu: Menu) => {
    setIsEditing(true);
    setEditingId(menu.id);
    setFormData({
      name: menu.name,
      slug: menu.slug,
      type: menu.type ?? "page",
      link: menu.link ?? "",
      position: menu.position,
      is_active: menu.is_active,
    });
    setShowModal(true);
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Menu name is required");
      return;
    }

    if (formData.type !== "external" && !formData.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    if (formData.type === "external" && !formData.link.trim()) {
      toast.error("External link is required");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name: formData.name.trim(),
        slug:
          formData.type === "external"
            ? ""
            : formData.slug.trim().replace(/^\/+/, "").replace(/\/+$/, ""),
        type: formData.type,
        link: formData.type === "external" ? formData.link.trim() : "",
        position: Number(formData.position),
        is_active: formData.is_active,
      };

      if (isEditing && editingId !== null) {
        await updateMenu(editingId, payload);
        toast.success("Menu updated successfully");
      } else {
        await createMenu(payload);
        toast.success("Menu created successfully");
      }

      closeModal();
      await loadMenus();
    } catch (error: any) {
      console.error("Save menu error:", error);
      toast.error(error?.response?.data?.message || "Failed to save menu");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this menu?")) return;

    try {
      await deleteMenu(id);
      toast.success("Menu deleted successfully");
      await loadMenus();
    } catch (error) {
      console.error("Delete menu error:", error);
      toast.error("Failed to delete menu");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Menu Management</h1>
          <p className="text-sm text-slate-500">
            Manage navbar items for the main website
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Menu
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-6 py-3 text-left">Menu Name</th>
              <th className="px-6 py-3 text-left">Slug / Link</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-center">Position</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-indigo-600" />
                </td>
              </tr>
            ) : menus.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No menus found
                </td>
              </tr>
            ) : (
              menus.map((menu) => (
                <tr key={menu.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{menu.name}</td>

                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
  {menu.type === "external"
    ? menu.link || "-"
    : menu.type === "docs"
    ? `/documents/${menu.slug}`  
    : `/pages/${menu.slug}`}      
</td>

                  <td className="px-6 py-4 capitalize text-slate-600">
                    {menu.type || "page"}
                  </td>

                  <td className="px-6 py-4 text-center">{menu.position}</td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        menu.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {menu.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(menu)}
                        className="rounded p-2 text-indigo-600 hover:bg-indigo-50"
                        title="Edit menu"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="rounded p-2 text-red-600 hover:bg-red-50"
                        title="Delete menu"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-slate-500 hover:text-red-500"
            >
              <X size={18} />
            </button>

            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              {isEditing ? "Edit Menu" : "Add Menu"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* NAME */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Menu Name
                </label>
                <input
                  type="text"
                  placeholder="Enter menu name"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      name,
                      slug:
                        !isEditing && prev.type !== "external"
                          ? autoSlug(name)
                          : prev.slug,
                    }));
                  }}
                  required
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Menu Type
                </label>
                <select
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.value as "page" | "docs" | "external",
                      slug:
                        e.target.value === "external"
                          ? ""
                          : prev.slug || autoSlug(prev.name),
                      link: e.target.value === "external" ? prev.link : "",
                    }))
                  }
                >
                  <option value="page">Page</option>
                  <option value="docs">Documents</option>
                  <option value="external">External Link</option>
                </select>
              </div>

              {/* SLUG */}
              {formData.type !== "external" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    placeholder="about-iqac"
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/^\/+/, "")
                          .replace(/[^a-z0-9-]/g, "-")
                          .replace(/-+/g, "-"),
                      }))
                    }
                    required
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    This will open as{" "}
                    {formData.type === "docs"
                      ? `/documents/${formData.slug || "your-slug"}`
                      : `/pages/${formData.slug || "your-slug"}`}
                  </p>
                </div>
              )}

              {/* LINK */}
              {formData.type === "external" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    External Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        link: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              )}

              {/* POSITION */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Position
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      position: Number(e.target.value),
                    }))
                  }
                />
              </div>

              {/* ACTIVE */}
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_active: e.target.checked,
                    }))
                  }
                />
                Active
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {isEditing ? "Update Menu" : "Save Menu"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}