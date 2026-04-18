import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Check,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

const notifications = [
  {
    id: 1,
    title: "New student application",
    message: "Sarah Mitchell submitted an application for Computer Science",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Faculty meeting reminder",
    message: "Department meeting starts in 30 minutes",
    time: "28 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Course update",
    message: "Advanced Mathematics course has been updated",
    time: "1 hour ago",
    read: true,
  },
];

export default function Header({
  onMenuClick,
  isMobileMenuOpen,
}: HeaderProps) {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
  // ✅ REMOVE TOKEN (IMPORTANT)
  localStorage.removeItem("token");
  localStorage.removeItem("admin");

  navigate("/admin/login", { replace: true });
};

  return (
    <header className="h-16 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-200"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-64 h-10 pl-9 pr-4 rounded-md border border-slate-300 text-sm"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 rounded-md hover:bg-slate-200"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] px-1.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg">
              <div className="px-4 py-2 font-semibold border-b">
                Notifications
              </div>
              {notifications.map((n) => (
                <div key={n.id} className="px-4 py-3 text-sm border-b">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-slate-500">{n.message}</p>
                  <p className="text-xs text-slate-400">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 hover:bg-slate-200 px-2 py-1 rounded-md"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-500">admin@jntuk.edu.in</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              AU
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => navigate("/admin/profile")}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100"
              >
                <User className="w-4 h-4" />
                My Profile
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
