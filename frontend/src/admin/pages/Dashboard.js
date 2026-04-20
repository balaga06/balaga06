import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Users, GraduationCap, BookOpen, FileText, Bell, Calendar, } from "lucide-react";
export default function Dashboard() {
    const [stats, setStats] = useState({
        admins: 0,
        pages: 0,
        activities: 0,
        notifications: 0,
    });
    const [updates, setUpdates] = useState([]);
    const [events, setEvents] = useState([]);
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
            }
            catch (error) {
                console.error("Dashboard error:", error);
                setStats({
                    admins: 0,
                    pages: 0,
                    activities: 0,
                    notifications: 0,
                });
                setUpdates([]);
                setEvents([]);
            }
            finally {
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-800", children: "Admin Dashboard" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Institutional academic and administrative overview" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: summaryStats.map((item) => (_jsxs("div", { className: "bg-white border border-slate-200 rounded-lg p-5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "text-sm text-slate-500", children: item.label }), _jsx(item.icon, { className: "w-5 h-5 text-indigo-600" })] }), _jsx("p", { className: "text-3xl font-semibold text-slate-800 mt-3", children: loading ? "..." : item.value })] }, item.label))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 bg-white border border-slate-200 rounded-lg", children: [_jsxs("div", { className: "px-6 py-4 border-b border-slate-200 flex items-center gap-2", children: [_jsx(Bell, { className: "w-5 h-5 text-indigo-600" }), _jsx("h2", { className: "font-semibold text-slate-800", children: "Academic Updates" })] }), _jsx("div", { className: "divide-y", children: updates.length === 0 ? (_jsx("p", { className: "p-6 text-sm text-slate-500", children: "No updates available" })) : (updates.map((update) => (_jsxs("div", { className: "px-6 py-4", children: [_jsx("p", { className: "font-medium text-slate-800", children: update.title }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: new Date(update.created_at).toLocaleDateString() })] }, update.id)))) })] }), _jsxs("div", { className: "bg-white border border-slate-200 rounded-lg", children: [_jsxs("div", { className: "px-6 py-4 border-b border-slate-200 flex items-center gap-2", children: [_jsx(Calendar, { className: "w-5 h-5 text-indigo-600" }), _jsx("h2", { className: "font-semibold text-slate-800", children: "Upcoming Events" })] }), _jsx("div", { className: "divide-y", children: events.length === 0 ? (_jsx("p", { className: "p-6 text-sm text-slate-500", children: "No events scheduled" })) : (events.map((event) => (_jsxs("div", { className: "px-6 py-4", children: [_jsx("p", { className: "font-medium text-slate-800", children: event.title }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: new Date(event.event_date).toLocaleDateString() })] }, event.id)))) })] })] })] }));
}
