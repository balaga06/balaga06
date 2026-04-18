import {
  LayoutDashboard,
  MenuSquare,
  FileText,
  Image,
  GraduationCap,
  MessageSquare,
  Megaphone,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: MenuSquare, label: "Menus", path: "/admin/menus" },
  { icon: FileText, label: "Pages", path: "/admin/pages" },
  { icon: Image, label: "Media", path: "/admin/media" },
  { icon: GraduationCap, label: "Programmes", path: "/admin/programmes" },
  { icon: MessageSquare, label: "Feedback", path: "/admin/feedback" },
  { icon: Megaphone, label: "Notifications", path: "/admin/notifications" },
  { icon: Shield, label: "Admins", path: "/admin/admins" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= LOGOUT FUNCTION ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin/login", { replace: true });
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-100 border-r border-slate-200
      transition-all duration-300 flex flex-col z-40
      ${isCollapsed ? "w-20" : "w-72"}`}
    >
      {/* ================= LOGO ================= */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-200">
        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>

        {!isCollapsed && (
          <div>
            <h1 className="text-slate-800 font-semibold text-lg">
              JNTUK
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              IQAC Admin
            </p>
          </div>
        )}
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-indigo-100 text-indigo-700"
                        : "text-slate-700 hover:bg-slate-200"
                    }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive ? "text-indigo-700" : "text-slate-500"
                    }`}
                  />

                  {!isCollapsed && (
                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="p-3 border-t border-slate-200 space-y-1">

        {/* Help & Support */}
        <NavLink
          to="/admin/help-support"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition
            ${
              isActive
                ? "bg-indigo-100 text-indigo-700"
                : "text-slate-700 hover:bg-slate-200"
            }`
          }
        >
          <HelpCircle
            className={`w-5 h-5 ${
              location.pathname === "/admin/help-support"
                ? "text-indigo-700"
                : "text-slate-500"
            }`}
          />

          {!isCollapsed && (
            <span className="text-sm font-medium">
              Help & Support
            </span>
          )}
        </NavLink>

        {/* ================= LOGOUT ================= */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
          text-red-600 hover:bg-red-100 transition"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && (
            <span className="text-sm font-medium">
              Sign Out
            </span>
          )}
        </button>

        {/* Collapse */}
        <button
          onClick={onToggle}
          className="w-full mt-2 flex items-center justify-center gap-2
          px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
          {!isCollapsed && (
            <span className="text-sm font-medium">
              Collapse
            </span>
          )}
        </button>

      </div>
    </aside>
  );
}