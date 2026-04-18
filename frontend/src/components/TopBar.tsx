import { Badge } from "@/components/ui/badge";
import { Award, Phone, Mail, MapPin } from "lucide-react";
import { useSection } from "@/context/SectionContext";

/* ================= TYPES ================= */
interface PhoneItem {
  number: string;
  label?: string;
}

/* ================= FALLBACK ================= */
const fallback = {
  accreditation: "NAAC A+ Accredited",
  tagline: "Empowering Excellence Since 1946",

  phones: [
    { number: "+91-884-2300900", label: "IQAC Office" },
    { number: "1800-123-1104", label: "University Info" },
  ],

  email: "iqac@jntuk.edu.in",
  emailHref: "mailto:iqac@jntuk.edu.in",

  location: "Kakinada, Andhra Pradesh",
};

export default function TopBar() {
  const data = useSection("topbar") || fallback;

  const phones: PhoneItem[] =
    data.phones && data.phones.length > 0
      ? data.phones
      : fallback.phones;

  return (
    <div className="relative bg-gradient-to-r from-[#020617] via-[#0a192f] to-[#020617] text-white/90 text-sm backdrop-blur-md">

      {/* ✅ WHITE TOP LINE */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20" />

      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">

          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-white px-3 py-1 font-medium backdrop-blur-sm"
          >
            <Award className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
            {data.accreditation || fallback.accreditation}
          </Badge>

          <span className="hidden md:inline-block text-white/20">|</span>

          <span className="hidden md:inline-block text-gray-400 text-xs tracking-wide">
            {data.tagline || fallback.tagline}
          </span>
        </div>

        {/* ================= CENTER ================= */}
        <div className="hidden lg:flex items-center gap-6 text-xs text-gray-300">
          {phones.map((p, i) => (
            <div key={i} className="flex items-center gap-2">

              <Phone className="w-3.5 h-3.5 text-blue-400" />

              <span className="font-medium">{p.number}</span>

              {p.label && (
                <span className="text-gray-500 text-xs">
                  ({p.label})
                </span>
              )}

              {i !== phones.length - 1 && (
                <span className="text-white/20">|</span>
              )}
            </div>
          ))}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="hidden md:flex items-center gap-6 text-xs">

          {/* EMAIL */}
          <a
            href={data.emailHref || fallback.emailHref}
            className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition group"
          >
            <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition" />
            <span>{data.email || fallback.email}</span>
          </a>

          <span className="text-white/20">|</span>

          {/* LOCATION */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{data.location || fallback.location}</span>
          </div>
        </div>

      </div>
    </div>
  );
}