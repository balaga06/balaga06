import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function FeaturesSectionForm({ content, onChange }: Props) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const update = (key: string, value: any) =>
    onChange({ ...content, [key]: value });

  const updateCard = (i: number, key: string, value: string) => {
    const cards = [...(content.cards || [])];
    cards[i] = { ...cards[i], [key]: value };
    update("cards", cards);
  };

  const addCard = () => {
    const cards = [
      ...(content.cards || []),
      {
        title: "New Feature",
        description: "",
        icon: "Globe",
        stats: "",
        iconBg: "bg-blue-500",
        color: "from-blue-500/20 to-indigo-500/20",
      },
    ];
    update("cards", cards);
    setExpanded(cards.length - 1);
  };

  const removeCard = (i: number) => {
    update(
      "cards",
      (content.cards || []).filter((_: any, idx: number) => idx !== i)
    );
    setExpanded(null);
  };

  return (
    <div className="space-y-6">

      {/* BASIC */}
      <div className="space-y-2">
        <input
          placeholder="Badge"
          value={content.badge || ""}
          onChange={(e) => update("badge", e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Heading"
          value={content.heading || ""}
          onChange={(e) => update("heading", e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Subtitle"
          value={content.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* CARDS */}
      <div>
        <div className="flex justify-between mb-2">
          <h4>Feature Cards ({(content.cards || []).length})</h4>
          <button onClick={addCard}>
            <Plus size={14} />
          </button>
        </div>

        {(content.cards || []).map((card: any, i: number) => (
          <div key={i} className="border rounded mb-2">

            {/* HEADER */}
            <div
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="flex justify-between p-2 bg-gray-100 cursor-pointer"
            >
              <div className="flex gap-2 items-center">
                {expanded === i ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span>{card.title || `Card ${i + 1}`}</span>
              </div>

              <button onClick={(e)=>{e.stopPropagation(); removeCard(i);}}>
                <Trash2 size={14} />
              </button>
            </div>

            {/* BODY */}
            {expanded === i && (
              <div className="p-3 space-y-2">

                <input
                  placeholder="Title"
                  value={card.title}
                  onChange={(e)=>updateCard(i,"title",e.target.value)}
                />

                <input
                  placeholder="Stats"
                  value={card.stats}
                  onChange={(e)=>updateCard(i,"stats",e.target.value)}
                />

                <textarea
                  placeholder="Description"
                  value={card.description}
                  onChange={(e)=>updateCard(i,"description",e.target.value)}
                />

                <input
                  placeholder="Icon"
                  value={card.icon}
                  onChange={(e)=>updateCard(i,"icon",e.target.value)}
                />

                <input
                  placeholder="Icon Bg"
                  value={card.iconBg}
                  onChange={(e)=>updateCard(i,"iconBg",e.target.value)}
                />

                <input
                  placeholder="Gradient"
                  value={card.color}
                  onChange={(e)=>updateCard(i,"color",e.target.value)}
                />

              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}