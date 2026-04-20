import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Upload, Eye, Pencil, Trash2, Loader2, X, } from "lucide-react";
import toast from "react-hot-toast";
import { getMedia, createMedia, updateMedia, deleteMedia, } from "@/admin/services/media.api";
const BASE_URL = "http://localhost:5000";
export default function Media() {
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [caption, setCaption] = useState("");
    const [type, setType] = useState("gallery");
    const [file, setFile] = useState(null);
    /* ================= FETCH ================= */
    const fetchMedia = async () => {
        try {
            const data = await getMedia();
            setMediaList(data);
        }
        catch {
            toast.error("Failed to fetch media");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMedia();
    }, []);
    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file && !editingItem) {
            toast.error("Please select a file");
            return;
        }
        setSubmitting(true);
        try {
            const payload = {
                file: file || undefined,
                caption: caption.trim(),
                section: "iqac", // ✅ ALWAYS FIXED
                category: type, // ✅ gallery | committee
            };
            if (editingItem) {
                await updateMedia(editingItem.id, payload);
                toast.success("Updated successfully");
            }
            else {
                await createMedia(payload);
                toast.success("Uploaded successfully");
            }
            fetchMedia();
            closeModal();
        }
        catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Error saving media");
        }
        finally {
            setSubmitting(false);
        }
    };
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this media?"))
            return;
        try {
            await deleteMedia(id);
            toast.success("Deleted successfully");
            fetchMedia();
        }
        catch {
            toast.error("Delete failed");
        }
    };
    /* ================= MODAL ================= */
    const openModal = (item) => {
        if (item) {
            setEditingItem(item);
            setCaption(item.caption || "");
            setType(item.category === "committee" ? "committee" : "gallery");
            setFile(null);
        }
        else {
            setEditingItem(null);
            setCaption("");
            setType("gallery");
            setFile(null);
        }
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFile(null);
        setCaption("");
    };
    /* ================= LOADING ================= */
    if (loading) {
        return (_jsx("div", { className: "flex justify-center min-h-[60vh]", children: _jsx(Loader2, { className: "animate-spin w-8 h-8 text-indigo-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-xl font-bold", children: "Media Library" }), _jsxs("button", { onClick: () => openModal(), className: "bg-indigo-600 text-white px-4 py-2 flex gap-2 rounded-lg", children: [_jsx(Upload, { size: 16 }), " Upload"] })] }), _jsx("div", { className: "bg-white rounded-xl border overflow-hidden", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Preview" }), _jsx("th", { children: "Caption" }), _jsx("th", { children: "Section" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: mediaList.map((m, i) => (_jsxs("tr", { className: "border-t hover:bg-gray-50", children: [_jsx("td", { children: i + 1 }), _jsx("td", { children: _jsx("img", { src: `${BASE_URL}${m.file_url}`, className: "w-16 h-12 object-cover rounded cursor-pointer", onClick: () => setSelectedMedia(m) }) }), _jsx("td", { children: m.caption || "-" }), _jsx("td", { children: m.section || "-" }), _jsx("td", { children: m.category || "-" }), _jsxs("td", { className: "flex gap-2 justify-center py-2", children: [_jsx(Eye, { onClick: () => setSelectedMedia(m), className: "cursor-pointer" }), _jsx(Pencil, { onClick: () => openModal(m), className: "cursor-pointer" }), _jsx(Trash2, { onClick: () => handleDelete(m.id), className: "cursor-pointer text-red-600" })] })] }, m.id))) })] }) }), selectedMedia && (_jsxs("div", { className: "fixed inset-0 bg-black/80 flex justify-center items-center z-50", onClick: () => setSelectedMedia(null), children: [_jsx("button", { className: "absolute top-5 right-5 text-white", children: _jsx(X, { size: 20 }) }), _jsx("img", { src: `${BASE_URL}${selectedMedia.file_url}`, className: "max-h-[80vh] rounded-lg" })] })), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black/40 flex justify-center items-center z-50", children: _jsxs("div", { className: "bg-white p-6 w-96 rounded-xl", children: [_jsxs("div", { className: "flex justify-between mb-3", children: [_jsxs("h2", { children: [editingItem ? "Edit" : "Upload", " Media"] }), _jsx(X, { onClick: closeModal, className: "cursor-pointer" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [!editingItem && (_jsx("input", { type: "file", required: true, onChange: (e) => setFile(e.target.files?.[0] || null) })), _jsx("input", { placeholder: "Caption (Name-Role)", value: caption, onChange: (e) => setCaption(e.target.value), className: "w-full border p-2 rounded" }), _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full border p-2 rounded", children: [_jsx("option", { value: "gallery", children: "IQAC Gallery" }), _jsx("option", { value: "committee", children: "IQAC Committee" })] }), _jsx("button", { className: "bg-indigo-600 text-white w-full py-2 rounded", children: submitting ? "Saving..." : "Save" })] })] }) }))] }));
}
