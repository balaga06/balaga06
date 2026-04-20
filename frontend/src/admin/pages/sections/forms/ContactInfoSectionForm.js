import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, Trash2 } from "lucide-react";
export default function ContactInfoSectionForm({ content, onChange }) {
    const update = (key, value) => onChange({ ...content, [key]: value });
    const updateContactItem = (i, key, value) => {
        const items = [...(content.contactItems || [])];
        items[i] = { ...items[i], [key]: value };
        update("contactItems", items);
    };
    const addContactItem = () => {
        update("contactItems", [
            ...(content.contactItems || []),
            { icon: "MapPin", title: "", content: "", link: "" },
        ]);
    };
    const removeContactItem = (i) => {
        update("contactItems", (content.contactItems || []).filter((_, idx) => idx !== i));
    };
    const updateSocial = (i, key, value) => {
        const links = [...(content.socialLinks || [])];
        links[i] = { ...links[i], [key]: value };
        update("socialLinks", links);
    };
    const addSocial = () => {
        update("socialLinks", [
            ...(content.socialLinks || []),
            { icon: "Globe", label: "", href: "" },
        ]);
    };
    const removeSocial = (i) => {
        update("socialLinks", (content.socialLinks || []).filter((_, idx) => idx !== i));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "Contact Section" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage contact details and social links" })] }), _jsxs("div", { className: "bg-white border rounded-xl p-5 space-y-4", children: [_jsx("h4", { className: "font-medium text-slate-700", children: "Basic Info" }), _jsx("input", { placeholder: "Badge text", value: content.badge || "", onChange: (e) => update("badge", e.target.value), className: "w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" }), _jsx("input", { placeholder: "Heading", value: content.heading || "", onChange: (e) => update("heading", e.target.value), className: "w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" }), _jsx("textarea", { placeholder: "Subtitle", value: content.subtitle || "", onChange: (e) => update("subtitle", e.target.value), className: "w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" })] }), _jsxs("div", { className: "bg-white border rounded-xl p-5 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h4", { className: "font-medium text-slate-700", children: "Contact Items" }), _jsxs("button", { onClick: addContactItem, className: "flex items-center gap-1 text-indigo-600 text-sm", children: [_jsx(Plus, { size: 14 }), " Add"] })] }), (content.contactItems || []).map((item, i) => (_jsxs("div", { className: "border rounded-lg p-3 bg-slate-50 space-y-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { placeholder: "Icon", value: item.icon, onChange: (e) => updateContactItem(i, "icon", e.target.value), className: "w-28 px-2 py-1.5 border rounded text-xs" }), _jsx("input", { placeholder: "Title", value: item.title, onChange: (e) => updateContactItem(i, "title", e.target.value), className: "flex-1 px-2 py-1.5 border rounded text-sm" }), _jsx("button", { onClick: () => removeContactItem(i), className: "text-red-500", children: _jsx(Trash2, { size: 16 }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("input", { placeholder: "Content", value: item.content, onChange: (e) => updateContactItem(i, "content", e.target.value), className: "px-2 py-1.5 border rounded text-sm" }), _jsx("input", { placeholder: "Link", value: item.link, onChange: (e) => updateContactItem(i, "link", e.target.value), className: "px-2 py-1.5 border rounded text-sm" })] })] }, i)))] }), _jsxs("div", { className: "bg-white border rounded-xl p-5 space-y-4", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("h4", { className: "font-medium text-slate-700", children: "Social Links" }), _jsxs("button", { onClick: addSocial, className: "flex items-center gap-1 text-indigo-600 text-sm", children: [_jsx(Plus, { size: 14 }), " Add"] })] }), (content.socialLinks || []).map((link, i) => (_jsxs("div", { className: "flex gap-2 items-center", children: [_jsx("input", { placeholder: "Icon", value: link.icon, onChange: (e) => updateSocial(i, "icon", e.target.value), className: "w-24 px-2 py-1.5 border rounded text-xs" }), _jsx("input", { placeholder: "Label", value: link.label, onChange: (e) => updateSocial(i, "label", e.target.value), className: "flex-1 px-2 py-1.5 border rounded text-sm" }), _jsx("input", { placeholder: "URL", value: link.href, onChange: (e) => updateSocial(i, "href", e.target.value), className: "flex-1 px-2 py-1.5 border rounded text-sm" }), _jsx("button", { onClick: () => removeSocial(i), className: "text-red-500", children: _jsx(Trash2, { size: 16 }) })] }, i)))] }), _jsxs("div", { className: "bg-white border rounded-xl p-5 space-y-4", children: [_jsx("h4", { className: "font-medium text-slate-700", children: "Map Settings" }), _jsx("input", { placeholder: "Map Embed URL", value: content.mapEmbedUrl || "", onChange: (e) => update("mapEmbedUrl", e.target.value), className: "w-full px-3 py-2 border rounded-lg text-sm" }), _jsx("input", { placeholder: "Map Link URL", value: content.mapLinkUrl || "", onChange: (e) => update("mapLinkUrl", e.target.value), className: "w-full px-3 py-2 border rounded-lg text-sm" }), _jsx("input", { placeholder: "Map Label", value: content.mapLabel || "", onChange: (e) => update("mapLabel", e.target.value), className: "w-full px-3 py-2 border rounded-lg text-sm" })] })] }));
}
