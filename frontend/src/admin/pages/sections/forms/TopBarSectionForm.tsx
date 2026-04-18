interface Props {
  content: any;
  onChange: (c: any) => void;
}

export default function TopBarSectionForm({ content, onChange }: Props) {

  const update = (key: string, value: string) =>
    onChange({ ...content, [key]: value });

  return (
    <div className="space-y-6">

      {/* ================= BASIC ================= */}
      <div>
        <h4 className="font-medium mb-2">Basic Info</h4>

        <input
          placeholder="Accreditation Badge (e.g. NAAC A+)"
          value={content.accreditation || ""}
          onChange={(e) => update("accreditation", e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <input
          placeholder="Tagline"
          value={content.tagline || ""}
          onChange={(e) => update("tagline", e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* ================= CONTACT ================= */}
      <div>
        <h4 className="font-medium mb-2">Contact Info</h4>

        <div className="grid grid-cols-2 gap-3">

          <input
            placeholder="Phone"
            value={content.phone || ""}
            onChange={(e) => update("phone", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Phone Link (tel:+...)"
            value={content.phoneHref || ""}
            onChange={(e) => update("phoneHref", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Email"
            value={content.email || ""}
            onChange={(e) => update("email", e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Email Link (mailto:...)"
            value={content.emailHref || ""}
            onChange={(e) => update("emailHref", e.target.value)}
            className="border p-2 rounded"
          />

        </div>

        <input
          placeholder="Location"
          value={content.location || ""}
          onChange={(e) => update("location", e.target.value)}
          className="w-full border p-2 rounded mt-2"
        />
      </div>

    </div>
  );
}