import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Pencil, Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { getAllSections, } from "@/admin/services/pageSection.api";
import SectionEditorModal from "./SectionEditorModal";
/* ================= GROUP LABELS ================= */
const groupLabels = {
    home: "Home Page",
    global: "Global (Header/Footer)",
    contact: "Contact Page",
    iqac: "IQAC Page",
};
export default function WebsiteSections() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingSection, setEditingSection] = useState(null);
    /* ================= FETCH ================= */
    const fetchSections = async () => {
        try {
            setLoading(true);
            const data = await getAllSections(); // ✅ FIXED
            setSections(data);
        }
        catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch sections");
        }
        finally {
            setLoading(false);
        }
    };
    /* ✅ VERY IMPORTANT (MISSING FIX) */
    useEffect(() => {
        fetchSections();
    }, []);
    /* ================= DATE FORMAT ================= */
    const formatDate = (date) => {
        if (!date)
            return "-";
        return new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    /* ================= GROUP ================= */
    const grouped = sections.reduce((acc, s) => {
        if (!acc[s.page_group])
            acc[s.page_group] = [];
        acc[s.page_group].push(s);
        return acc;
    }, {});
    /* ================= LOADING ================= */
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[40vh]", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-indigo-600" }) }));
    }
    /* ================= UI ================= */
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-slate-800", children: "Website Sections" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage homepage, IQAC, and global sections dynamically" })] }), sections.length === 0 && (_jsx("div", { className: "text-center py-10 text-slate-500", children: "No sections found" })), Object.entries(grouped).map(([group, items]) => (_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-md font-semibold text-slate-700", children: groupLabels[group] || group }), _jsxs("div", { className: "bg-white border rounded-xl overflow-hidden", children: [_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-slate-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left", children: "Section" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Key" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Updated" }), _jsx("th", { className: "px-6 py-3 text-center", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y", children: items.map((section) => (_jsxs("tr", { className: "hover:bg-slate-50", children: [_jsx("td", { className: "px-6 py-4 font-medium", children: section.title }), _jsx("td", { className: "px-6 py-4 font-mono text-xs text-gray-500", children: section.section_key }), _jsx("td", { className: "px-6 py-4", children: section.is_active ? (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-green-100 text-green-700", children: [_jsx(Eye, { size: 12 }), " Active"] })) : (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-gray-100 text-gray-500", children: [_jsx(EyeOff, { size: 12 }), " Hidden"] })) }), _jsx("td", { className: "px-6 py-4 text-gray-500", children: formatDate(section.updated_at) }), _jsx("td", { className: "px-6 py-4 text-center", children: _jsxs("button", { onClick: () => setEditingSection(section), className: "text-indigo-600 hover:text-indigo-800", children: [_jsx(Pencil, { size: 14 }), " Edit"] }) })] }, section.id))) })] }), items.length === 0 && (_jsx("div", { className: "text-center py-6 text-gray-500", children: "No sections found" }))] })] }, group))), editingSection && (_jsx(SectionEditorModal, { section: editingSection, onClose: () => setEditingSection(null), onSaved: () => {
                    setEditingSection(null);
                    fetchSections(); // ✅ refresh
                } }))] }));
}
