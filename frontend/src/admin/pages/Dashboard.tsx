import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  Bell,
  Calendar,
} from "lucide-react";

interface Stats {
  admins: number;
  pages: number;
  activities: number;
  notifications: number;
}

interface Update {
  id: number;
  title: string;
  created_at: string;
}

interface Event {
  id: number;
  title: string;
  event_date: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    admins: 0,
    pages: 0,
    activities: 0,
    notifications: 0,
  });

  const [updates, setUpdates] = useState<Update[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // ✅ FIXED: correct mapping
        setStats({
          admins: Number(data?.counts?.admins || 0),
          pages: Number(data?.counts?.pages || 0),
          activities: Number(data?.counts?.activities || 0),
          notifications: Number(data?.counts?.notifications || 0),
        });

        setUpdates(Array.isArray(data?.academicUpdates) ? data.academicUpdates : []);
        setEvents(Array.isArray(data?.events) ? data.events : []);

      } catch (error) {
        console.error("Dashboard error:", error);

        setStats({
          admins: 0,
          pages: 0,
          activities: 0,
          notifications: 0,
        });

        setUpdates([]);
        setEvents([]);

      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const summaryStats = [
    { label: "Admins", value: stats.admins, icon: Users },
    { label: "Pages", value: stats.pages, icon: GraduationCap },
    { label: "Activities", value: stats.activities, icon: BookOpen },
    { label: "Notifications", value: stats.notifications, icon: FileText },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Institutional academic and administrative overview
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-slate-200 rounded-lg p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{item.label}</p>
              <item.icon className="w-5 h-5 text-indigo-600" />
            </div>

            <p className="text-3xl font-semibold text-slate-800 mt-3">
              {loading ? "..." : item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Academic Updates */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg">

          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-slate-800">
              Academic Updates
            </h2>
          </div>

          <div className="divide-y">
            {updates.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">
                No updates available
              </p>
            ) : (
              updates.map((update) => (
                <div key={update.id} className="px-6 py-4">
                  <p className="font-medium text-slate-800">
                    {update.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(update.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white border border-slate-200 rounded-lg">

          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-slate-800">
              Upcoming Events
            </h2>
          </div>

          <div className="divide-y">
            {events.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">
                No events scheduled
              </p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="px-6 py-4">

                  <p className="font-medium text-slate-800">
                    {event.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(event.event_date).toLocaleDateString()}
                  </p>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}