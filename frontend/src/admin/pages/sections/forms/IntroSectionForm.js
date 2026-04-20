import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Trash2 } from "lucide-react";
export default function IntroSectionForm({ content, onChange }) {
    const update = (key, value) => onChange({ ...content, [key]: value });
    /* ================= PILLARS ================= */
    const updatePillar = (i, key, value) => {
        const pillars = [...(content.pillars || [])];
        pillars[i] = { ...pillars[i], [key]: value };
        update("pillars", pillars);
    };
    const addPillar = () => {
        update("pillars", [
            ...(content.pillars || []),
            { icon: "Target", title: "", description: "" },
        ]);
    };
    const removePillar = (i) => {
        update("pillars", (content.pillars || []).filter((_, idx) => idx !== i));
    };
    /* ================= IMAGE STATS ================= */
    const updateStat = (i, key, value) => {
        const stats = [...(content.imageStats || [])];
        stats[i] = { ...stats[i], [key]: value };
        update("imageStats", stats);
    };
    const addStat = () => {
        update("imageStats", [
            ...(content.imageStats || []),
            { label: "", value: "" },
        ]);
    };
    const removeStat = (i) => {
        update("imageStats", (content.imageStats || []).filter((_, idx) => idx !== i));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Badge" }), _jsx("input", { value: content.badge || "", onChange: (e) => update("badge", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Heading" }), _jsx("textarea", { value: content.heading || "", onChange: (e) => update("heading", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Quote" }), _jsx("textarea", { value: content.quote || "", onChange: (e) => update("quote", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Description" }), _jsx("textarea", { value: content.description || "", onChange: (e) => update("description", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("h4", { className: "font-medium", children: "Pillars" }), _jsx("button", { onClick: addPillar, children: _jsx(Plus, { size: 14 }) })] }), (content.pillars || []).map((pillar, i) => (_jsxs("div", { className: "border p-3 rounded mb-2", children: [_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { placeholder: "Icon", value: pillar.icon, onChange: (e) => updatePillar(i, "icon", e.target.value), className: "border p-2 rounded" }), _jsx("input", { placeholder: "Title", value: pillar.title, onChange: (e) => updatePillar(i, "title", e.target.value), className: "border p-2 rounded flex-1" }), _jsx("button", { onClick: () => removePillar(i), children: _jsx(Trash2, { size: 14 }) })] }), _jsx("textarea", { placeholder: "Description", value: pillar.description, onChange: (e) => updatePillar(i, "description", e.target.value), className: "w-full border p-2 rounded" })] }, i)))] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("h4", { className: "font-medium", children: "Image Stats" }), _jsx("button", { onClick: addStat, children: _jsx(Plus, { size: 14 }) })] }), (content.imageStats || []).map((stat, i) => (_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { placeholder: "Label", value: stat.label, onChange: (e) => updateStat(i, "label", e.target.value), className: "border p-2 rounded" }), _jsx("input", { placeholder: "Value", value: stat.value, onChange: (e) => updateStat(i, "value", e.target.value), className: "border p-2 rounded" }), _jsx("button", { onClick: () => removeStat(i), children: _jsx(Trash2, { size: 14 }) })] }, i)))] })] }));
}
