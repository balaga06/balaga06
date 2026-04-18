import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSection } from "@/context/SectionContext";
import { getMedia } from "@/admin/services/media.api";
import { getIcon } from "@/lib/iconMap";

/* ================= TYPES ================= */
interface HeroButton {
  label: string;
  type?: "page" | "docs" | "external";
  slug?: string;
  link?: string;
  variant?: "primary" | "outline";
  icon?: string;
}

interface HeroStat {
  value: string;
  label: string;
  icon?: string;
}

/* ================= FALLBACK ================= */
const fallback = {
  badge: "IQAC Portal",
  headline: "Internal Quality Assurance Cell",
  description:
    "Ensuring academic excellence through continuous monitoring and quality enhancement.",

  buttons: [
    {
      label: "Explore Programmes",
      type: "page",
      slug: "programmes",
      variant: "primary",
      icon: "ArrowRight",
    },
    {
      label: "View NAAC Documents",
      type: "docs",
      slug: "naac",
      variant: "outline",
    },
  ],

  stats: [
    { value: "A+", label: "NAAC Accreditation", icon: "BarChart3" },
    { value: "30+", label: "Departments", icon: "FileText" },
    { value: "100%", label: "Quality Coverage", icon: "Users" },
  ],
};

export default function Hero() {
  const navigate = useNavigate();
  const data = useSection("iqac_hero") || fallback;

  const [heroImage, setHeroImage] = useState<string>("");

  /* ================= FETCH MEDIA ================= */
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const media = await getMedia();

        if (!Array.isArray(media)) return;

        // ✅ FULL SAFE CAST (NO TS ERROR)
        const hero = (media as any[]).find(
          (m) => m?.section === "hero"
        );

        if (hero) {
          const path =
            (hero as any).file_path ||
            (hero as any).url ||
            (hero as any).path;

          if (path) {
            setHeroImage(`http://localhost:5000${path}`);
          }
        }
      } catch (err) {
        console.log("Hero image load failed", err);
      }
    };

    fetchHero();
  }, []);

  const buttons: HeroButton[] = data?.buttons || fallback.buttons;
  const stats: HeroStat[] = data?.stats || fallback.stats;

  /* ================= NAVIGATION ================= */
  const handleClick = (btn: HeroButton) => {
    if (btn.type === "page") {
      navigate(`/pages/${btn.slug}`);
    } else if (btn.type === "docs") {
      navigate(`/documents/${btn.slug}`);
    } else if (btn.type === "external" && btn.link) {
      window.open(btn.link, "_blank");
    }
  };

  return (
    <section className="relative min-h-[650px] overflow-hidden">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <img
          src={heroImage || "/images/jntuk-gate.jpg"}
          onError={(e: any) => {
            e.currentTarget.src = "/images/jntuk-gate.jpg";
          }}
          className="w-full h-full object-cover"
        />

        {/* NAVY OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#0a192f]/85 to-[#020617]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">

          {/* BADGE */}
          <Badge className="mb-6 bg-white/10 text-white border border-white/20 px-4 py-1.5 backdrop-blur-sm">
            {data?.badge || fallback.badge}
          </Badge>

          {/* HEADING */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {data?.headline || fallback.headline}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            {data?.description || fallback.description}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mb-16">
            {buttons.map((btn, i) => {
              const Icon = getIcon(btn.icon) || ArrowRight;

              if (btn.variant === "primary") {
                return (
                  <Button
                    key={i}
                    size="lg"
                    onClick={() => handleClick(btn)}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  >
                    {btn.label}
                    <Icon className="ml-2 w-4 h-4" />
                  </Button>
                );
              }

              return (
                <Button
                  key={i}
                  size="lg"
                  onClick={() => handleClick(btn)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {btn.label}
                </Button>
              );
            })}
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((stat, i) => {
              const Icon = getIcon(stat.icon);

              return (
                <div key={i}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      {Icon && (
                        <Icon className="text-blue-400 w-5 h-5" />
                      )}
                    </div>

                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* SCROLL */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs">
        Scroll ↓
      </div>
    </section>
  );
}