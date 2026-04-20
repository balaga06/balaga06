import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSectionByKey } from "@/admin/services/pageSection.api";
/* ✅ IMPORT CUSTOM PAGES */
import IQACCommittee from "./IQACCommittee";
import Programmes from "./Programmes";
import AboutIQAC from "./AboutIQAC";
/* 🔥 ADD THIS */
import Syllabus from "./Syllabus";
export default function DynamicPage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    /* ================= 🔥 BYPASS STATIC PAGES ================= */
    // ✅ VERY IMPORTANT (PREVENT WRONG PAGE LOAD)
    if (slug === "iqac-committee")
        return _jsx(IQACCommittee, {});
    if (slug === "programmes")
        return _jsx(Programmes, {});
    if (slug === "about-iqac")
        return _jsx(AboutIQAC, {});
    /* 🔥 ADD THIS (YOUR FIX) */
    if (slug === "syllabus")
        return _jsx(Syllabus, {});
    /* ================= FETCH ================= */
    useEffect(() => {
        if (!slug)
            return;
        const fetchData = async () => {
            try {
                console.log("LOADING PAGE:", slug);
                const section = await getSectionByKey(slug);
                console.log("API:", section);
                if (!section) {
                    setError(true);
                    return;
                }
                setData(section);
            }
            catch (err) {
                console.error(err);
                setError(true);
            }
        };
        fetchData();
    }, [slug]);
    /* ================= ERROR ================= */
    if (error) {
        return (_jsx("div", { className: "text-center py-20 text-red-500 text-xl", children: "Failed to load page" }));
    }
    /* ================= LOADING ================= */
    if (!data) {
        return (_jsx("div", { className: "text-center py-20 text-gray-500", children: "Loading..." }));
    }
    /* ================= UI ================= */
    return (_jsxs("div", { children: [_jsxs("div", { className: "relative h-[300px]", children: [_jsx("img", { src: data.content?.image ||
                            "https://via.placeholder.com/1200x400", className: "w-full h-full object-cover", alt: data.title }), _jsx("div", { className: "absolute inset-0 bg-black/50 flex items-center justify-center", children: _jsx("h1", { className: "text-white text-4xl font-bold", children: data.title }) })] }), _jsxs("div", { className: "max-w-5xl mx-auto px-6 py-12 text-center", children: [_jsx("h2", { className: "text-3xl font-semibold mb-4", children: data.title }), _jsx("p", { className: "text-gray-600 leading-relaxed", children: data.content?.description ||
                            "No content available for this page." })] })] }));
}
