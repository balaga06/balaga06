import { Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function FooterSectionForm({ content, onChange }: Props) {

  const update = (key: string, value: any) =>
    onChange({ ...content, [key]: value });

  const updateList = (key: string, index: number, field: string, value: string) => {
    const list = [...(content[key] || [])];
    list[index] = { ...list[index], [field]: value };
    update(key, list);
  };

  const addItem = (key: string) => {
    update(key, [...(content[key] || []), { label: "", href: "" }]);
  };

  const removeItem = (key: string, index: number) => {
    update(
      key,
      (content[key] || []).filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="space-y-6">

      {/* ================= BRAND ================= */}
      <div>
        <h4 className="font-medium mb-2">Brand Info</h4>

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Brand Title"
            value={content.brandTitle || ""}
            onChange={(e) => update("brandTitle", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Brand Subtitle"
            value={content.brandSubtitle || ""}
            onChange={(e) => update("brandSubtitle", e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          placeholder="Description"
          value={content.description || ""}
          onChange={(e) => update("description", e.target.value)}
          className="w-full border p-2 rounded mt-2"
        />
      </div>

      {/* ================= CONTACT ================= */}
      <div>
        <h4 className="font-medium mb-2">Contact Info</h4>

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Address"
            value={content.address || ""}
            onChange={(e) => update("address", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Phone"
            value={content.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Email"
            value={content.email || ""}
            onChange={(e) => update("email", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Working Hours"
            value={content.hours || ""}
            onChange={(e) => update("hours", e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* ================= QUICK LINKS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-medium">Quick Links</h4>
          <button onClick={() => addItem("quickLinks")}>
            <Plus size={14} />
          </button>
        </div>

        {(content.quickLinks || []).map((item: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateList("quickLinks", i, "label", e.target.value)}
              className="flex-1 border p-2 rounded"
            />

            <input
              placeholder="URL"
              value={item.href}
              onChange={(e) => updateList("quickLinks", i, "href", e.target.value)}
              className="flex-1 border p-2 rounded"
            />

            <button onClick={() => removeItem("quickLinks", i)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ================= SOCIAL ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-medium">Social Links</h4>
          <button onClick={() => addItem("socialLinks")}>
            <Plus size={14} />
          </button>
        </div>

        {(content.socialLinks || []).map((item: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateList("socialLinks", i, "label", e.target.value)}
              className="flex-1 border p-2 rounded"
            />

            <input
              placeholder="URL"
              value={item.href}
              onChange={(e) => updateList("socialLinks", i, "href", e.target.value)}
              className="flex-1 border p-2 rounded"
            />

            <button onClick={() => removeItem("socialLinks", i)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div>
        <h4 className="font-medium mb-2">Copyright</h4>

        <input
          placeholder="© 2026 IQAC"
          value={content.copyright || ""}
          onChange={(e) => update("copyright", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

    </div>
  );
}