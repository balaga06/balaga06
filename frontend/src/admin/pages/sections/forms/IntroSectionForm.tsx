import { Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function IntroSectionForm({ content, onChange }: Props) {

  const update = (key: string, value: any) =>
    onChange({ ...content, [key]: value });

  /* ================= PILLARS ================= */
  const updatePillar = (i: number, key: string, value: string) => {
    const pillars = [...(content.pillars || [])];
    pillars[i] = { ...pillars[i], [key]: value };
    update("pillars", pillars);
  };

  const addPillar = () => {
    update("pillars", [
      ...(content.pillars || []),
      { icon: "Target", title: "", description: "" },
    ]);
  };

  const removePillar = (i: number) => {
    update(
      "pillars",
      (content.pillars || []).filter((_: any, idx: number) => idx !== i)
    );
  };

  /* ================= IMAGE STATS ================= */
  const updateStat = (i: number, key: string, value: string) => {
    const stats = [...(content.imageStats || [])];
    stats[i] = { ...stats[i], [key]: value };
    update("imageStats", stats);
  };

  const addStat = () => {
    update("imageStats", [
      ...(content.imageStats || []),
      { label: "", value: "" },
    ]);
  };

  const removeStat = (i: number) => {
    update(
      "imageStats",
      (content.imageStats || []).filter((_: any, idx: number) => idx !== i)
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
        <label className="text-sm font-medium">Heading</label>
        <textarea
          value={content.heading || ""}
          onChange={(e) => update("heading", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Quote</label>
        <textarea
          value={content.quote || ""}
          onChange={(e) => update("quote", e.target.value)}
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

      {/* ================= PILLARS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-medium">Pillars</h4>
          <button onClick={addPillar}>
            <Plus size={14} />
          </button>
        </div>

        {(content.pillars || []).map((pillar: any, i: number) => (
          <div key={i} className="border p-3 rounded mb-2">

            <div className="flex gap-2 mb-2">
              <input
                placeholder="Icon"
                value={pillar.icon}
                onChange={(e) => updatePillar(i, "icon", e.target.value)}
                className="border p-2 rounded"
              />

              <input
                placeholder="Title"
                value={pillar.title}
                onChange={(e) => updatePillar(i, "title", e.target.value)}
                className="border p-2 rounded flex-1"
              />

              <button onClick={() => removePillar(i)}>
                <Trash2 size={14} />
              </button>
            </div>

            <textarea
              placeholder="Description"
              value={pillar.description}
              onChange={(e) => updatePillar(i, "description", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
      </div>

      {/* ================= IMAGE STATS ================= */}
      <div>
        <div className="flex justify-between mb-2">
          <h4 className="font-medium">Image Stats</h4>
          <button onClick={addStat}>
            <Plus size={14} />
          </button>
        </div>

        {(content.imageStats || []).map((stat: any, i: number) => (
          <div key={i} className="flex gap-2 mb-2">

            <input
              placeholder="Label"
              value={stat.label}
              onChange={(e) => updateStat(i, "label", e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Value"
              value={stat.value}
              onChange={(e) => updateStat(i, "value", e.target.value)}
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