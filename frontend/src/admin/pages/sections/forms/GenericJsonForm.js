import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default function GenericJsonForm({ content, onChange }) {
    const [raw, setRaw] = useState(JSON.stringify(content, null, 2));
    const [error, setError] = useState(null);
    /* ✅ Sync when content changes */
    useEffect(() => {
        setRaw(JSON.stringify(content, null, 2));
    }, [content]);
    const handleChange = (value) => {
        setRaw(value);
        try {
            const parsed = JSON.parse(value);
            setError(null);
            onChange(parsed);
        }
        catch (e) {
            setError(e.message);
        }
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700", children: "Raw JSON Content" }), _jsx("p", { className: "text-xs text-slate-500", children: "Edit JSON manually (for advanced sections)" })] }), _jsx("textarea", { value: raw, onChange: (e) => handleChange(e.target.value), rows: 16, spellCheck: false, className: `w-full px-3 py-2 border rounded-lg font-mono text-sm focus:outline-none transition ${error
                    ? "border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50"
                    : "border-slate-300 focus:ring-2 focus:ring-indigo-500"}` }), error && (_jsxs("div", { className: "text-sm text-red-600", children: ["\u274C Invalid JSON: ", error] })), _jsx("div", { className: "text-xs text-slate-500", children: "\u26A0\uFE0F Make sure JSON is valid before saving." })] }));
}
