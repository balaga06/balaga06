import React from "react";
import type { OutputData } from "@editorjs/editorjs";

interface Props {
  data: OutputData;
}

export default function EditorRenderer({ data }: Props) {
  if (!data?.blocks?.length) return null;

  return (
    <div className="editor-renderer space-y-6 leading-relaxed">
      {data.blocks.map((block, i) => (
        <Block key={block.id || i} type={block.type} data={block.data} />
      ))}
    </div>
  );
}

/* ================= BLOCK RENDERER ================= */

function Block({ type, data }: { type: string; data: any }) {
  switch (type) {

    /* ---------- PARAGRAPH ---------- */
    case "paragraph":
      return (
        <p
          className="text-gray-700 text-base leading-7"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      );

    /* ---------- HEADER ---------- */
    case "header": {
      const level = Math.min(Math.max(data.level || 2, 1), 6);
      const Tag = (`h${level}` as unknown) as React.ElementType;

      const styles: Record<number, string> = {
        1: "text-4xl font-bold text-[#7a1f2b]",
        2: "text-3xl font-bold text-[#7a1f2b]",
        3: "text-2xl font-semibold text-[#1f2937]",
        4: "text-xl font-semibold text-[#1f2937]",
        5: "text-lg font-semibold text-[#1f2937]",
        6: "text-base font-semibold text-[#1f2937]",
      };

      return (
        <Tag
          className={`${styles[level]} mt-4`}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      );
    }

    /* ---------- LIST (FIXED JSX ERROR) ---------- */
    case "list": {
      const ListTag = data.style === "ordered" ? "ol" : "ul";

      const listClass =
        data.style === "ordered"
          ? "list-decimal pl-6 space-y-2"
          : "list-disc pl-6 space-y-2";

      const renderItems = (items: any[]): React.ReactNode[] =>
        items.map((item: any, i: number) => {
          const text = typeof item === "string" ? item : item.content;
          const children =
            typeof item === "object" && item.items?.length
              ? item.items
              : [];

          return (
            <li key={i} className="text-gray-700">
              <span dangerouslySetInnerHTML={{ __html: text }} />
              {children.length > 0 && (
                <ListTag className={listClass}>
                  {renderItems(children)}
                </ListTag>
              )}
            </li>
          );
        });

      return <ListTag className={listClass}>{renderItems(data.items)}</ListTag>;
    }

    /* ---------- CHECKLIST ---------- */
    case "checklist":
      return (
        <div className="space-y-2">
          {data.items?.map((item: any, i: number) => (
            <label key={i} className="flex items-start gap-2 text-gray-700">
              <input type="checkbox" checked={item.checked} readOnly />
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
            </label>
          ))}
        </div>
      );

    /* ---------- IMAGE ---------- */
    case "image":
      return (
        <div className="my-6">
          <img
            src={data.file?.url}
            alt={data.caption || "image"}
            className="rounded-xl shadow-md w-full"
          />
          {data.caption && (
            <p className="text-center text-sm text-gray-500 mt-2">
              {data.caption}
            </p>
          )}
        </div>
      );

    /* ---------- QUOTE ---------- */
    case "quote":
      return (
        <blockquote className="border-l-4 border-[#d4a853] bg-[#f9f6f2] p-4 rounded-r-lg">
          <p
            className="italic text-gray-800"
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
          {data.caption && (
            <span className="text-sm text-gray-500 block mt-2">
              — {data.caption}
            </span>
          )}
        </blockquote>
      );

    /* ---------- CODE ---------- */
    case "code":
      return (
        <pre className="bg-[#111827] text-white p-4 rounded-lg overflow-x-auto text-sm">
          <code>{data.code}</code>
        </pre>
      );

    /* ---------- TABLE ---------- */
    case "table":
      return (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <tbody>
              {data.content?.map((row: any[], i: number) => (
                <tr key={i} className="border-t">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="p-3"
                      dangerouslySetInnerHTML={{ __html: cell }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    /* ---------- DEFAULT ---------- */
    default:
      return null;
  }
}