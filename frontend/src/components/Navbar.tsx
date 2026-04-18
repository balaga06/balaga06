import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { getMenus, type Menu as MenuType } from "@/api/public";

/* ================= COMPONENT ================= */
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [menus, setMenus] = useState<MenuType[]>([]);
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
      } catch (error) {
        console.error("Menu fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  /* ================= NAVIGATION ================= */
  const handleNav = (item: MenuType) => {
    // ✅ FIX: CUSTOM ABOUT PAGE
    if (item.slug === "about-iqac") {
      navigate("/pages/about-iqac");
      return;
    }

    // ✅ NORMAL FLOW
    if (item.type === "page") {
      navigate(`/pages/${item.slug}`);
    } else if (item.type === "docs") {
      navigate(`/documents/${item.slug}`);
    } else if (item.type === "external" && item.link) {
      window.open(item.link, "_blank");
    }
  };

  /* ================= ACTIVE ================= */
  const isActive = (slug?: string) => {
    return (
      location.pathname === `/pages/${slug}` ||
      location.pathname === `/documents/${slug}`
    );
  };

  return (
    <nav className="bg-[#0f172a] sticky top-[88px] z-40 shadow-lg">

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-12 gap-1">

            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white/50" />
            ) : menus.length === 0 ? (
              <span className="text-white/50 text-sm">
                No menus found
              </span>
            ) : (
              menus.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition group",
                    isActive(item.slug)
                      ? "text-blue-400"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {item.name}

                  {/* BLUE UNDERLINE */}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300",
                      isActive(item.slug)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </button>
              ))
            )}

          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-6 py-3">

          <span className="text-white text-sm font-medium">
            Menu
          </span>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] bg-[#0f172a] border-[#1e293b] p-0"
            >
              <SheetHeader className="p-6 border-b border-[#1e293b]">
                <SheetTitle className="text-white text-left">
                  Navigation
                </SheetTitle>
              </SheetHeader>

              <div className="py-4">

                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-white/50" />
                  </div>
                ) : menus.length === 0 ? (
                  <div className="text-center text-white/50 py-6">
                    No menus found
                  </div>
                ) : (
                  menus.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNav(item);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-6 py-3 transition group",
                        isActive(item.slug)
                          ? "text-blue-400 bg-white/10"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span className="text-sm font-medium">
                        {item.name}
                      </span>

                      <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))
                )}

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

    </nav>
  );
}