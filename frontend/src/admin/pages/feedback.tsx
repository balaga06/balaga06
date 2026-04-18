import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

type FeedbackType = "student" | "faculty" | "alumni";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  department: string;
  message: string;
  date: string;
}

const feedbackData: Record<FeedbackType, FeedbackItem[]> = {
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
  const [activeTab, setActiveTab] = useState<FeedbackType>("student");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Feedback Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review feedback submitted by students, faculty, and alumni
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { key: "student", label: "Student Feedback" },
          { key: "faculty", label: "Faculty Feedback" },
          { key: "alumni", label: "Alumni Feedback" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as FeedbackType)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition
              ${
                activeTab === tab.key
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-600 hover:text-slate-800"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feedback Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Department</th>
              <th className="px-5 py-3 text-left">Feedback</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {feedbackData[activeTab].map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-800">
                  {item.name}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {item.email}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {item.department}
                </td>
                <td className="px-5 py-4 text-slate-600 max-w-sm">
                  {item.message}
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {item.date}
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-md text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {feedbackData[activeTab].length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No feedback available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
