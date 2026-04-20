import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useSection } from "@/context/SectionContext";
import { getIcon } from "@/lib/iconMap";
/* ================= FALLBACK (UPDATED FULL MENUS) ================= */
const fallback = {
    badge: "IQAC Portal",
    heading: "Internal Quality Assurance Cell",
    subtitle: "A centralized academic quality framework ensuring continuous improvement.",
    cards: [
        {
            title: "About IQAC",
            description: "Overview of IQAC objectives and functions.",
            icon: "GraduationCap",
            stats: "Overview",
            image: "/images/jntuk-gate.jpg",
            type: "page",
            slug: "about-iqac",
        },
        {
            title: "Programmes",
            description: "UG & PG Programmes offered.",
            icon: "Building2",
            stats: "Courses",
            image: "/images/jntuk-gate.jpg",
            type: "page",
            slug: "programmes",
        },
        {
            title: "Reports",
            description: "AQAR and compliance reports.",
            icon: "FileText",
            stats: "Documents",
            image: "/images/jntuk-gate.jpg",
            type: "docs",
            slug: "reports",
        },
        {
            title: "NIRF",
            description: "National Institutional Ranking Framework.",
            icon: "BarChart3",
            stats: "Ranking",
            image: "/images/jntuk-gate.jpg",
            type: "docs",
            slug: "nirf",
        },
        {
            title: "NAAC",
            description: "NAAC accreditation documents.",
            icon: "Award",
            stats: "Accreditation",
            image: "/images/jntuk-gate.jpg",
            type: "docs",
            slug: "naac",
        },
        {
            title: "Syllabus",
            description: "All academic syllabus documents.",
            icon: "BookOpen",
            stats: "Curriculum",
            image: "/images/jntuk-gate.jpg",
            type: "docs",
            slug: "syllabus",
        },
        {
            title: "Minutes & Meetings",
            description: "IQAC meeting records and minutes.",
            icon: "ClipboardList",
            stats: "Records",
            image: "/images/jntuk-gate.jpg",
            type: "docs",
            slug: "minutes-meetings",
        },
        {
            title: "IQAC Committee",
            description: "Members of IQAC committee.",
            icon: "Users",
            stats: "Team",
            image: "/images/jntuk-gate.jpg",
            type: "page",
            slug: "iqac-committee",
        },
    ],
};
export default function FeatureCards() {
    const navigate = useNavigate();
    const sectionData = useSection("iqac_features");
    const data = sectionData && sectionData.cards?.length ? sectionData : fallback;
    const cards = data.cards && data.cards.length > 0 ? data.cards : fallback.cards;
    /* ================= CLICK HANDLER ================= */
    const handleClick = (card) => {
        if (card.type === "page") {
            navigate(`/pages/${card.slug}`);
        }
        else if (card.type === "docs") {
            navigate(`/documents/${card.slug}`);
        }
        else if (card.type === "external" && card.link) {
            window.open(card.link, "_blank");
        }
    };
    return (_jsx("section", { className: "py-16 bg-gradient-to-b from-[#020617] via-[#0a192f] to-[#020617]", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx(Badge, { className: "mb-4 bg-white/10 text-white border border-white/20 backdrop-blur-sm", children: data.badge || fallback.badge }), _jsx("h2", { className: "text-4xl font-bold text-white mb-4", children: data.heading || fallback.heading }), _jsx("p", { className: "text-gray-300 max-w-2xl mx-auto", children: data.subtitle || fallback.subtitle })] }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8", children: cards.map((card, index) => {
                        const Icon = getIcon(card.icon) || ArrowRight;
                        return (_jsxs(Card, { onClick: () => handleClick(card), className: "relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-500", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("img", { src: card.image || "/images/jntuk-gate.jpg", onError: (e) => {
                                                e.currentTarget.src = "/images/jntuk-gate.jpg";
                                            }, className: "w-full h-full object-cover group-hover:scale-110 transition duration-700" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0a192f]/70 to-[#020617]/90" })] }), _jsxs(CardContent, { className: "relative z-10 p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-6", children: [_jsx("div", { className: "p-3 rounded-xl bg-blue-600/20 group-hover:bg-blue-600 transition", children: _jsx(Icon, { className: "w-6 h-6 text-blue-400 group-hover:text-white" }) }), card.stats && (_jsx("span", { className: "text-xs text-gray-300", children: card.stats }))] }), _jsx("h3", { className: "text-lg text-white font-semibold mb-2 group-hover:text-blue-400", children: card.title }), _jsx("p", { className: "text-gray-300 text-sm mb-4", children: card.description }), _jsxs("div", { className: "flex items-center text-sm text-blue-400 font-medium", children: ["View Details", _jsx(ArrowRight, { className: "ml-1 w-4 h-4 group-hover:translate-x-1 transition" })] })] })] }, index));
                    }) })] }) }));
}
