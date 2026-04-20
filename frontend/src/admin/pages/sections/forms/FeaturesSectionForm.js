import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
export default function FeaturesSectionForm({ content, onChange }) {
    const [expanded, setExpanded] = useState(null);
    const update = (key, value) => onChange({ ...content, [key]: value });
    const updateCard = (i, key, value) => {
        const cards = [...(content.cards || [])];
        cards[i] = { ...cards[i], [key]: value };
        update("cards", cards);
    };
    const addCard = () => {
        const cards = [
            ...(content.cards || []),
            {
                title: "New Feature",
                description: "",
                icon: "Globe",
                stats: "",
                iconBg: "bg-blue-500",
                color: "from-blue-500/20 to-indigo-500/20",
            },
        ];
        update("cards", cards);
        setExpanded(cards.length - 1);
    };
    const removeCard = (i) => {
        update("cards", (content.cards || []).filter((_, idx) => idx !== i));
        setExpanded(null);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("input", { placeholder: "Badge", value: content.badge || "", onChange: (e) => update("badge", e.target.value), className: "w-full border p-2 rounded" }), _jsx("input", { placeholder: "Heading", value: content.heading || "", onChange: (e) => update("heading", e.target.value), className: "w-full border p-2 rounded" }), _jsx("textarea", { placeholder: "Subtitle", value: content.subtitle || "", onChange: (e) => update("subtitle", e.target.value), className: "w-full border p-2 rounded" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsxs("h4", { children: ["Feature Cards (", (content.cards || []).length, ")"] }), _jsx("button", { onClick: addCard, children: _jsx(Plus, { size: 14 }) })] }), (content.cards || []).map((card, i) => (_jsxs("div", { className: "border rounded mb-2", children: [_jsxs("div", { onClick: () => setExpanded(expanded === i ? null : i), className: "flex justify-between p-2 bg-gray-100 cursor-pointer", children: [_jsxs("div", { className: "flex gap-2 items-center", children: [expanded === i ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronRight, { size: 14 }), _jsx("span", { children: card.title || `Card ${i + 1}` })] }), _jsx("button", { onClick: (e) => { e.stopPropagation(); removeCard(i); }, children: _jsx(Trash2, { size: 14 }) })] }), expanded === i && (_jsxs("div", { className: "p-3 space-y-2", children: [_jsx("input", { placeholder: "Title", value: card.title, onChange: (e) => updateCard(i, "title", e.target.value) }), _jsx("input", { placeholder: "Stats", value: card.stats, onChange: (e) => updateCard(i, "stats", e.target.value) }), _jsx("textarea", { placeholder: "Description", value: card.description, onChange: (e) => updateCard(i, "description", e.target.value) }), _jsx("input", { placeholder: "Icon", value: card.icon, onChange: (e) => updateCard(i, "icon", e.target.value) }), _jsx("input", { placeholder: "Icon Bg", value: card.iconBg, onChange: (e) => updateCard(i, "iconBg", e.target.value) }), _jsx("input", { placeholder: "Gradient", value: card.color, onChange: (e) => updateCard(i, "color", e.target.value) })] }))] }, i)))] })] }));
}
