import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, Eye, Loader2 } from "lucide-react";
import api from "@/api/axios";
/* 🔥 IMPORT SYLLABUS PAGE */
import SyllabusPage from "./SyllabusPage";
const BASE_URL = "http://localhost:5000";
/* ================= COMPONENT ================= */
export default function DocumentsPage({ category, }) {
    const { slug } = useParams();
    const finalCategory = (category || slug || "").toLowerCase();
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!finalCategory)
            return;
        const fetchDocs = async () => {
            try {
                const res = await api.get("/notifications/public");
                const data = Array.isArray(res.data)
                    ? res.data
                    : [];
                const categoryMap = {
                    "minutes-meetings": ["minutes", "meetings", "minutes-meetings"],
                    reports: ["reports"],
                    naac: ["naac"],
                    nirf: ["nirf"],
                    syllabus: ["syllabus"], // keep this
                };
                const filtered = data.filter((item) => {
                    if (!item.category)
                        return false;
                    const itemCategory = item.category.toLowerCase();
                    const allowed = categoryMap[finalCategory] || [finalCategory];
                    return allowed.includes(itemCategory);
                });
                const uniqueDocs = filtered.filter((doc, index, self) => index === self.findIndex((d) => d.id === doc.id));
                const sorted = uniqueDocs.sort((a, b) => b.id - a.id);
                setDocs(sorted);
            }
            catch (err) {
                console.error("Documents fetch error:", err);
                setDocs([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, [finalCategory]);
    /* ================= LOADING ================= */
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[60vh]", children: _jsx(Loader2, { className: "animate-spin w-8 h-8 text-gray-500" }) }));
    }
    /* 🔥 VERY IMPORTANT: SYLLABUS OVERRIDE */
    if (finalCategory === "syllabus") {
        return _jsx(SyllabusPage, {});
    }
    /* ================= UI ================= */
    return (_jsx("div", { className: "bg-[#faf9f6] min-h-screen py-16 px-6", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h1", { className: "text-4xl font-bold uppercase text-[#0f172a]", children: finalCategory.replace("-", " ") }), _jsx("p", { className: "text-gray-500", children: "Documents & Reports" })] }), docs.length === 0 ? (_jsx("p", { className: "text-center text-gray-500", children: "No documents available" })) : (_jsx("div", { className: "space-y-4", children: docs.map((item) => {
                        const fileUrl = item.file_url
                            ? `${BASE_URL}${item.file_url}`
                            : item.link || undefined;
                        const viewUrl = fileUrl &&
                            (fileUrl.endsWith(".doc") ||
                                fileUrl.endsWith(".docx"))
                            ? `https://docs.google.com/gview?url=${fileUrl}&embedded=true`
                            : fileUrl;
                        return (_jsxs("div", { className: "bg-white px-6 py-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-center", children: [_jsx("h3", { className: "font-semibold text-lg text-[#0f172a]", children: item.title }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("p", { className: "text-sm text-gray-400 whitespace-nowrap", children: new Date(item.created_at).toDateString() }), _jsxs("div", { className: "flex gap-2", children: [fileUrl && viewUrl && (_jsx("a", { href: viewUrl, target: "_blank", rel: "noreferrer", children: _jsxs("button", { className: "bg-black text-white px-3 py-1.5 rounded flex items-center gap-1 text-sm", children: [_jsx(Eye, { size: 14 }), " View"] }) })), fileUrl && (_jsx("a", { href: fileUrl, download: true, children: _jsxs("button", { className: "border border-gray-300 px-3 py-1.5 rounded flex items-center gap-1 text-sm hover:bg-gray-100", children: [_jsx(Download, { size: 14 }), " Download"] }) }))] })] })] }, item.id));
                    }) }))] }) }));
}
