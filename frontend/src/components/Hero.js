import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSection } from "@/context/SectionContext";
import { getMedia } from "@/admin/services/media.api";
import { getIcon } from "@/lib/iconMap";
/* ================= FALLBACK ================= */
const fallback = {
    badge: "IQAC Portal",
    headline: "Internal Quality Assurance Cell",
    description: "Ensuring academic excellence through continuous monitoring and quality enhancement.",
    buttons: [
        {
            label: "Explore Programmes",
            type: "page",
            slug: "programmes",
            variant: "primary",
            icon: "ArrowRight",
        },
        {
            label: "View NAAC Documents",
            type: "docs",
            slug: "naac",
            variant: "outline",
        },
    ],
    stats: [
        { value: "A+", label: "NAAC Accreditation", icon: "BarChart3" },
        { value: "30+", label: "Departments", icon: "FileText" },
        { value: "100%", label: "Quality Coverage", icon: "Users" },
    ],
};
export default function Hero() {
    const navigate = useNavigate();
    const data = useSection("iqac_hero") || fallback;
    const [heroImage, setHeroImage] = useState("");
    /* ================= FETCH MEDIA ================= */
    useEffect(() => {
        const fetchHero = async () => {
            try {
                const media = await getMedia();
                if (!Array.isArray(media))
                    return;
                // ✅ FULL SAFE CAST (NO TS ERROR)
                const hero = media.find((m) => m?.section === "hero");
                if (hero) {
                    const path = hero.file_path ||
                        hero.url ||
                        hero.path;
                    if (path) {
                        setHeroImage(`http://localhost:5000${path}`);
                    }
                }
            }
            catch (err) {
                console.log("Hero image load failed", err);
            }
        };
        fetchHero();
    }, []);
    const buttons = data?.buttons || fallback.buttons;
    const stats = data?.stats || fallback.stats;
    /* ================= NAVIGATION ================= */
    const handleClick = (btn) => {
        if (btn.type === "page") {
            navigate(`/pages/${btn.slug}`);
        }
        else if (btn.type === "docs") {
            navigate(`/documents/${btn.slug}`);
        }
        else if (btn.type === "external" && btn.link) {
            window.open(btn.link, "_blank");
        }
    };
    return (_jsxs("section", { className: "relative min-h-[650px] overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("img", { src: heroImage || "/images/jntuk-gate.jpg", onError: (e) => {
                            e.currentTarget.src = "/images/jntuk-gate.jpg";
                        }, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#0a192f]/85 to-[#020617]/60" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" })] }), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 py-24", children: _jsxs("div", { className: "max-w-3xl", children: [_jsx(Badge, { className: "mb-6 bg-white/10 text-white border border-white/20 px-4 py-1.5 backdrop-blur-sm", children: data?.badge || fallback.badge }), _jsx("h1", { className: "text-4xl md:text-6xl font-bold text-white mb-6 leading-tight", children: data?.headline || fallback.headline }), _jsx("p", { className: "text-lg md:text-xl text-gray-300 mb-10", children: data?.description || fallback.description }), _jsx("div", { className: "flex flex-wrap gap-4 mb-16", children: buttons.map((btn, i) => {
                                const Icon = getIcon(btn.icon) || ArrowRight;
                                if (btn.variant === "primary") {
                                    return (_jsxs(Button, { size: "lg", onClick: () => handleClick(btn), className: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg", children: [btn.label, _jsx(Icon, { className: "ml-2 w-4 h-4" })] }, i));
                                }
                                return (_jsx(Button, { size: "lg", onClick: () => handleClick(btn), variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: btn.label }, i));
                            }) }), _jsx("div", { className: "grid grid-cols-3 gap-6 border-t border-white/10 pt-8", children: stats.map((stat, i) => {
                                const Icon = getIcon(stat.icon);
                                return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "p-2 bg-blue-600/20 rounded-lg", children: Icon && (_jsx(Icon, { className: "text-blue-400 w-5 h-5" })) }), _jsx("span", { className: "text-2xl md:text-3xl font-bold text-white", children: stat.value })] }), _jsx("p", { className: "text-gray-400 text-sm", children: stat.label })] }, i));
                            }) })] }) }), _jsx("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs", children: "Scroll \u2193" })] }));
}
