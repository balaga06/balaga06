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

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Pages Management
        </h1>
        <p className="text-sm text-slate-500">
          Manage website sections and pages
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="bg-white border rounded-xl p-4">

        {activeTab === "sections" && <WebsiteSections />}

        {activeTab === "pages" && <CustomPages />}

      </div>
    </div>
  );
}