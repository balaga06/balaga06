import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import { getSectionsByGroup } from "@/api/public";
/* ================= CONTEXT ================= */
const SectionContext = createContext({
    sections: {},
    loading: true,
    refresh: async () => { },
});
/* ================= PROVIDER ================= */
export function SectionProvider({ children }) {
    const [sections, setSections] = useState({});
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
            const allSections = responses.flat();
            /* ================= MAP ================= */
            const map = {};
            allSections.forEach((section) => {
                if (section.is_active !== false) {
                    map[section.section_key] = section.content;
                }
            });
            setSections(map);
        }
        catch (error) {
            console.error("❌ Failed to load sections:", error);
            setSections({});
        }
        finally {
            setLoading(false);
        }
    };
    /* ================= INIT ================= */
    useEffect(() => {
        fetchSections();
    }, []);
    return (_jsx(SectionContext.Provider, { value: {
            sections,
            loading,
            refresh: fetchSections, // 🔥 manual refresh
        }, children: children }));
}
/* ================= HOOK ================= */
export function useSection(key) {
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
