import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
const feedbackData = {
    student: [
        {
            id: 1,
            name: "Ravi Kumar",
            email: "ravi.student@jntuk.edu.in",
            department: "Computer Science",
            message: "The course curriculum is well structured and updated.",
            date: "21 Jan 2026",
        },
        {
            id: 2,
            name: "Anjali Reddy",
            email: "anjali.student@jntuk.edu.in",
            department: "Mechanical Engineering",
            message: "Laboratory facilities can be improved.",
            date: "19 Jan 2026",
        },
    ],
    faculty: [
        {
            id: 1,
            name: "Dr. Suresh Rao",
            email: "suresh.faculty@jntuk.edu.in",
            department: "Electrical Engineering",
            message: "Research funding support has increased significantly.",
            date: "18 Jan 2026",
        },
    ],
    alumni: [
        {
            id: 1,
            name: "Kiran Patel",
            email: "kiran.alumni@gmail.com",
            department: "Civil Engineering",
            message: "Industry exposure during final year was very helpful.",
            date: "15 Jan 2026",
        },
    ],
};
export default function Feedback() {
    const [activeTab, setActiveTab] = useState("student");
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-800", children: "Feedback Management" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Review feedback submitted by students, faculty, and alumni" })] }), _jsx("div", { className: "flex gap-2 border-b border-slate-200", children: [
                    { key: "student", label: "Student Feedback" },
                    { key: "faculty", label: "Faculty Feedback" },
                    { key: "alumni", label: "Alumni Feedback" },
                ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.key), className: `px-4 py-2 text-sm font-medium border-b-2 transition
              ${activeTab === tab.key
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-slate-600 hover:text-slate-800"}`, children: tab.label }, tab.key))) }), _jsx("div", { className: "bg-white border border-slate-200 rounded-lg overflow-hidden", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-slate-100 text-slate-600", children: _jsxs("tr", { children: [_jsx("th", { className: "px-5 py-3 text-left", children: "Name" }), _jsx("th", { className: "px-5 py-3 text-left", children: "Email" }), _jsx("th", { className: "px-5 py-3 text-left", children: "Department" }), _jsx("th", { className: "px-5 py-3 text-left", children: "Feedback" }), _jsx("th", { className: "px-5 py-3 text-left", children: "Date" }), _jsx("th", { className: "px-5 py-3 text-center", children: "Actions" })] }) }), _jsxs("tbody", { className: "divide-y", children: [feedbackData[activeTab].map((item) => (_jsxs("tr", { className: "hover:bg-slate-50", children: [_jsx("td", { className: "px-5 py-4 font-medium text-slate-800", children: item.name }), _jsx("td", { className: "px-5 py-4 text-slate-600", children: item.email }), _jsx("td", { className: "px-5 py-4 text-slate-600", children: item.department }), _jsx("td", { className: "px-5 py-4 text-slate-600 max-w-sm", children: item.message }), _jsx("td", { className: "px-5 py-4 text-slate-500", children: item.date }), _jsx("td", { className: "px-5 py-4", children: _jsxs("div", { className: "flex justify-center gap-3", children: [_jsx("button", { className: "p-2 rounded-md text-indigo-600 hover:bg-indigo-50", title: "View", children: _jsx(Eye, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 rounded-md text-red-600 hover:bg-red-50", title: "Delete", children: _jsx(Trash2, { className: "w-4 h-4" }) })] }) })] }, item.id))), feedbackData[activeTab].length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-6 py-8 text-center text-slate-500", children: "No feedback available." }) }))] })] }) })] }));
}
