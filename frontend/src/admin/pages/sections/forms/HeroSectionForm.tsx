import { Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function HeroSectionForm({ content, onChange }: Props) {

  const update = (key: string, value: any) =>
    onChange({ ...content, [key]: value });

  /* ================= BUTTONS ================= */
  const updateButton = (i: number, key: string, value: string) => {
    const buttons = [...(content.buttons || [])];
    buttons[i] = { ...buttons[i], [key]: value };
    update("buttons", buttons);
  };

  const addButton = () => {
    update("buttons", [
      ...(content.buttons || []),
      {
        label: "",
        href: "",
        variant: "gold",
        icon: "ArrowRight",
      },
    ]);
  };

  const removeButton = (i: number) => {
    update(
      "buttons",
      (content.buttons || []).filter((_: any, idx: number) => idx !== i)
    );
  };

  /* ================= STATS ================= */
  const updateStat = (i: number, key: string, value: string) => {
    const stats = [...(content.stats || [])];
    stats[i] = { ...stats[i], [key]: value };
    update("stats", stats);
  };

  const addStat = () => {
    update("stats", [
      ...(content.stats || []),
      { value: "", label: "", icon: "Globe" },
    ]);
  };

  const removeStat = (i: number) => {
    update(
      "stats",
      (content.stats || []).filter((_: any, idx: number) => idx !== i)
    );
  };

  return (
    <div className="space-y-6">

      {/* ================= BASIC ================= */}
      <div>
        <label className="text-sm font-medium">Badge</label>
        <input
          value={content.badge || ""}
          onChange={(e) => update("badge", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Headline</label>
        <textarea
          value={content.headline || ""}
          onChange={(e) => update("headline", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={content.description || ""}
          onChange={(e) => update("description", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* ================= BUTTONS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-medium">CTA Buttons</h4>
          <button onClick={addButton}>
            <Plus size={14} />
          </button>
        </div>

        {(content.buttons || []).map((btn: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">

            <input
              placeholder="Label"
              value={btn.label}
              onChange={(e) => updateButton(i, "label", e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="URL"
              value={btn.href}
              onChange={(e) => updateButton(i, "href", e.target.value)}
              className="border p-2 rounded"
            />

            <select
              value={btn.variant}
              onChange={(e) => updateButton(i, "variant", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="gold">Gold</option>
              <option value="white">White</option>
            </select>

            <input
              placeholder="Icon"
              value={btn.icon}
              onChange={(e) => updateButton(i, "icon", e.target.value)}
              className="border p-2 rounded"
            />

            <button onClick={() => removeButton(i)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ================= STATS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-medium">Stats</h4>
          <button onClick={addStat}>
            <Plus size={14} />
          </button>
        </div>

        {(content.stats || []).map((stat: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">

            <input
              placeholder="Value"
              value={stat.value}
              onChange={(e) => updateStat(i, "value", e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Label"
              value={stat.label}
              onChange={(e) => updateStat(i, "label", e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Icon"
              value={stat.icon}
              onChange={(e) => updateStat(i, "icon", e.target.value)}
              className="border p-2 rounded"
            />

            <button onClick={() => removeStat(i)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}