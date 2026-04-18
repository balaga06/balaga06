import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSectionByKey } from "@/admin/services/pageSection.api";
import type { PageSection } from "@/admin/services/pageSection.api";

/* ✅ IMPORT CUSTOM PAGES */
import IQACCommittee from "./IQACCommittee";
import Programmes from "./Programmes";
import AboutIQAC from "./AboutIQAC";

/* 🔥 ADD THIS */
import Syllabus from "./Syllabus";

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();

  const [data, setData] = useState<PageSection | null>(null);
  const [error, setError] = useState(false);

  /* ================= 🔥 BYPASS STATIC PAGES ================= */

  // ✅ VERY IMPORTANT (PREVENT WRONG PAGE LOAD)
  if (slug === "iqac-committee") return <IQACCommittee />;
  if (slug === "programmes") return <Programmes />;
  if (slug === "about-iqac") return <AboutIQAC />;

  /* 🔥 ADD THIS (YOUR FIX) */
  if (slug === "syllabus") return <Syllabus />;

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        console.log("LOADING PAGE:", slug);

        const section = await getSectionByKey(slug);

        console.log("API:", section);

        if (!section) {
          setError(true);
          return;
        }

        setData(section);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchData();
  }, [slug]);

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Failed to load page
      </div>
    );
  }

  /* ================= LOADING ================= */
  if (!data) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div>
      {/* HERO */}
      <div className="relative h-[300px]">
        <img
          src={
            data.content?.image ||
            "https://via.placeholder.com/1200x400"
          }
          className="w-full h-full object-cover"
          alt={data.title}
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            {data.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          {data.title}
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {data.content?.description ||
            "No content available for this page."}
        </p>
      </div>
    </div>
  );
}