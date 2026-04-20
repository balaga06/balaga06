import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useMemo } from "react";
import { Pencil, Trash2, Plus, Loader2, X } from "lucide-react";
import { DragDropContext, Droppable, Draggable, } from "@hello-pangea/dnd";
import toast from "react-hot-toast";
import { getProgrammes, createProgramme, updateProgramme, deleteProgramme, reorderProgrammes, } from "@/admin/services/programmes.api";
export default function Programmes() {
    const [programmes, setProgrammes] = useState([]);
    const [activeTab, setActiveTab] = useState("UG");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [form, setForm] = useState({
        name: "",
        degree: "",
        duration: "",
        department: "",
        branch_code: "",
        is_active: true,
    });
    const [editingId, setEditingId] = useState(null);
    /* ================= FETCH ================= */
    const fetchProgrammes = async () => {
        try {
            setLoading(true);
            const data = await getProgrammes(activeTab);
            setProgrammes(data || []);
        }
        catch {
            toast.error("Failed to fetch programmes");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProgrammes();
    }, [activeTab]);
    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) {
            toast.error("Name required");
            return;
        }
        try {
            setSubmitting(true);
            const payload = {
                ...form,
                type: activeTab,
                is_active: !!form.is_active, // ✅ FIX
            };
            if (editingId) {
                await updateProgramme(editingId, payload);
                toast.success("Updated successfully");
            }
            else {
                await createProgramme(payload);
                toast.success("Added successfully");
            }
            resetForm();
            fetchProgrammes();
        }
        catch {
            toast.error("Operation failed");
        }
        finally {
            setSubmitting(false);
        }
    };
    /* ================= RESET ================= */
    const resetForm = () => {
        setForm({
            name: "",
            degree: "",
            duration: "",
            department: "",
            branch_code: "",
            is_active: true,
        });
        setEditingId(null);
    };
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this programme?"))
            return;
        try {
            await deleteProgramme(id);
            toast.success("Deleted");
            fetchProgrammes();
        }
        catch {
            toast.error("Delete failed");
        }
    };
    /* ================= EDIT ================= */
    const handleEdit = (p) => {
        setForm({
            name: p.name,
            degree: p.degree,
            duration: p.duration,
            department: p.department || "",
            branch_code: p.branch_code || "",
            is_active: p.is_active, // ✅ FIX
        });
        setEditingId(p.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    /* ================= FILTER ================= */
    const filtered = useMemo(() => {
        return programmes.filter((p) => p.type === activeTab);
    }, [programmes, activeTab]);
    /* ================= PAGINATION ================= */
    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page]);
    const totalPages = Math.ceil(filtered.length / pageSize);
    /* ================= DRAG ================= */
    const handleDragEnd = async (result) => {
        if (!result.destination)
            return;
        const items = Array.from(filtered); // ✅ FIX
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);
        // merge back to full list
        const updated = programmes.map((p) => {
            const found = items.find((i) => i.id === p.id);
            return found ? found : p;
        });
        setProgrammes(updated);
        try {
            await reorderProgrammes(items.map((item, index) => ({
                id: item.id,
                order_index: index,
            })));
        }
        catch {
            toast.error("Reorder failed");
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex justify-center min-h-[50vh]", children: _jsx(Loader2, { className: "animate-spin w-8 h-8 text-indigo-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsx("h1", { className: "text-2xl font-semibold", children: "Programmes" }), _jsx("div", { className: "flex gap-2", children: ["UG", "PG"].map((tab) => (_jsx("button", { onClick: () => {
                        setActiveTab(tab);
                        setPage(1);
                    }, className: `px-4 py-2 rounded ${activeTab === tab
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200"}`, children: tab }, tab))) }), _jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-7 gap-3", children: [_jsx("input", { placeholder: "Name", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "border p-2" }), _jsx("input", { placeholder: "Degree", value: form.degree, onChange: (e) => setForm({ ...form, degree: e.target.value }), className: "border p-2" }), _jsx("input", { placeholder: "Duration", value: form.duration, onChange: (e) => setForm({ ...form, duration: e.target.value }), className: "border p-2" }), _jsx("input", { placeholder: "Department", value: form.department, onChange: (e) => setForm({ ...form, department: e.target.value }), className: "border p-2" }), _jsx("input", { placeholder: "Branch Code", value: form.branch_code, onChange: (e) => setForm({ ...form, branch_code: e.target.value }), className: "border p-2" }), _jsxs("select", { value: form.is_active ? "Active" : "Inactive", onChange: (e) => setForm({
                            ...form,
                            is_active: e.target.value === "Active",
                        }), className: "border p-2", children: [_jsx("option", { children: "Active" }), _jsx("option", { children: "Inactive" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "bg-indigo-600 text-white px-3", children: submitting ? _jsx(Loader2, { className: "animate-spin" }) : _jsx(Plus, { size: 16 }) }), editingId && (_jsx("button", { type: "button", onClick: resetForm, className: "bg-gray-400 text-white px-3", children: _jsx(X, { size: 16 }) }))] })] }), _jsx(DragDropContext, { onDragEnd: handleDragEnd, children: _jsx(Droppable, { droppableId: "programmes", children: (provided) => (_jsxs("table", { ref: provided.innerRef, ...provided.droppableProps, className: "w-full border text-sm", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { children: "#" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Degree" }), _jsx("th", { children: "Duration" }), _jsx("th", { children: "Department" }), _jsx("th", { children: "Branch Code" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Actions" })] }) }), _jsxs("tbody", { children: [paginated.map((p, index) => (_jsx(Draggable, { draggableId: String(p.id), index: index, children: (provided) => (_jsxs("tr", { ref: provided.innerRef, ...provided.draggableProps, className: "border-t text-center", children: [_jsx("td", { ...provided.dragHandleProps, children: "\u2630" }), _jsx("td", { children: p.name }), _jsx("td", { children: p.degree }), _jsx("td", { children: p.duration }), _jsx("td", { children: p.department }), _jsx("td", { children: p.branch_code || "-" }), _jsx("td", { children: p.is_active ? (_jsx("span", { className: "text-green-600", children: "Active" })) : (_jsx("span", { className: "text-red-500", children: "Inactive" })) }), _jsxs("td", { className: "flex gap-2 justify-center", children: [_jsx(Pencil, { onClick: () => handleEdit(p), className: "cursor-pointer text-blue-600" }), _jsx(Trash2, { onClick: () => handleDelete(p.id), className: "cursor-pointer text-red-600" })] })] })) }, p.id))), paginated.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 8, className: "py-4 text-gray-400 text-center", children: "No programmes found" }) })), provided.placeholder] })] })) }) }), _jsx("div", { className: "flex justify-center gap-2", children: Array.from({ length: totalPages }, (_, i) => (_jsx("button", { onClick: () => setPage(i + 1), className: `px-3 py-1 border ${page === i + 1 ? "bg-indigo-600 text-white" : ""}`, children: i + 1 }, i))) })] }));
}
