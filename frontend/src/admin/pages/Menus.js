import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { getMenus, createMenu, deleteMenu, updateMenu, } from "@/admin/services/menu.api";
const initialFormData = {
    name: "",
    slug: "",
    type: "page",
    link: "",
    position: 1,
    is_active: true,
};
export default function Menus() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    /* ================= FETCH MENUS ================= */
    const loadMenus = async () => {
        try {
            setLoading(true);
            const data = await getMenus(); // ✅ expects Menu[]
            const sortedMenus = [...data].sort((a, b) => a.position - b.position);
            setMenus(sortedMenus);
        }
        catch (error) {
            console.error("Failed to load menus:", error);
            toast.error("Failed to load menus");
        }
        finally {
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
    const autoSlug = (value) => {
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
    const handleEdit = (menu) => {
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
    const handleSubmit = async (e) => {
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
                slug: formData.type === "external"
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
            }
            else {
                await createMenu(payload);
                toast.success("Menu created successfully");
            }
            closeModal();
            await loadMenus();
        }
        catch (error) {
            console.error("Save menu error:", error);
            toast.error(error?.response?.data?.message || "Failed to save menu");
        }
        finally {
            setSubmitting(false);
        }
    };
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this menu?"))
            return;
        try {
            await deleteMenu(id);
            toast.success("Menu deleted successfully");
            await loadMenus();
        }
        catch (error) {
            console.error("Delete menu error:", error);
            toast.error("Failed to delete menu");
        }
    };
    /* ================= UI ================= */
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-800", children: "Menu Management" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage navbar items for the main website" })] }), _jsxs("button", { onClick: openAddModal, className: "inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700", children: [_jsx(Plus, { size: 18 }), "Add Menu"] })] }), _jsx("div", { className: "overflow-x-auto rounded-xl border border-slate-200 bg-white", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-slate-100 text-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left", children: "Menu Name" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Slug / Link" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Type" }), _jsx("th", { className: "px-6 py-3 text-center", children: "Position" }), _jsx("th", { className: "px-6 py-3 text-center", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-center", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-200", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-6 py-8 text-center", children: _jsx(Loader2, { className: "mx-auto h-5 w-5 animate-spin text-indigo-600" }) }) })) : menus.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-6 py-8 text-center text-slate-500", children: "No menus found" }) })) : (menus.map((menu) => (_jsxs("tr", { className: "hover:bg-slate-50", children: [_jsx("td", { className: "px-6 py-4 font-medium text-slate-800", children: menu.name }), _jsx("td", { className: "px-6 py-4 font-mono text-xs text-slate-500", children: menu.type === "external"
                                            ? menu.link || "-"
                                            : menu.type === "docs"
                                                ? `/documents/${menu.slug}`
                                                : `/pages/${menu.slug}` }), _jsx("td", { className: "px-6 py-4 capitalize text-slate-600", children: menu.type || "page" }), _jsx("td", { className: "px-6 py-4 text-center", children: menu.position }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsx("span", { className: `rounded-full px-2 py-1 text-xs font-medium ${menu.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"}`, children: menu.is_active ? "Active" : "Inactive" }) }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex justify-center gap-3", children: [_jsx("button", { onClick: () => handleEdit(menu), className: "rounded p-2 text-indigo-600 hover:bg-indigo-50", title: "Edit menu", children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(menu.id), className: "rounded p-2 text-red-600 hover:bg-red-50", title: "Delete menu", children: _jsx(Trash2, { size: 16 }) })] }) })] }, menu.id)))) })] }) }), showModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4", children: _jsxs("div", { className: "relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl", children: [_jsx("button", { onClick: closeModal, className: "absolute right-4 top-4 text-slate-500 hover:text-red-500", children: _jsx(X, { size: 18 }) }), _jsx("h2", { className: "mb-4 text-lg font-semibold text-slate-800", children: isEditing ? "Edit Menu" : "Add Menu" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Menu Name" }), _jsx("input", { type: "text", placeholder: "Enter menu name", className: "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", value: formData.name, onChange: (e) => {
                                                const name = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    name,
                                                    slug: !isEditing && prev.type !== "external"
                                                        ? autoSlug(name)
                                                        : prev.slug,
                                                }));
                                            }, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Menu Type" }), _jsxs("select", { className: "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", value: formData.type, onChange: (e) => setFormData((prev) => ({
                                                ...prev,
                                                type: e.target.value,
                                                slug: e.target.value === "external"
                                                    ? ""
                                                    : prev.slug || autoSlug(prev.name),
                                                link: e.target.value === "external" ? prev.link : "",
                                            })), children: [_jsx("option", { value: "page", children: "Page" }), _jsx("option", { value: "docs", children: "Documents" }), _jsx("option", { value: "external", children: "External Link" })] })] }), formData.type !== "external" && (_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Slug" }), _jsx("input", { type: "text", placeholder: "about-iqac", className: "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", value: formData.slug, onChange: (e) => setFormData((prev) => ({
                                                ...prev,
                                                slug: e.target.value
                                                    .toLowerCase()
                                                    .replace(/^\/+/, "")
                                                    .replace(/[^a-z0-9-]/g, "-")
                                                    .replace(/-+/g, "-"),
                                            })), required: true }), _jsxs("p", { className: "mt-1 text-xs text-slate-500", children: ["This will open as", " ", formData.type === "docs"
                                                    ? `/documents/${formData.slug || "your-slug"}`
                                                    : `/pages/${formData.slug || "your-slug"}`] })] })), formData.type === "external" && (_jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "External Link" }), _jsx("input", { type: "url", placeholder: "https://example.com", className: "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", value: formData.link, onChange: (e) => setFormData((prev) => ({
                                                ...prev,
                                                link: e.target.value,
                                            })), required: true })] })), _jsxs("div", { children: [_jsx("label", { className: "mb-1 block text-sm font-medium text-slate-700", children: "Position" }), _jsx("input", { type: "number", min: 1, className: "w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500", value: formData.position, onChange: (e) => setFormData((prev) => ({
                                                ...prev,
                                                position: Number(e.target.value),
                                            })) })] }), _jsxs("label", { className: "flex items-center gap-2 text-sm text-slate-700", children: [_jsx("input", { type: "checkbox", checked: formData.is_active, onChange: (e) => setFormData((prev) => ({
                                                ...prev,
                                                is_active: e.target.checked,
                                            })) }), "Active"] }), _jsxs("button", { type: "submit", disabled: submitting, className: "flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-60", children: [submitting && _jsx(Loader2, { size: 16, className: "animate-spin" }), isEditing ? "Update Menu" : "Save Menu"] })] })] }) }))] }));
}
