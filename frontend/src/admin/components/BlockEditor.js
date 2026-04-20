import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useCallback, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Warning from "@editorjs/warning";
export default function BlockEditor({ data, onChange }) {
    const editorRef = useRef(null);
    const holderRef = useRef(null);
    const isReady = useRef(false);
    const [loading, setLoading] = useState(true);
    /* ================= INIT ================= */
    const initEditor = useCallback(() => {
        if (editorRef.current || !holderRef.current)
            return;
        const editor = new EditorJS({
            holder: holderRef.current,
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: true,
                    config: {
                        placeholder: "Enter heading",
                        levels: [2, 3, 4],
                        defaultLevel: 2,
                    },
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                },
                delimiter: {
                    class: Delimiter,
                },
                code: {
                    class: Code,
                },
                table: {
                    class: Table,
                    inlineToolbar: true,
                },
                inlineCode: {
                    class: InlineCode,
                },
                marker: {
                    class: Marker,
                },
                warning: {
                    class: Warning,
                    inlineToolbar: true,
                },
            },
            data: data || { blocks: [] },
            placeholder: "Start writing your page content...",
            onChange: async () => {
                if (!editorRef.current || !isReady.current)
                    return;
                try {
                    const output = await editorRef.current.save();
                    onChange?.(output);
                }
                catch (err) {
                    console.error("Editor save error:", err);
                }
            },
            onReady: () => {
                isReady.current = true;
                setLoading(false);
            },
        });
        editorRef.current = editor;
    }, [data, onChange]);
    /* ================= LIFECYCLE ================= */
    useEffect(() => {
        initEditor();
        return () => {
            if (editorRef.current && isReady.current) {
                editorRef.current.destroy();
                editorRef.current = null;
                isReady.current = false;
            }
        };
    }, [initEditor]);
    /* ================= UI ================= */
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-slate-800", children: "Content Editor" }), _jsx("p", { className: "text-sm text-slate-500", children: "Build your page content using blocks (headings, lists, tables, etc.)" })] }), _jsxs("div", { className: "bg-white border rounded-xl overflow-hidden", children: [_jsxs("div", { className: "px-4 py-2 border-b bg-slate-50 text-xs text-slate-500 flex justify-between", children: [_jsx("span", { children: "Editor.js" }), _jsx("span", { children: "Blocks Enabled" })] }), loading && (_jsx("div", { className: "p-6 text-center text-sm text-slate-500", children: "Loading editor..." })), _jsx("div", { ref: holderRef, className: "min-h-[350px] px-4 py-3 prose prose-sm max-w-none\r\n          [&_.ce-block__content]:max-w-none\r\n          [&_.ce-toolbar__content]:max-w-none\r\n          focus-within:ring-2 focus-within:ring-indigo-500 transition" })] })] }));
}
/* ================= SAVE HELPER ================= */
export async function saveEditor(editorRef) {
    if (!editorRef.current)
        return null;
    try {
        return await editorRef.current.save();
    }
    catch {
        return null;
    }
}
