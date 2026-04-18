import { useState, useEffect } from "react";

interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function GenericJsonForm({ content, onChange }: Props) {
  const [raw, setRaw] = useState(JSON.stringify(content, null, 2));
  const [error, setError] = useState<string | null>(null);

  /* ✅ Sync when content changes */
  useEffect(() => {
    setRaw(JSON.stringify(content, null, 2));
  }, [content]);

  const handleChange = (value: string) => {
    setRaw(value);

    try {
      const parsed = JSON.parse(value);
      setError(null);
      onChange(parsed);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-3">

      {/* HEADER */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Raw JSON Content
        </label>
        <p className="text-xs text-slate-500">
          Edit JSON manually (for advanced sections)
        </p>
      </div>

      {/* EDITOR */}
      <textarea
        value={raw}
        onChange={(e) => handleChange(e.target.value)}
        rows={16}
        spellCheck={false}
        className={`w-full px-3 py-2 border rounded-lg font-mono text-sm focus:outline-none transition ${
          error
            ? "border-red-300 focus:ring-2 focus:ring-red-200 bg-red-50"
            : "border-slate-300 focus:ring-2 focus:ring-indigo-500"
        }`}
      />

      {/* ERROR */}
      {error && (
        <div className="text-sm text-red-600">
          ❌ Invalid JSON: {error}
        </div>
      )}

      {/* INFO */}
      <div className="text-xs text-slate-500">
        ⚠️ Make sure JSON is valid before saving.
      </div>

    </div>
  );
}