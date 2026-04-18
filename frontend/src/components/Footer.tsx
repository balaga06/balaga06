import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useSection } from "@/context/SectionContext";

/* ================= FALLBACK ================= */
const fallback = {
  brandTitle: "Internal Quality Assurance Cell",
  brandSubtitle: "JNTUK, Kakinada",
  description:
    "The Internal Quality Assurance Cell (IQAC) ensures academic excellence through continuous monitoring and evaluation.",

  address: "JNTUK, Kakinada – 533003",
  phone: "+91 884 2300900",
  phoneHref: "tel:+918842300900",
  email: "iqac@jntuk.edu.in",
  emailHref: "mailto:iqac@jntuk.edu.in",
  hours: "Mon - Fri: 9:00 AM - 5:00 PM",

  /* 🔥 FIXED PATHS (MATCH YOUR ROUTES) */
  iqacLinks: [
    { label: "About IQAC", path: "/pages/about-iqac" },

    // ✅ FIXED
    { label: "IQAC Committee", path: "/pages/iqac-committee" },

    // ✅ DOCUMENTS
    { label: "AQAR Reports", path: "/documents/reports" },
    { label: "NAAC Documents", path: "/documents/naac" },
    { label: "NIRF", path: "/documents/nirf" },
    { label: "Meetings", path: "/documents/minutes" },
  ],

  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/officialjntuk" },
    { label: "Twitter", href: "https://x.com/jntukofficial" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jntukkakinada/" },
    { label: "YouTube", href: "https://www.youtube.com/@JNTUK-Official" },
  ],

  copyright: "© 2026 JNTUK — Internal Quality Assurance Cell",
};

/* ================= ICON MAP ================= */
const socialIcons: any = {
  Facebook,
  Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

export default function Footer() {
  const data = useSection("iqac_footer") || fallback;

  const iqacLinks = data.iqacLinks || fallback.iqacLinks;
  const socialLinks = data.socialLinks || fallback.socialLinks;

  return (
    <footer className="mt-auto relative backdrop-blur-xl bg-white/5 border-t border-white/10 text-white">

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 to-[#020617]/90 -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* ================= BRAND ================= */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>

              <div>
                <h4 className="font-bold text-lg">{data.brandTitle}</h4>
                <p className="text-xs text-gray-400">{data.brandSubtitle}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              {data.description}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{data.address}</span>
              </div>

              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href={data.phoneHref}>{data.phone}</a>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href={data.emailHref}>{data.email}</a>
              </div>

              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{data.hours}</span>
              </div>
            </div>
          </div>

          {/* ================= IQAC LINKS ================= */}
          <div>
            <h4 className="font-semibold mb-5">IQAC Links</h4>

            <ul className="space-y-3">
              {iqacLinks.map((item: any) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                  >
                    <ArrowRight className="w-3 h-3" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= SOCIAL ================= */}
          <div>
            <h4 className="font-semibold mb-5">Follow Us</h4>

            <div className="flex gap-4">
              {socialLinks.map((s: any) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 transition"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <div className="border-t text-center py-6 text-sm text-gray-500">
        {data.copyright}
      </div>
    </footer>
  );
}