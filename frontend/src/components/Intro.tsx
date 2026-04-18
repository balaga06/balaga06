import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Quote, Target } from "lucide-react";
import { useSection } from "@/context/SectionContext";
import { getMedia } from "@/admin/services/media.api";
import { getIcon } from "@/lib/iconMap";

/* ================= TYPES ================= */
interface Pillar {
  icon: string;
  title: string;
  description: string;
}

interface MediaItem {
  section?: string;
  file_path?: string;
  url?: string;
  path?: string;
}

/* ================= FALLBACK ================= */
const fallback = {
  badge: "About IQAC",
  heading: "Internal Quality Assurance Cell",
  description:
    "The Internal Quality Assurance Cell (IQAC) plays a vital role in maintaining academic standards and continuous improvement.",
  quote:
    "Quality assurance is a continuous process that strengthens academic excellence.",

  pillars: [
    {
      icon: "Target",
      title: "IQAC Objectives",
      description: "Continuous academic and administrative improvement.",
    },
    {
      icon: "Eye",
      title: "Quality Vision",
      description: "Promoting quality culture and accreditation.",
    },
    {
      icon: "ShieldCheck",
      title: "Core Values",
      description: "Transparency, accountability and excellence.",
    },
  ],
};

export default function Intro() {
  const data = useSection("iqac_intro") || fallback;
  const [image, setImage] = useState<string>("");

  /* ================= FETCH IMAGE ================= */
  useEffect(() => {
    const loadImage = async () => {
      try {
        const media = await getMedia();

        if (!Array.isArray(media)) return;

        const img = (media as MediaItem[]).find(
          (m) => m.section === "intro"
        );

        if (img) {
          const path = img.file_path || img.url || img.path;

          if (path) {
            const fullUrl = path.startsWith("http")
              ? path
              : `http://localhost:5000${path}`;

            setImage(fullUrl);
          }
        }
      } catch (err) {
        console.log("Intro image load failed", err);
      }
    };

    loadImage();
  }, []);

  const pillars: Pillar[] = data?.pillars || fallback.pillars;

  return (
    /* ✅ FIXED HEIGHT HERE */
    <section className="relative min-h-[70vh] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <img
          src={
            image && image.startsWith("http")
              ? image
              : "/images/jntuk-gate.jpg"
          }
          onError={(e: any) => {
            e.currentTarget.src = "/images/jntuk-gate.jpg";
          }}
          className="w-full h-full object-cover"
        />

        {/* NAVY OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#0a192f]/85 to-[#020617]/95" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-16">

        {/* BADGE */}
        <Badge className="mb-6 bg-white/10 text-white border border-white/20 px-4 py-1.5 backdrop-blur-sm">
          {data?.badge || fallback.badge}
        </Badge>

        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {data?.heading || fallback.heading}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-300 mb-10">
          {data?.description || fallback.description}
        </p>

        {/* QUOTE */}
        <div className="max-w-3xl mx-auto mb-10">
          <Quote className="mx-auto mb-4 text-blue-400 w-6 h-6" />
          <p className="italic text-lg text-white/90">
            "{data?.quote || fallback.quote}"
          </p>
        </div>

      </div>

      {/* ================= PILLARS ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-8">

        {pillars.map((p, i) => {
          const Icon = getIcon(p.icon) || Target;

          return (
            <div
              key={i}
              className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-blue-400/40 transition"
            >
              <div className="mb-4 p-3 bg-blue-600/20 text-blue-400 rounded-lg w-fit">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="text-white font-semibold text-lg mb-2">
                {p.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {p.description}
              </p>
            </div>
          );
        })}

      </div>

    </section>
  );
}