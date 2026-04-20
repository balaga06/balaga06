import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Trash2 } from "lucide-react";
export default function HeroSectionForm({ content, onChange }) {
    const update = (key, value) => onChange({ ...content, [key]: value });
    /* ================= BUTTONS ================= */
    const updateButton = (i, key, value) => {
        const buttons = [...(content.buttons || [])];
        buttons[i] = { ...buttons[i], [key]: value };
        update("buttons", buttons);
    };
    const addButton = () => {
        update("buttons", [
            ...(content.buttons || []),
            {
                label: "",
                href: "",
                variant: "gold",
                icon: "ArrowRight",
            },
        ]);
    };
    const removeButton = (i) => {
        update("buttons", (content.buttons || []).filter((_, idx) => idx !== i));
    };
    /* ================= STATS ================= */
    const updateStat = (i, key, value) => {
        const stats = [...(content.stats || [])];
        stats[i] = { ...stats[i], [key]: value };
        update("stats", stats);
    };
    const addStat = () => {
        update("stats", [
            ...(content.stats || []),
            { value: "", label: "", icon: "Globe" },
        ]);
    };
    const removeStat = (i) => {
        update("stats", (content.stats || []).filter((_, idx) => idx !== i));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Badge" }), _jsx("input", { value: content.badge || "", onChange: (e) => update("badge", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Headline" }), _jsx("textarea", { value: content.headline || "", onChange: (e) => update("headline", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Description" }), _jsx("textarea", { value: content.description || "", onChange: (e) => update("description", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("h4", { className: "font-medium", children: "CTA Buttons" }), _jsx("button", { onClick: addButton, children: _jsx(Plus, { size: 14 }) })] }), (content.buttons || []).map((btn, i) => (_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { placeholder: "Label", value: btn.label, onChange: (e) => updateButton(i, "label", e.target.value), className: "border p-2 rounded" }), _jsx("input", { placeholder: "URL", value: btn.href, onChange: (e) => updateButton(i, "href", e.target.value), className: "border p-2 rounded" }), _jsxs("select", { value: btn.variant, onChange: (e) => updateButton(i, "variant", e.target.value), className: "border p-2 rounded", children: [_jsx("option", { value: "gold", children: "Gold" }), _jsx("option", { value: "white", children: "White" })] }), _jsx("input", { placeholder: "Icon", value: btn.icon, onChange: (e) => updateButton(i, "icon", e.target.value), className: "border p-2 rounded" }), _jsx("button", { onClick: () => removeButton(i), children: _jsx(Trash2, { size: 14 }) })] }, i)))] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("h4", { className: "font-medium", children: "Stats" }), _jsx("button", { onClick: addStat, children: _jsx(Plus, { size: 14 }) })] }), (content.stats || []).map((stat, i) => (_jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx("input", { placeholder: "Value", value: stat.value, onChange: (e) => updateStat(i, "value", e.target.value), className: "border p-2 rounded" }), _jsx("input", { placeholder: "Label", value: stat.label, onChange: (e) => updateStat(i, "label", e.target.value), className: "border p-2 rounded" }), _jsx("input", { placeholder: "Icon", value: stat.icon, onChange: (e) => updateStat(i, "icon", e.target.value), className: "border p-2 rounded" }), _jsx("button", { onClick: () => removeStat(i), children: _jsx(Trash2, { size: 14 }) })] }, i)))] })] }));
}
