import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Layout, FileText } from "lucide-react";
import CustomPages from "@/admin/pages/sections/CustomPages";
import WebsiteSections from "@/admin/pages/sections/WebsiteSections";
/* ================= TABS ================= */
const tabs = [
    { id: "sections", label: "Website Sections", icon: Layout },
    { id: "pages", label: "Custom Pages", icon: FileText },
];
export default function Pages() {
    const [activeTab, setActiveTab] = useState("sections");
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-800", children: "Pages Management" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage website sections and pages" })] }), _jsx("div", { className: "flex gap-1 bg-slate-100 rounded-lg p-1 w-fit", children: tabs.map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab.id
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"}`, children: [_jsx(tab.icon, { size: 16 }), tab.label] }, tab.id))) }), _jsxs("div", { className: "bg-white border rounded-xl p-4", children: [activeTab === "sections" && _jsx(WebsiteSections, {}), activeTab === "pages" && _jsx(CustomPages, {})] })] }));
}
