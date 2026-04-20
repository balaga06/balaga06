import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Quote, Target } from "lucide-react";
import { useSection } from "@/context/SectionContext";
import { getMedia } from "@/admin/services/media.api";
import { getIcon } from "@/lib/iconMap";
/* ================= FALLBACK ================= */
const fallback = {
    badge: "About IQAC",
    heading: "Internal Quality Assurance Cell",
    description: "The Internal Quality Assurance Cell (IQAC) plays a vital role in maintaining academic standards and continuous improvement.",
    quote: "Quality assurance is a continuous process that strengthens academic excellence.",
    pillars: [
        {
            icon: "Target",
            title: "IQAC Objectives",
            description: "Continuous academic and administrative improvement.",
        },
        {
            icon: "Eye",
            title: "Quality Vision",
            description: "Promoting quality culture and accreditation.",
        },
        {
            icon: "ShieldCheck",
            title: "Core Values",
            description: "Transparency, accountability and excellence.",
        },
    ],
};
export default function Intro() {
    const data = useSection("iqac_intro") || fallback;
    const [image, setImage] = useState("");
    /* ================= FETCH IMAGE ================= */
    useEffect(() => {
        const loadImage = async () => {
            try {
                const media = await getMedia();
                if (!Array.isArray(media))
                    return;
                const img = media.find((m) => m.section === "intro");
                if (img) {
                    const path = img.file_path || img.url || img.path;
                    if (path) {
                        const fullUrl = path.startsWith("http")
                            ? path
                            : `http://localhost:5000${path}`;
                        setImage(fullUrl);
                    }
                }
            }
            catch (err) {
                console.log("Intro image load failed", err);
            }
        };
        loadImage();
    }, []);
    const pillars = data?.pillars || fallback.pillars;
    return (
    /* ✅ FIXED HEIGHT HERE */
    _jsxs("section", { className: "relative min-h-[70vh] overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("img", { src: image && image.startsWith("http")
                            ? image
                            : "/images/jntuk-gate.jpg", onError: (e) => {
                            e.currentTarget.src = "/images/jntuk-gate.jpg";
                        }, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#0a192f]/85 to-[#020617]/95" })] }), _jsxs("div", { className: "relative z-10 max-w-5xl mx-auto px-6 text-center py-16", children: [_jsx(Badge, { className: "mb-6 bg-white/10 text-white border border-white/20 px-4 py-1.5 backdrop-blur-sm", children: data?.badge || fallback.badge }), _jsx("h2", { className: "text-4xl md:text-5xl font-bold text-white mb-6", children: data?.heading || fallback.heading }), _jsx("p", { className: "text-lg text-gray-300 mb-10", children: data?.description || fallback.description }), _jsxs("div", { className: "max-w-3xl mx-auto mb-10", children: [_jsx(Quote, { className: "mx-auto mb-4 text-blue-400 w-6 h-6" }), _jsxs("p", { className: "italic text-lg text-white/90", children: ["\"", data?.quote || fallback.quote, "\""] })] })] }), _jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-8", children: pillars.map((p, i) => {
                    const Icon = getIcon(p.icon) || Target;
                    return (_jsxs("div", { className: "p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-blue-400/40 transition", children: [_jsx("div", { className: "mb-4 p-3 bg-blue-600/20 text-blue-400 rounded-lg w-fit", children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsx("h3", { className: "text-white font-semibold text-lg mb-2", children: p.title }), _jsx("p", { className: "text-gray-400 text-sm", children: p.description })] }, i));
                }) })] }));
}
