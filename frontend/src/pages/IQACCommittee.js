import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Users, X, Loader2, ZoomIn } from "lucide-react";
import { getMedia } from "@/admin/services/media.api";
const BASE_URL = "http://localhost:5000";
/* ================= COMPONENT ================= */
export default function IQACCommittee() {
    const [allMedia, setAllMedia] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [type, setType] = useState("committee");
    /* ================= FETCH ================= */
    useEffect(() => {
        const fetchMediaData = async () => {
            try {
                const media = (await getMedia());
                if (!Array.isArray(media)) {
                    setAllMedia([]);
                    return;
                }
                setAllMedia(media);
            }
            catch (err) {
                console.error(err);
                setAllMedia([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMediaData();
    }, []);
    /* ================= FILTER ================= */
    useEffect(() => {
        const result = allMedia.filter((m) => (m.section || "").toLowerCase() === "iqac" &&
            (m.category || "").toLowerCase() === type);
        setFiltered(result);
    }, [allMedia, type]);
    /* ================= LOADING ================= */
    if (loading) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[50vh]", children: _jsx(Loader2, { className: "w-8 h-8 animate-spin text-gray-700" }) }));
    }
    return (_jsxs("section", { className: "py-16 bg-gray-50", children: [_jsxs("div", { className: "max-w-7xl mx-auto px-6 text-center mb-10", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-full mb-4", children: [_jsx(Users, { className: "w-4 h-4" }), "IQAC"] }), _jsxs("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: ["IQAC ", type === "gallery" ? "Gallery" : "Committee"] }), _jsx("p", { className: "text-gray-500", children: type === "gallery"
                            ? "Explore IQAC activities and events."
                            : "Meet our committee members." }), _jsx("div", { className: "mt-6", children: _jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "border px-4 py-2 rounded-lg", children: [_jsx("option", { value: "gallery", children: "IQAC Gallery" }), _jsx("option", { value: "committee", children: "IQAC Committee" })] }) })] }), filtered.length === 0 && (_jsx("p", { className: "text-center text-gray-500", children: "No data available" })), type === "committee" && (_jsx("div", { className: "flex flex-col items-center gap-10 px-6", children: filtered.map((item, index) => {
                    const [name, role] = (item.caption || "").split("-");
                    const imgPath = item.file_url || item.file_path || item.url || item.path || "";
                    const fullUrl = imgPath.startsWith("http")
                        ? imgPath
                        : `${BASE_URL}${imgPath}`;
                    return (_jsxs("div", { onClick: () => setSelected(item), className: "w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer", children: [_jsx("div", { className: "h-80 overflow-hidden", children: _jsx("img", { src: fullUrl || "/images/default-avatar.png", className: "w-full h-full object-cover hover:scale-105 transition" }) }), _jsxs("div", { className: "p-5 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: name || "Member" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: role || "" })] })] }, item.id || index));
                }) })), type === "gallery" && (_jsx("div", { className: "max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6", children: filtered.map((item, index) => {
                    const imgPath = item.file_url || item.file_path || item.url || item.path || "";
                    const fullUrl = imgPath.startsWith("http")
                        ? imgPath
                        : `${BASE_URL}${imgPath}`;
                    return (_jsxs("div", { onClick: () => setSelected(item), className: "group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer", children: [_jsx("div", { className: "aspect-square overflow-hidden", children: _jsx("img", { src: fullUrl || "/images/default-avatar.png", className: "w-full h-full object-cover group-hover:scale-105 transition" }) }), _jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center", children: _jsx("div", { className: "bg-black/60 p-2 rounded-full", children: _jsx(ZoomIn, { className: "w-4 h-4 text-white" }) }) })] }, item.id || index));
                }) })), selected && (_jsxs("div", { className: "fixed inset-0 bg-black/90 z-50 flex items-center justify-center", onClick: () => setSelected(null), children: [_jsx("button", { className: "absolute top-6 right-6 text-white", children: _jsx(X, { className: "w-6 h-6" }) }), _jsxs("div", { onClick: (e) => e.stopPropagation(), children: [_jsx("img", { src: (selected.file_url ||
                                    selected.file_path ||
                                    selected.url ||
                                    selected.path ||
                                    "").startsWith("http")
                                    ? selected.file_url ||
                                        selected.file_path ||
                                        selected.url ||
                                        selected.path ||
                                        ""
                                    : `${BASE_URL}${selected.file_url ||
                                        selected.file_path ||
                                        selected.url ||
                                        selected.path ||
                                        ""}`, className: "max-h-[80vh] rounded-lg" }), selected.caption && (_jsx("p", { className: "text-white text-center mt-4", children: selected.caption }))] })] }))] }));
}
