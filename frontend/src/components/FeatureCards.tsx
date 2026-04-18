import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

import { useSection } from "@/context/SectionContext";
import { getIcon } from "@/lib/iconMap";

/* ================= TYPES ================= */
interface Feature {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  stats?: string;

  type?: "page" | "docs" | "external";
  slug?: string;
  link?: string;
}

/* ================= FALLBACK (UPDATED FULL MENUS) ================= */
const fallback = {
  badge: "IQAC Portal",
  heading: "Internal Quality Assurance Cell",
  subtitle:
    "A centralized academic quality framework ensuring continuous improvement.",

  cards: [
    {
      title: "About IQAC",
      description: "Overview of IQAC objectives and functions.",
      icon: "GraduationCap",
      stats: "Overview",
      image: "/images/jntuk-gate.jpg",
      type: "page",
      slug: "about-iqac",
    },
    {
      title: "Programmes",
      description: "UG & PG Programmes offered.",
      icon: "Building2",
      stats: "Courses",
      image: "/images/jntuk-gate.jpg",
      type: "page",
      slug: "programmes",
    },
    {
      title: "Reports",
      description: "AQAR and compliance reports.",
      icon: "FileText",
      stats: "Documents",
      image: "/images/jntuk-gate.jpg",
      type: "docs",
      slug: "reports",
    },
    {
      title: "NIRF",
      description: "National Institutional Ranking Framework.",
      icon: "BarChart3",
      stats: "Ranking",
      image: "/images/jntuk-gate.jpg",
      type: "docs",
      slug: "nirf",
    },
    {
      title: "NAAC",
      description: "NAAC accreditation documents.",
      icon: "Award",
      stats: "Accreditation",
      image: "/images/jntuk-gate.jpg",
      type: "docs",
      slug: "naac",
    },
    {
      title: "Syllabus",
      description: "All academic syllabus documents.",
      icon: "BookOpen",
      stats: "Curriculum",
      image: "/images/jntuk-gate.jpg",
      type: "docs",
      slug: "syllabus",
    },
    {
      title: "Minutes & Meetings",
      description: "IQAC meeting records and minutes.",
      icon: "ClipboardList",
      stats: "Records",
      image: "/images/jntuk-gate.jpg",
      type: "docs",
      slug: "minutes-meetings",
    },
    {
      title: "IQAC Committee",
      description: "Members of IQAC committee.",
      icon: "Users",
      stats: "Team",
      image: "/images/jntuk-gate.jpg",
      type: "page",
      slug: "iqac-committee",
    },
  ],
};

export default function FeatureCards() {
  const navigate = useNavigate();

  const sectionData = useSection("iqac_features");
  const data = sectionData && sectionData.cards?.length ? sectionData : fallback;

  const cards: Feature[] =
    data.cards && data.cards.length > 0 ? data.cards : fallback.cards;

  /* ================= CLICK HANDLER ================= */
  const handleClick = (card: Feature) => {
    if (card.type === "page") {
      navigate(`/pages/${card.slug}`);
    } else if (card.type === "docs") {
      navigate(`/documents/${card.slug}`);
    } else if (card.type === "external" && card.link) {
      window.open(card.link, "_blank");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#020617] via-[#0a192f] to-[#020617]">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white border border-white/20 backdrop-blur-sm">
            {data.badge || fallback.badge}
          </Badge>

          <h2 className="text-4xl font-bold text-white mb-4">
            {data.heading || fallback.heading}
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto">
            {data.subtitle || fallback.subtitle}
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards.map((card, index) => {
            const Icon = getIcon(card.icon) || ArrowRight;

            return (
              <Card
                key={index}
                onClick={() => handleClick(card)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-500"
              >
                {/* BACKGROUND */}
                <div className="absolute inset-0">
                  <img
                    src={card.image || "/images/jntuk-gate.jpg"}
                    onError={(e: any) => {
                      e.currentTarget.src = "/images/jntuk-gate.jpg";
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#0a192f]/70 to-[#020617]/90" />
                </div>

                {/* CONTENT */}
                <CardContent className="relative z-10 p-6">

                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-xl bg-blue-600/20 group-hover:bg-blue-600 transition">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
                    </div>

                    {card.stats && (
                      <span className="text-xs text-gray-300">
                        {card.stats}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg text-white font-semibold mb-2 group-hover:text-blue-400">
                    {card.title}
                  </h3>

                  <p className="text-gray-300 text-sm mb-4">
                    {card.description}
                  </p>

                  <div className="flex items-center text-sm text-blue-400 font-medium">
                    View Details
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>

                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}