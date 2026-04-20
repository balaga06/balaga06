import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, ArrowLeft, Loader2, ExternalLink, } from "lucide-react";
import toast from "react-hot-toast";
import { getPages, createPage, updatePage, deletePage, } from "@/admin/services/page.api";
import BlockEditor from "@/admin/components/BlockEditor";
export default function CustomPages() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("list");
    const [editingPage, setEditingPage] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    /* ================= FORM ================= */
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState("draft");
    const [editorData, setEditorData] = useState({ blocks: [] });
    /* ================= FETCH ================= */
    const fetchPages = async () => {
        try {
            setLoading(true);
            const data = await getPages(); // ✅ always array
            setPages(data);
        }
        catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch pages");
        }
        finally {
            setLoading(false);
        }
    };
    /* ✅ CALL API */
    useEffect(() => {
        fetchPages();
    }, []);
    /* ================= EDITOR ================= */
    const openEditor = (page) => {
        if (page) {
            setEditingPage(page);
            setTitle(page.title);
            setSlug(page.slug);
            setStatus(page.status);
            try {
                const parsed = typeof page.content === "string"
                    ? JSON.parse(page.content)
                    : page.content;
                setEditorData(parsed?.blocks ? parsed : { blocks: [] });
            }
            catch {
                setEditorData({ blocks: [] });
            }
        }
        else {
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
            }
            else {
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
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Save failed");
        }
        finally {
            setSubmitting(false);
        }
    };
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this page?"))
            return;
        try {
            await deletePage(id);
            toast.success("Deleted successfully");
            fetchPages();
        }
        catch {
            toast.error("Delete failed");
        }
    };
    /* ================= UTIL ================= */
    const autoSlug = (value) => {
        setTitle(value);
        if (!editingPage) {
            setSlug(value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-"));
        }
    };
    const formatDate = (date) => new Date(date).toLocaleDateString("en-IN");
    /* ================= LOADING ================= */
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[40vh]", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-indigo-600" }) }));
    }
    /* ================= LIST ================= */
    if (view === "list") {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-slate-800", children: "IQAC Pages" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage dynamic pages" })] }), _jsxs("button", { onClick: () => openEditor(), className: "flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg", children: [_jsx(Plus, { size: 16 }), " Create Page"] })] }), pages.length === 0 ? (_jsx("div", { className: "text-center py-10 text-gray-500", children: "No pages found" })) : (_jsx("div", { className: "bg-white border rounded-xl overflow-hidden", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-slate-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left", children: "Title" }), _jsx("th", { className: "px-6 py-3", children: "Slug" }), _jsx("th", { className: "px-6 py-3", children: "Status" }), _jsx("th", { className: "px-6 py-3", children: "Updated" }), _jsx("th", { className: "px-6 py-3 text-center", children: "Actions" })] }) }), _jsx("tbody", { children: pages.map((p) => (_jsxs("tr", { className: "border-t hover:bg-slate-50", children: [_jsx("td", { className: "px-6 py-4 font-medium", children: p.title }), _jsxs("td", { className: "px-6 py-4 text-xs font-mono", children: ["/pages/", p.slug] }), _jsx("td", { className: "px-6 py-4", children: _jsx("span", { className: `px-2 py-1 text-xs rounded ${p.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"}`, children: p.status }) }), _jsx("td", { className: "px-6 py-4 text-slate-500", children: formatDate(p.updated_at) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("div", { className: "flex justify-center gap-3", children: [_jsx("button", { onClick: () => openEditor(p), children: _jsx(Pencil, { size: 16 }) }), p.status === "published" && (_jsx("a", { href: `/pages/${p.slug}`, target: "_blank", children: _jsx(ExternalLink, { size: 16 }) })), _jsx("button", { onClick: () => handleDelete(p.id), className: "text-red-600", children: _jsx(Trash2, { size: 16 }) })] }) })] }, p.id))) })] }) }))] }));
    }
    /* ================= EDITOR ================= */
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("button", { onClick: closeEditor, className: "flex items-center gap-2", children: [_jsx(ArrowLeft, { size: 16 }), " Back"] }), _jsx("input", { value: title, onChange: (e) => autoSlug(e.target.value), placeholder: "Title", className: "w-full border-b text-xl" }), _jsx("input", { value: slug, onChange: (e) => setSlug(e.target.value), placeholder: "Slug", className: "w-full text-sm text-gray-500" }), _jsx(BlockEditor, { data: editorData, onChange: setEditorData }), _jsx("button", { onClick: handleSave, disabled: submitting, className: "bg-indigo-600 text-white px-4 py-2 rounded", children: submitting ? "Saving..." : "Save" })] }));
}
