import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Loader2 } from "lucide-react";
export default function Programmes() {
    const [programmes, setProgrammes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("UG");
    useEffect(() => {
        const fetchProgrammes = async () => {
            try {
                // ✅ FIXED API
                const res = await api.get("/programmes/public");
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data.data;
                setProgrammes(data);
            }
            catch (err) {
                console.error("Programmes error:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProgrammes();
    }, []);
    // ✅ FIXED FILTER
    const filtered = programmes.filter((p) => p.type?.toUpperCase() === activeTab &&
        p.is_active === true);
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[60vh]", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-gray-500" }) }));
    }
    return (_jsx("div", { className: "bg-[#faf9f6] min-h-screen py-16 px-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-4xl font-bold text-[#0f172a] mb-2", children: "Programmes Offered" }), _jsx("p", { className: "text-gray-500", children: "Explore undergraduate and postgraduate programmes" })] }), _jsxs("div", { className: "flex justify-center gap-3 mb-10", children: [_jsx("button", { onClick: () => setActiveTab("UG"), className: `px-6 py-2 rounded-lg ${activeTab === "UG"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200"}`, children: "UG" }), _jsx("button", { onClick: () => setActiveTab("PG"), className: `px-6 py-2 rounded-lg ${activeTab === "PG"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200"}`, children: "PG" })] }), filtered.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No programmes available" })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: filtered.map((p) => (_jsxs("div", { className: "bg-white p-6 rounded-xl shadow hover:shadow-lg transition", children: [_jsx("h3", { className: "text-lg font-semibold text-[#0f172a] mb-3", children: p.name }), _jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [_jsx("strong", { children: "Degree:" }), " ", p.degree] }), _jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [_jsx("strong", { children: "Duration:" }), " ", p.duration] }), _jsxs("p", { className: "text-sm text-gray-600 mb-1", children: [_jsx("strong", { children: "Department:" }), " ", p.department] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("strong", { children: "Branch Code:" }), " ", p.branch_code || "-"] })] }, p.id))) }))] }) }));
}
