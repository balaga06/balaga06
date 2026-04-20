import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function EditorRenderer({ data }) {
    if (!data?.blocks?.length)
        return null;
    return (_jsx("div", { className: "editor-renderer space-y-6 leading-relaxed", children: data.blocks.map((block, i) => (_jsx(Block, { type: block.type, data: block.data }, block.id || i))) }));
}
/* ================= BLOCK RENDERER ================= */
function Block({ type, data }) {
    switch (type) {
        /* ---------- PARAGRAPH ---------- */
        case "paragraph":
            return (_jsx("p", { className: "text-gray-700 text-base leading-7", dangerouslySetInnerHTML: { __html: data.text } }));
        /* ---------- HEADER ---------- */
        case "header": {
            const level = Math.min(Math.max(data.level || 2, 1), 6);
            const Tag = `h${level}`;
            const styles = {
                1: "text-4xl font-bold text-[#7a1f2b]",
                2: "text-3xl font-bold text-[#7a1f2b]",
                3: "text-2xl font-semibold text-[#1f2937]",
                4: "text-xl font-semibold text-[#1f2937]",
                5: "text-lg font-semibold text-[#1f2937]",
                6: "text-base font-semibold text-[#1f2937]",
            };
            return (_jsx(Tag, { className: `${styles[level]} mt-4`, dangerouslySetInnerHTML: { __html: data.text } }));
        }
        /* ---------- LIST (FIXED JSX ERROR) ---------- */
        case "list": {
            const ListTag = data.style === "ordered" ? "ol" : "ul";
            const listClass = data.style === "ordered"
                ? "list-decimal pl-6 space-y-2"
                : "list-disc pl-6 space-y-2";
            const renderItems = (items) => items.map((item, i) => {
                const text = typeof item === "string" ? item : item.content;
                const children = typeof item === "object" && item.items?.length
                    ? item.items
                    : [];
                return (_jsxs("li", { className: "text-gray-700", children: [_jsx("span", { dangerouslySetInnerHTML: { __html: text } }), children.length > 0 && (_jsx(ListTag, { className: listClass, children: renderItems(children) }))] }, i));
            });
            return _jsx(ListTag, { className: listClass, children: renderItems(data.items) });
        }
        /* ---------- CHECKLIST ---------- */
        case "checklist":
            return (_jsx("div", { className: "space-y-2", children: data.items?.map((item, i) => (_jsxs("label", { className: "flex items-start gap-2 text-gray-700", children: [_jsx("input", { type: "checkbox", checked: item.checked, readOnly: true }), _jsx("span", { dangerouslySetInnerHTML: { __html: item.text } })] }, i))) }));
        /* ---------- IMAGE ---------- */
        case "image":
            return (_jsxs("div", { className: "my-6", children: [_jsx("img", { src: data.file?.url, alt: data.caption || "image", className: "rounded-xl shadow-md w-full" }), data.caption && (_jsx("p", { className: "text-center text-sm text-gray-500 mt-2", children: data.caption }))] }));
        /* ---------- QUOTE ---------- */
        case "quote":
            return (_jsxs("blockquote", { className: "border-l-4 border-[#d4a853] bg-[#f9f6f2] p-4 rounded-r-lg", children: [_jsx("p", { className: "italic text-gray-800", dangerouslySetInnerHTML: { __html: data.text } }), data.caption && (_jsxs("span", { className: "text-sm text-gray-500 block mt-2", children: ["\u2014 ", data.caption] }))] }));
        /* ---------- CODE ---------- */
        case "code":
            return (_jsx("pre", { className: "bg-[#111827] text-white p-4 rounded-lg overflow-x-auto text-sm", children: _jsx("code", { children: data.code }) }));
        /* ---------- TABLE ---------- */
        case "table":
            return (_jsx("div", { className: "overflow-x-auto border rounded-lg", children: _jsx("table", { className: "w-full text-sm", children: _jsx("tbody", { children: data.content?.map((row, i) => (_jsx("tr", { className: "border-t", children: row.map((cell, j) => (_jsx("td", { className: "p-3", dangerouslySetInnerHTML: { __html: cell } }, j))) }, i))) }) }) }));
        /* ---------- DEFAULT ---------- */
        default:
            return null;
    }
}
