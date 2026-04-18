import { useState, useEffect } from "react";
import { Bell, ExternalLink } from "lucide-react";
import {
  getPublicNotifications,
  type Notification,
} from "@/admin/services/notification.api";

const BASE_URL = "http://localhost:5000";

export default function NotificationTicker() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPublicNotifications();

        const data: Notification[] = Array.isArray(res) ? res : [];

        // ✅ Only active notifications
        const active = data.filter((n) => n.is_active);

        // ✅ Sort latest first
        const sorted = active.sort((a, b) => (b.id || 0) - (a.id || 0));

        setNotifications(sorted);
      } catch (err) {
        console.error("Notification ticker error:", err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ❌ REMOVE old return null logic */
  if (loading) return null;

  /* ================= SPLIT DATA ================= */

  // 📌 PINNED (fixed)
  const pinned = notifications.filter(
    (n: any) => n.is_active && n.is_pinned === true
  );

  // 🔁 SCROLLING
  const scrolling = notifications.filter(
    (n: any) =>
      n.is_active &&
      (n.is_scrolling ?? true) &&
      !n.is_pinned
  );

  /* ================= HELPER ================= */
  const getHref = (item: Notification) => {
    if (item.file_url) return `${BASE_URL}${item.file_url}`;
    if (item.link) return item.link;
    return null;
  };

  return (
    <div className="bg-gradient-to-r from-[#020617] via-[#0a192f] to-[#020617] border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-4">

        {/* ================= LABEL ================= */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded-md bg-blue-600/20 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5 text-blue-400" />
          </div>

          <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider hidden sm:inline">
            Notifications
          </span>
        </div>

        {/* ================= PINNED ================= */}
        {pinned.length > 0 && (
          <div className="flex items-center gap-6 shrink-0">
            {pinned.map((item) => {
              const href = getHref(item);
              if (!href) return null;

              return (
                <a
                  key={`pinned-${item.id}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-yellow-400 font-medium text-sm"
                >
                  📌 {item.title}
                </a>
              );
            })}
          </div>
        )}

        {/* ================= SCROLLING ================= */}
        <div className="flex-1 overflow-hidden relative">

          {/* FADE EFFECT */}
          <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[#020617] to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#020617] to-transparent z-10" />

          <div className="flex gap-10 whitespace-nowrap animate-marquee">

            {scrolling.length === 0 ? (
              <span className="text-gray-400 text-sm">
                No notifications available
              </span>
            ) : (
              scrolling.map((item) => {
                const href = getHref(item);
                if (!href) return null;

                return (
                  <a
                    key={item.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-400 transition text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {item.title}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                );
              })
            )}

          </div>
        </div>
      </div>
    </div>
  );
}