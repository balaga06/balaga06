import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
export default function Admins() {
    const [admins, setAdmins] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const getToken = () => localStorage.getItem("token");
    /* ================= FETCH ADMINS ================= */
    const fetchAdmins = async () => {
        try {
            setLoading(true);
            setError("");
            const token = getToken();
            if (!token) {
                setError("⚠️ Please login first");
                return;
            }
            const res = await fetch("http://localhost:5000/api/admins", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to load admins");
                return;
            }
            setAdmins(data);
        }
        catch (error) {
            console.error(error);
            setError("Error fetching admins");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAdmins();
    }, []);
    /* ================= ADD / UPDATE ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const token = getToken();
            if (!token) {
                setError("⚠️ Session expired. Please login again.");
                return;
            }
            const url = editingId
                ? `http://localhost:5000/api/admins/${editingId}`
                : "http://localhost:5000/api/admins";
            const method = editingId ? "PUT" : "POST";
            const bodyData = editingId
                ? { name: form.name, email: form.email }
                : form;
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bodyData),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Operation failed");
                return;
            }
            setForm({ name: "", email: "", password: "" });
            setEditingId(null);
            fetchAdmins();
        }
        catch (error) {
            console.error(error);
            setError("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this admin?"))
            return;
        try {
            const token = getToken();
            const res = await fetch(`http://localhost:5000/api/admins/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Delete failed");
                return;
            }
            fetchAdmins();
        }
        catch (error) {
            console.error(error);
            setError("Delete failed");
        }
    };
    /* ================= EDIT ================= */
    const handleEdit = (admin) => {
        setForm({
            name: admin.name,
            email: admin.email,
            password: "",
        });
        setEditingId(admin.id);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-800", children: "Admin Management" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage administrators and their access roles" })] }), error && (_jsx("div", { className: "bg-red-100 text-red-600 px-4 py-2 rounded", children: error })), _jsx("div", { className: "bg-white border rounded-xl p-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx("input", { type: "text", placeholder: "Name", className: "border rounded-lg px-3 py-2", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), required: true }), _jsx("input", { type: "email", placeholder: "Email", className: "border rounded-lg px-3 py-2", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), required: true }), !editingId && (_jsx("input", { type: "password", placeholder: "Password", className: "border rounded-lg px-3 py-2", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }), required: true })), _jsxs("button", { type: "submit", disabled: loading, className: "bg-indigo-600 text-white rounded-lg px-4 py-2 flex items-center gap-2", children: [_jsx(Plus, { size: 16 }), editingId ? "Update Admin" : "Add Admin"] })] }) }), _jsx("div", { className: "bg-white border rounded-xl overflow-hidden", children: loading ? (_jsx("p", { className: "text-center py-6", children: "Loading..." })) : (_jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-slate-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left", children: "Name" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Email" }), _jsx("th", { className: "px-6 py-3 text-left", children: "Created" }), _jsx("th", { className: "px-6 py-3 text-right", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y", children: admins.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "text-center py-6 text-slate-500", children: "No admins found" }) })) : (admins.map((admin) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4", children: admin.name }), _jsx("td", { className: "px-6 py-4", children: admin.email }), _jsx("td", { className: "px-6 py-4", children: admin.created_at
                                            ? new Date(admin.created_at).toLocaleDateString()
                                            : "-" }), _jsxs("td", { className: "px-6 py-4 flex justify-end gap-3", children: [_jsx("button", { onClick: () => handleEdit(admin), children: _jsx(Pencil, { size: 16 }) }), _jsx("button", { onClick: () => handleDelete(admin.id), children: _jsx(Trash2, { size: 16 }) })] })] }, admin.id)))) })] })) })] }));
}
