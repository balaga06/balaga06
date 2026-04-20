import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapPin, Phone, Mail, Clock, ArrowRight, GraduationCap, Facebook, Twitter, Linkedin, Youtube, } from "lucide-react";
import { Link } from "react-router-dom";
import { useSection } from "@/context/SectionContext";
/* ================= FALLBACK ================= */
const fallback = {
    brandTitle: "Internal Quality Assurance Cell",
    brandSubtitle: "JNTUK, Kakinada",
    description: "The Internal Quality Assurance Cell (IQAC) ensures academic excellence through continuous monitoring and evaluation.",
    address: "JNTUK, Kakinada – 533003",
    phone: "+91 884 2300900",
    phoneHref: "tel:+918842300900",
    email: "iqac@jntuk.edu.in",
    emailHref: "mailto:iqac@jntuk.edu.in",
    hours: "Mon - Fri: 9:00 AM - 5:00 PM",
    /* 🔥 FIXED PATHS (MATCH YOUR ROUTES) */
    iqacLinks: [
        { label: "About IQAC", path: "/pages/about-iqac" },
        // ✅ FIXED
        { label: "IQAC Committee", path: "/pages/iqac-committee" },
        // ✅ DOCUMENTS
        { label: "AQAR Reports", path: "/documents/reports" },
        { label: "NAAC Documents", path: "/documents/naac" },
        { label: "NIRF", path: "/documents/nirf" },
        { label: "Meetings", path: "/documents/minutes" },
    ],
    socialLinks: [
        { label: "Facebook", href: "https://www.facebook.com/officialjntuk" },
        { label: "Twitter", href: "https://x.com/jntukofficial" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/jntukkakinada/" },
        { label: "YouTube", href: "https://www.youtube.com/@JNTUK-Official" },
    ],
    copyright: "© 2026 JNTUK — Internal Quality Assurance Cell",
};
/* ================= ICON MAP ================= */
const socialIcons = {
    Facebook,
    Twitter,
    LinkedIn: Linkedin,
    YouTube: Youtube,
};
export default function Footer() {
    const data = useSection("iqac_footer") || fallback;
    const iqacLinks = data.iqacLinks || fallback.iqacLinks;
    const socialLinks = data.socialLinks || fallback.socialLinks;
    return (_jsxs("footer", { className: "mt-auto relative backdrop-blur-xl bg-white/5 border-t border-white/10 text-white", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 to-[#020617]/90 -z-10" }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-16", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center", children: _jsx(GraduationCap, { className: "w-6 h-6 text-blue-400" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold text-lg", children: data.brandTitle }), _jsx("p", { className: "text-xs text-gray-400", children: data.brandSubtitle })] })] }), _jsx("p", { className: "text-gray-400 text-sm mb-6", children: data.description }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(MapPin, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { children: data.address })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Phone, { className: "w-4 h-4 text-blue-400" }), _jsx("a", { href: data.phoneHref, children: data.phone })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Mail, { className: "w-4 h-4 text-blue-400" }), _jsx("a", { href: data.emailHref, children: data.email })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Clock, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { children: data.hours })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-5", children: "IQAC Links" }), _jsx("ul", { className: "space-y-3", children: iqacLinks.map((item) => (_jsx("li", { children: _jsxs(Link, { to: item.path, className: "group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition", children: [_jsx(ArrowRight, { className: "w-3 h-3" }), _jsx("span", { children: item.label })] }) }, item.label))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-5", children: "Follow Us" }), _jsx("div", { className: "flex gap-4", children: socialLinks.map((s) => {
                                        const Icon = socialIcons[s.label];
                                        return (_jsx("a", { href: s.href, target: "_blank", rel: "noreferrer", className: "p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 transition", children: Icon && _jsx(Icon, { className: "w-5 h-5" }) }, s.label));
                                    }) })] })] }) }), _jsx("div", { className: "border-t text-center py-6 text-sm text-gray-500", children: data.copyright })] }));
}
