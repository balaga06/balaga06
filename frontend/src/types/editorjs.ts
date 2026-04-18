/* src/types/editorjs.ts */

/* ================= BLOCK TYPES ================= */

export type HeaderBlock = {
  type: "header";
  data: {
    text: string;
    level: number;
  };
};

export type ParagraphBlock = {
  type: "paragraph";
  data: {
    text: string;
  };
};

export type ListBlock = {
  type: "list";
  data: {
    style: "ordered" | "unordered";
    items: string[];
  };
};

export type ChecklistBlock = {
  type: "checklist";
  data: {
    items: {
      text: string;
      checked: boolean;
    }[];
  };
};

export type QuoteBlock = {
  type: "quote";
  data: {
    text: string;
    caption?: string;
  };
};

export type CodeBlock = {
  type: "code";
  data: {
    code: string;
  };
};

export type TableBlock = {
  type: "table";
  data: {
    content: string[][];
  };
};

export type WarningBlock = {
  type: "warning";
  data: {
    title: string;
    message: string;
  };
};

export type DelimiterBlock = {
  type: "delimiter";
  data: {};
};

export type MarkerBlock = {
  type: "marker";
  data: {
    text: string;
  };
};

export type InlineCodeBlock = {
  type: "inlineCode";
  data: {
    text: string;
  };
};

/* ================= UNION TYPE ================= */

export type OutputBlock =
  | HeaderBlock
  | ParagraphBlock
  | ListBlock
  | ChecklistBlock
  | QuoteBlock
  | CodeBlock
  | TableBlock
  | WarningBlock
  | DelimiterBlock
  | MarkerBlock
  | InlineCodeBlock;

/* ================= MAIN OUTPUT ================= */

export interface OutputData {
  time?: number;
  version?: string;
  blocks: OutputBlock[];
}