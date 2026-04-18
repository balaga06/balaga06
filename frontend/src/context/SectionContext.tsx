import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getSectionsByGroup, type PageSection } from "@/api/public";

/* ================= TYPES ================= */

type SectionMap = Record<string, any>;

interface SectionContextValue {
  sections: SectionMap;
  loading: boolean;
  refresh: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const SectionContext = createContext<SectionContextValue>({
  sections: {},
  loading: true,
  refresh: async () => {},
});

/* ================= PROVIDER ================= */

export function SectionProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<SectionMap>({});
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchSections = async () => {
    try {
      setLoading(true);

      // ✅ ALL GROUPS (IMPORTANT)
      const responses = await Promise.all([
        getSectionsByGroup("home"),
        getSectionsByGroup("global"),
        getSectionsByGroup("contact"),
        getSectionsByGroup("iqac"), // 🔥 IMPORTANT
      ]);

      // ✅ FIX: no .data
      const allSections: PageSection[] = responses.flat();

      /* ================= MAP ================= */
      const map: SectionMap = {};

      allSections.forEach((section) => {
        if (section.is_active !== false) {
          map[section.section_key] = section.content;
        }
      });

      setSections(map);
    } catch (error) {
      console.error("❌ Failed to load sections:", error);
      setSections({});
    } finally {
      setLoading(false);
    }
  };

  /* ================= INIT ================= */
  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <SectionContext.Provider
      value={{
        sections,
        loading,
        refresh: fetchSections, // 🔥 manual refresh
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useSection<T = any>(key: string): T | null {
  const { sections } = useContext(SectionContext);
  return sections[key] || null;
}

/* ================= EXTRA HOOKS ================= */

export function useAllSections() {
  return useContext(SectionContext);
}

export function useSectionLoading() {
  const { loading } = useContext(SectionContext);
  return loading;
}