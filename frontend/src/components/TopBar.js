import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { Award, Phone, Mail, MapPin } from "lucide-react";
import { useSection } from "@/context/SectionContext";
/* ================= FALLBACK ================= */
const fallback = {
    accreditation: "NAAC A+ Accredited",
    tagline: "Empowering Excellence Since 1946",
    phones: [
        { number: "+91-884-2300900", label: "IQAC Office" },
        { number: "1800-123-1104", label: "University Info" },
    ],
    email: "iqac@jntuk.edu.in",
    emailHref: "mailto:iqac@jntuk.edu.in",
    location: "Kakinada, Andhra Pradesh",
};
export default function TopBar() {
    const data = useSection("topbar") || fallback;
    const phones = data.phones && data.phones.length > 0
        ? data.phones
        : fallback.phones;
    return (_jsxs("div", { className: "relative bg-gradient-to-r from-[#020617] via-[#0a192f] to-[#020617] text-white/90 text-sm backdrop-blur-md", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[1px] bg-white/20" }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Badge, { variant: "outline", className: "border-white/20 bg-white/5 text-white px-3 py-1 font-medium backdrop-blur-sm", children: [_jsx(Award, { className: "w-3.5 h-3.5 mr-1.5 text-blue-400" }), data.accreditation || fallback.accreditation] }), _jsx("span", { className: "hidden md:inline-block text-white/20", children: "|" }), _jsx("span", { className: "hidden md:inline-block text-gray-400 text-xs tracking-wide", children: data.tagline || fallback.tagline })] }), _jsx("div", { className: "hidden lg:flex items-center gap-6 text-xs text-gray-300", children: phones.map((p, i) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-3.5 h-3.5 text-blue-400" }), _jsx("span", { className: "font-medium", children: p.number }), p.label && (_jsxs("span", { className: "text-gray-500 text-xs", children: ["(", p.label, ")"] })), i !== phones.length - 1 && (_jsx("span", { className: "text-white/20", children: "|" }))] }, i))) }), _jsxs("div", { className: "hidden md:flex items-center gap-6 text-xs", children: [_jsxs("a", { href: data.emailHref || fallback.emailHref, className: "flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition group", children: [_jsx(Mail, { className: "w-3.5 h-3.5 group-hover:scale-110 transition" }), _jsx("span", { children: data.email || fallback.email })] }), _jsx("span", { className: "text-white/20", children: "|" }), _jsxs("div", { className: "flex items-center gap-1.5 text-gray-300", children: [_jsx(MapPin, { className: "w-3.5 h-3.5 text-blue-400" }), _jsx("span", { children: data.location || fallback.location })] })] })] })] }));
}
