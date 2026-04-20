import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Download, Eye, Loader2 } from "lucide-react";
import api from "@/api/axios";
const BASE_URL = "http://localhost:5000";
export default function SyllabusPage() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("");
    const [programme, setProgramme] = useState("");
    const [branch, setBranch] = useState("");
    /* ================= FETCH ================= */
    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await api.get("/notifications/public?category=syllabus");
                setDocs(res.data || []);
            }
            catch (err) {
                console.error("Fetch error:", err);
                setDocs([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, []);
    /* ================= DYNAMIC PROGRAMMES ================= */
    const programmes = [
        ...new Set(docs
            .filter((d) => (type ? d.type === type : true))
            .map((d) => d.programme)
            .filter(Boolean)),
    ];
    /* ================= DYNAMIC BRANCHES ================= */
    const branches = [
        ...new Set(docs
            .filter((d) => programme ? d.programme === programme : true)
            .map((d) => d.branch)
            .filter(Boolean)),
    ];
    /* ================= FILTER ================= */
    const filteredDocs = docs
        .filter((d) => (type ? d.type === type : true))
        .filter((d) => programme ? d.programme === programme : true)
        .filter((d) => (branch ? d.branch === branch : true))
        .sort((a, b) => b.id - a.id);
    /* ================= LOADING ================= */
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[60vh]", children: _jsx(Loader2, { className: "animate-spin w-8 h-8 text-gray-500" }) }));
    }
    return (_jsx("div", { className: "bg-[#faf9f6] min-h-screen py-16 px-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsx("div", { className: "text-center mb-10", children: _jsx("h1", { className: "text-4xl font-bold", children: "SYLLABUS" }) }), _jsxs("div", { className: "flex justify-center gap-4 mb-6", children: [_jsx("button", { onClick: () => {
                                setType("UG");
                                setProgramme("");
                                setBranch("");
                            }, className: `px-6 py-2 rounded ${type === "UG"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200"}`, children: "UG" }), _jsx("button", { onClick: () => {
                                setType("PG");
                                setProgramme("");
                                setBranch("");
                            }, className: `px-6 py-2 rounded ${type === "PG"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200"}`, children: "PG" })] }), type && (_jsxs("div", { className: "flex gap-4 justify-center mb-8 flex-wrap", children: [_jsxs("select", { value: programme, onChange: (e) => {
                                setProgramme(e.target.value);
                                setBranch("");
                            }, className: "border p-2 rounded", children: [_jsx("option", { value: "", children: "Select Programme" }), programmes.map((p) => (_jsx("option", { children: p }, p)))] }), programme && (_jsxs("select", { value: branch, onChange: (e) => setBranch(e.target.value), className: "border p-2 rounded", children: [_jsx("option", { value: "", children: "Select Branch" }), branches.map((b) => (_jsx("option", { children: b }, b)))] }))] })), filteredDocs.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No syllabus available" })) : (_jsx("div", { className: "space-y-4", children: filteredDocs.map((item) => {
                        const fileUrl = item.file_url
                            ? `${BASE_URL}${item.file_url}`
                            : undefined;
                        const viewUrl = fileUrl &&
                            (fileUrl.endsWith(".doc") ||
                                fileUrl.endsWith(".docx"))
                            ? `https://docs.google.com/gview?url=${fileUrl}&embedded=true`
                            : fileUrl;
                        return (_jsxs("div", { className: "bg-white px-6 py-4 border rounded flex justify-between items-center", children: [_jsx("h3", { className: "font-semibold", children: item.title }), _jsxs("div", { className: "flex gap-2", children: [viewUrl && (_jsx("a", { href: viewUrl, target: "_blank", children: _jsxs("button", { className: "bg-black text-white px-3 py-1 rounded flex gap-1 items-center", children: [_jsx(Eye, { size: 14 }), " View"] }) })), fileUrl && (_jsx("a", { href: fileUrl, download: true, children: _jsxs("button", { className: "border px-3 py-1 rounded flex gap-1 items-center", children: [_jsx(Download, { size: 14 }), " Download"] }) }))] })] }, item.id));
                    }) }))] }) }));
}
