import { Plus, Trash2 } from "lucide-react";

interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function ContactInfoSectionForm({ content, onChange }: Props) {
  const update = (key: string, value: any) =>
    onChange({ ...content, [key]: value });

  const updateContactItem = (i: number, key: string, value: string) => {
    const items = [...(content.contactItems || [])];
    items[i] = { ...items[i], [key]: value };
    update("contactItems", items);
  };

  const addContactItem = () => {
    update("contactItems", [
      ...(content.contactItems || []),
      { icon: "MapPin", title: "", content: "", link: "" },
    ]);
  };

  const removeContactItem = (i: number) => {
    update(
      "contactItems",
      (content.contactItems || []).filter((_: any, idx: number) => idx !== i)
    );
  };

  const updateSocial = (i: number, key: string, value: string) => {
    const links = [...(content.socialLinks || [])];
    links[i] = { ...links[i], [key]: value };
    update("socialLinks", links);
  };

  const addSocial = () => {
    update("socialLinks", [
      ...(content.socialLinks || []),
      { icon: "Globe", label: "", href: "" },
    ]);
  };

  const removeSocial = (i: number) => {
    update(
      "socialLinks",
      (content.socialLinks || []).filter((_: any, idx: number) => idx !== i)
    );
  };

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800">
          Contact Section
        </h3>
        <p className="text-sm text-slate-500">
          Manage contact details and social links
        </p>
      </div>

      {/* ================= BASIC INFO ================= */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h4 className="font-medium text-slate-700">Basic Info</h4>

        <input
          placeholder="Badge text"
          value={content.badge || ""}
          onChange={(e) => update("badge", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />

        <input
          placeholder="Heading"
          value={content.heading || ""}
          onChange={(e) => update("heading", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Subtitle"
          value={content.subtitle || ""}
          onChange={(e) => update("subtitle", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* ================= CONTACT ITEMS ================= */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-slate-700">Contact Items</h4>
          <button
            onClick={addContactItem}
            className="flex items-center gap-1 text-indigo-600 text-sm"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        {(content.contactItems || []).map((item: any, i: number) => (
          <div
            key={i}
            className="border rounded-lg p-3 bg-slate-50 space-y-2"
          >
            <div className="flex gap-2">
              <input
                placeholder="Icon"
                value={item.icon}
                onChange={(e) =>
                  updateContactItem(i, "icon", e.target.value)
                }
                className="w-28 px-2 py-1.5 border rounded text-xs"
              />
              <input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  updateContactItem(i, "title", e.target.value)
                }
                className="flex-1 px-2 py-1.5 border rounded text-sm"
              />
              <button
                onClick={() => removeContactItem(i)}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Content"
                value={item.content}
                onChange={(e) =>
                  updateContactItem(i, "content", e.target.value)
                }
                className="px-2 py-1.5 border rounded text-sm"
              />
              <input
                placeholder="Link"
                value={item.link}
                onChange={(e) =>
                  updateContactItem(i, "link", e.target.value)
                }
                className="px-2 py-1.5 border rounded text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ================= SOCIAL LINKS ================= */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <div className="flex justify-between">
          <h4 className="font-medium text-slate-700">Social Links</h4>
          <button
            onClick={addSocial}
            className="flex items-center gap-1 text-indigo-600 text-sm"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        {(content.socialLinks || []).map((link: any, i: number) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              placeholder="Icon"
              value={link.icon}
              onChange={(e) =>
                updateSocial(i, "icon", e.target.value)
              }
              className="w-24 px-2 py-1.5 border rounded text-xs"
            />
            <input
              placeholder="Label"
              value={link.label}
              onChange={(e) =>
                updateSocial(i, "label", e.target.value)
              }
              className="flex-1 px-2 py-1.5 border rounded text-sm"
            />
            <input
              placeholder="URL"
              value={link.href}
              onChange={(e) =>
                updateSocial(i, "href", e.target.value)
              }
              className="flex-1 px-2 py-1.5 border rounded text-sm"
            />
            <button
              onClick={() => removeSocial(i)}
              className="text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* ================= MAP ================= */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h4 className="font-medium text-slate-700">Map Settings</h4>

        <input
          placeholder="Map Embed URL"
          value={content.mapEmbedUrl || ""}
          onChange={(e) => update("mapEmbedUrl", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />

        <input
          placeholder="Map Link URL"
          value={content.mapLinkUrl || ""}
          onChange={(e) => update("mapLinkUrl", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />

        <input
          placeholder="Map Label"
          value={content.mapLabel || ""}
          onChange={(e) => update("mapLabel", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div>
    </div>
  );
}