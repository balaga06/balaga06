import { useEffect, useRef, useCallback, useState } from "react";
import EditorJS, { type OutputData } from "@editorjs/editorjs";

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

interface Props {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

export default function BlockEditor({ data, onChange }: Props) {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const isReady = useRef(false);
  const [loading, setLoading] = useState(true);

  /* ================= INIT ================= */
  const initEditor = useCallback(() => {
    if (editorRef.current || !holderRef.current) return;

    const editor = new EditorJS({
      holder: holderRef.current,

      tools: {
        header: {
          class: Header as any,
          inlineToolbar: true,
          config: {
            placeholder: "Enter heading",
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        list: {
          class: List as any,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist as any,
          inlineToolbar: true,
        },
        quote: {
          class: Quote as any,
          inlineToolbar: true,
        },
        delimiter: {
          class: Delimiter as any,
        },
        code: {
          class: Code as any,
        },
        table: {
          class: Table as any,
          inlineToolbar: true,
        },
        inlineCode: {
          class: InlineCode as any,
        },
        marker: {
          class: Marker as any,
        },
        warning: {
          class: Warning as any,
          inlineToolbar: true,
        },
      },

      data: data || { blocks: [] },

      placeholder: "Start writing your page content...",

      onChange: async () => {
        if (!editorRef.current || !isReady.current) return;

        try {
          const output = await editorRef.current.save();
          onChange?.(output);
        } catch (err) {
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
  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Content Editor
        </h3>
        <p className="text-sm text-slate-500">
          Build your page content using blocks (headings, lists, tables, etc.)
        </p>
      </div>

      {/* EDITOR CARD */}
      <div className="bg-white border rounded-xl overflow-hidden">

        {/* TOP BAR */}
        <div className="px-4 py-2 border-b bg-slate-50 text-xs text-slate-500 flex justify-between">
          <span>Editor.js</span>
          <span>Blocks Enabled</span>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="p-6 text-center text-sm text-slate-500">
            Loading editor...
          </div>
        )}

        {/* EDITOR */}
        <div
          ref={holderRef}
          className="min-h-[350px] px-4 py-3 prose prose-sm max-w-none
          [&_.ce-block__content]:max-w-none
          [&_.ce-toolbar__content]:max-w-none
          focus-within:ring-2 focus-within:ring-indigo-500 transition"
        />
      </div>
    </div>
  );
}

/* ================= SAVE HELPER ================= */
export async function saveEditor(
  editorRef: React.RefObject<EditorJS | null>
): Promise<OutputData | null> {
  if (!editorRef.current) return null;

  try {
    return await editorRef.current.save();
  } catch {
    return null;
  }
}