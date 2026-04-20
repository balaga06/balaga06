import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Menu, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMenus } from "@/api/public";
/* ================= COMPONENT ================= */
export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    /* ================= FETCH MENUS ================= */
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await getMenus();
                const activeMenus = data
                    .filter((m) => m.is_active)
                    .sort((a, b) => a.position - b.position);
                setMenus(activeMenus);
            }
            catch (error) {
                console.error("Menu fetch error:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMenus();
    }, []);
    /* ================= NAVIGATION ================= */
    const handleNav = (item) => {
        // ✅ FIX: CUSTOM ABOUT PAGE
        if (item.slug === "about-iqac") {
            navigate("/pages/about-iqac");
            return;
        }
        // ✅ NORMAL FLOW
        if (item.type === "page") {
            navigate(`/pages/${item.slug}`);
        }
        else if (item.type === "docs") {
            navigate(`/documents/${item.slug}`);
        }
        else if (item.type === "external" && item.link) {
            window.open(item.link, "_blank");
        }
    };
    /* ================= ACTIVE ================= */
    const isActive = (slug) => {
        return (location.pathname === `/pages/${slug}` ||
            location.pathname === `/documents/${slug}`);
    };
    return (_jsxs("nav", { className: "bg-[#0f172a] sticky top-[88px] z-40 shadow-lg", children: [_jsx("div", { className: "hidden lg:block", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsx("div", { className: "flex items-center justify-center h-12 gap-1", children: loading ? (_jsx(Loader2, { className: "w-5 h-5 animate-spin text-white/50" })) : menus.length === 0 ? (_jsx("span", { className: "text-white/50 text-sm", children: "No menus found" })) : (menus.map((item) => (_jsxs("button", { onClick: () => handleNav(item), className: cn("relative px-4 py-2 text-sm font-medium transition group", isActive(item.slug)
                                ? "text-blue-400"
                                : "text-white/80 hover:text-white"), children: [item.name, _jsx("span", { className: cn("absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300", isActive(item.slug)
                                        ? "w-full"
                                        : "w-0 group-hover:w-full") })] }, item.id)))) }) }) }), _jsx("div", { className: "lg:hidden", children: _jsxs("div", { className: "flex items-center justify-between px-6 py-3", children: [_jsx("span", { className: "text-white text-sm font-medium", children: "Menu" }), _jsxs(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "text-white hover:bg-white/10", children: _jsx(Menu, { className: "h-5 w-5" }) }) }), _jsxs(SheetContent, { side: "right", className: "w-[300px] bg-[#0f172a] border-[#1e293b] p-0", children: [_jsx(SheetHeader, { className: "p-6 border-b border-[#1e293b]", children: _jsx(SheetTitle, { className: "text-white text-left", children: "Navigation" }) }), _jsx("div", { className: "py-4", children: loading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx(Loader2, { className: "w-5 h-5 animate-spin text-white/50" }) })) : menus.length === 0 ? (_jsx("div", { className: "text-center text-white/50 py-6", children: "No menus found" })) : (menus.map((item) => (_jsxs("button", { onClick: () => {
                                                    handleNav(item);
                                                    setIsOpen(false);
                                                }, className: cn("w-full flex items-center gap-3 px-6 py-3 transition group", isActive(item.slug)
                                                    ? "text-blue-400 bg-white/10"
                                                    : "text-white/80 hover:text-white hover:bg-white/5"), children: [_jsx("span", { className: "text-sm font-medium", children: item.name }), _jsx(ChevronRight, { className: "w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })] }, item.id)))) })] })] })] }) })] }));
}
