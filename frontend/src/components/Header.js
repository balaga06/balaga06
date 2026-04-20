import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GraduationCap } from "lucide-react";
import { useSection } from "@/context/SectionContext";
/* ================= FALLBACK ================= */
const fallback = {
    logo: "",
    title: "Internal Quality Assurance Cell (IQAC)",
    subtitle: "Jawaharlal Nehru Technological University Kakinada",
};
export default function Header() {
    const data = useSection("iqac_header") || fallback;
    return (_jsx("header", { className: "sticky top-0 z-50 bg-gradient-to-r from-[#020617] via-[#0a192f] to-[#020617] border-b border-white/10 backdrop-blur-md", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-5", children: _jsxs("div", { className: "flex items-center gap-5", children: [_jsx("div", { className: "w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-md", children: _jsx("img", { src: data.logo || "/images/jntuk-gate.jpg", alt: "JNTUK Logo", onError: (e) => {
                                e.currentTarget.src = "/images/jntuk-gate.jpg"; // ✅ fallback
                            }, className: "h-12 w-12 object-cover rounded-md" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(GraduationCap, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { className: "text-xs uppercase tracking-widest text-blue-400", children: "JNTUK" })] }), _jsx("h1", { className: "text-lg md:text-xl font-semibold text-white leading-tight", children: data.title || fallback.title }), _jsx("p", { className: "text-sm text-gray-400", children: data.subtitle || fallback.subtitle })] })] }) }) }));
}
