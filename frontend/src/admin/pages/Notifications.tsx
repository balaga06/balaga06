import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Eye,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  type Notification,
} from "@/admin/services/notification.api";

const BASE_URL = "http://localhost:5000";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewFile, setViewFile] = useState<string | null>(null);
  const [editing, setEditing] = useState<Notification | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(true); // ✅ view toggle

  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "",
    programme: "",
    branch: "",
    file: null as File | null,
    is_active: true,
    is_scrolling: true, // ✅ ADD THIS
  });

  // ✅ SAFE URL HANDLER FUNCTION
  const getFileUrl = (file: any) => {
    if (!file) return null;
    if (file.startsWith("http")) return file;
    return `${BASE_URL}${file}`;
  };

  /* ================= PROGRAM LIST ================= */
  const UG_PROGRAMMES = [
    "Bachelor of Technology",
    "Bachelor of Pharmacy",
    "Bachelor of Architecture",
  ];

  const PG_PROGRAMMES = [
    "Pharm D",
    "Master of Technology",
    "Master of Pharmacy",
    "Master of Computer Applications",
    "Master of Business Administration",
    "Management of Applied Management",
  ];

  /* ================= BTECH BRANCHES ================= */
  const BTECH_BRANCHES = [
    "CSE (Regional Language)",
    "Computer Science and Design",
    "Artificial Intelligence and Machine Learning",
    "Internet of Thing",
    "Cyber Security",
    "CSE (Big Data Analytics)",
    "Computer Science and Business System",
    "Aerospace Engineering",
    "Pharmaceutical Engineering",
    "Artificial Intelligence and Data Science",
    "ME (Robotics)",
    "ECE (Internet of Things)",
    "Food Engineering",
    "ECE (Electronics & Communication Technology)",
    "CSE (Internet of Things)",
    "CSE (Computer Science and Business System)",
    "CSE (Internet of Things and Cyber Security including Blockchain Technology)",
    "CSE (Cyber Security)",
    "CSE (Artificial Intelligence and Data Science)",
    "CSE (Data Science)",
    "CSE (Artificial Intelligence)",
    "CSE (Artificial Intelligence and Machine Learning)",
    "Textile Engineering",
    "Agriculture Engineering",
    "Power Engineering",
    "Metallurgical Engineering",
    "Aircraft Engineering",
    "Aviation Engineering",
    "Petrochemical Engineering",
    "Petroleum Engineering",
    "Mining",
    "Automobile Engineering",
    "Bio-Technology",
    "Instrumentation & Control Engineering",
    "Aeronautical Engineering",
    "Electronics & Computer Engineering",
    "Metallurgy Engineering",
    "Computer Science and Systems Engineering",
    "Electronics & Communication Technology",
    "Electronics & Control Engineering",
    "Information Technology",
    "Bio-Medical Engineering",
    "Electronics & Instrumentation Engineering",
    "Chemical Engineering",
    "Computer Science & Information Technology",
    "Computer Science & Technology",
    "Computer Engineering",
    "Electronics Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
  ];

  /* ================= MTECH BRANCHES ================= */
  const MTECH_BRANCHES = [
    "Agricultural Engineering",
    "Agricultural Engineering (Farm Machinery & Power Engineering)",
    "Mining Engineering",
    "Robotics and Artificial Intelligence",
    "CSE - Cyber Security",
    "CSE - Data Science",
    "CSE Artificial Intelligence & Machine Learning",
    "Artificial Intelligence & Data Sciences",
    "ECE Internet of Things",
    "CSE Artificial Intelligence",
    "Robotics",
    "CSE Internet of Things",
    "Artificial Intelligence & Machine Learning",
    "Artificial Intelligence",
    "Automobile Engineering",
    "Power Electronics & Power Systems",
    "M.S. Sports Technology & Health Science",
    "Avionics",
    "Nano Technology",
    "Control Systems",
    "Computer Networks",
    "Mechatronics",
    "Chemical Engineering",
    "Infrastructure Engineering & Management",
    "Bio-Medical Engineering",
    "Bio-Informatics",
    "Data Science",
    "Structural Engineering",
    "Environmental Engineering",
    "Structural Design",
    "Computer Networks & Information Security",
    "Telematics",
    "Microwave & Communication Engineering",
    "Embedded Systems & VLSI Design",
    "Communications & Signal Processing",
    "MS Occupational Health & Safety Course",
    "Food Processing Technology",
    "VLSI Design & Embedded Systems",
    "VLSI & Micro Electronics",
    "Digital Signal Processing",
    "Geo Informatics",
    "Civil",
    "VLSI Design",
    "Tele Communications",
    "Electronics & Communication Engineering",
    "Neural Networks",
    "VLSI & Embedded Systems",
    "M.S in VLSI Engineering",
    "Power Systems & Automation",
    "Electrical Power Systems",
    "High Voltage and Power Systems Engineering",
    "Digital Image Processing",
    "High Voltage Engineering",
    "VLSI System Design",
    "Electrical Power Engineering",
    "Computer Science & Technology",
    "Computer Science Engineering",
    "VLSI",
    "Power Systems",
    "Embedded Systems",
    "Power Electronics & Electric Drives",
    "Power System Control & Automation",
    "Power Electronics & Drives",
    "Chemical",
    "Advanced Power Systems",
    "Computers and Communication Engineering",
    "Embedded Systems & VLSI",
    "Communication Systems",
    "Communication Engineering & Signal Processing",
    "Systems and Signal Processing",
    "Electrical Machine & Drives",
    "Power Electronics",
    "Power & Industrial Drives",
    "Aerospace Engineering",
    "Information Technology",
    "Computers and Communications",
    "Digital Electronics & Communication Systems",
    "Digital Electronics & Communication Engineering",
    "Signal Processing & Communications",
    "Computer Aided Structural Analysis and Design",
    "Product Design & Manufacturing",
    "Remote Sensing",
    "Spatial Information Technology",
    "Power System & Control",
    "Power System Engineering",
    "PS with Emphasis on HV Engineering",
    "Control Engineering",
    "Instrumentation and Control Systems",
    "Cyber Security",
    "Software Engineering",
    "Material Science & Technology",
    "Highway Engineering",
    "Transportation Engineering",
    "Thermal Engineering",
    "Geo Technical Engineering",
    "Soil Mechanics & Foundation Engineering",
    "Thermal Sciences and Energy Systems",
    "Advanced Manufacturing Systems",
    "Computer Aided Analysis and Design",
    "Machine Design",
    "Mechanical Engineering Design",
    "Advanced Manufacturing and Mechanical Systems Design",
    "Power Electronics & Systems",
    "Computer & Communications",
    "Image Processing (IP)",
    "Computer Aided Design and Manufacturing",
    "Petroleum Engineering",
    "Pipe Line Engineering",
    "Digital System & Computer Electronics",
    "Computer Science",
    "CAD/CAM",
    "Bio-Technology",
    "Renewable Energy",
    "Environmental Engineering & Management",
  ];

  /* ================= MPHARM BRANCHES ================= */
  const MPHARM_BRANCHES = [
    "Pharmaceutical Regulatory Affairs",
    "Pharmaceutical Analysis",
    "Quality Assurance and Regulatory Affairs",
    "Pharmacology and Toxicology",
    "Pharmaceutical Management and Regulatory Affairs",
    "Pharmaceutical Analysis and Quality Control",
    "Pharmaceutical Technology",
    "Clinical Pharmacy",
    "Industrial Pharmacy",
    "Pharmacy Practice Course",
    "Pharmacognosy",
    "Pharmacology",
    "Bio-Technology",
    "Pharmaceutical Analysis & Quality Assurance",
    "Pharmaceutics",
    "Pharmaceutical Chemistry",
  ];

  /* ================= GET BRANCHES FOR PROGRAMME ================= */
  const getBranchesForProgramme = (programme: string): string[] => {
    switch (programme) {
      // UG
      case "Bachelor of Technology":
        return BTECH_BRANCHES;
      case "Bachelor of Pharmacy":
        return ["B.Pharmacy"];
      case "Bachelor of Architecture":
        return ["Architecture (B.Arch)"];
      // PG
      case "Pharm D":
        return ["PharmD"];
      case "Master of Technology":
        return MTECH_BRANCHES;
      case "Master of Pharmacy":
        return MPHARM_BRANCHES;
      case "Master of Computer Applications":
        return ["MCA"];
      case "Master of Business Administration":
        return ["MBA"];
      case "Management of Applied Management":
        return ["MAM/ Integrated MBA"];
      default:
        return [];
    }
  };

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editing && !form.file) {
      toast.error("File is required");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();

      payload.append("title", form.title);
      payload.append("category", form.category);
      payload.append("type", form.type);
      payload.append("programme", form.programme);
      payload.append("branch", form.branch);
      payload.append("is_active", String(form.is_active));
      payload.append("is_scrolling", String(form.is_scrolling)); // ✅ ADD THIS

      if (form.file) payload.append("file", form.file);

      if (editing) {
        await updateNotification(editing.id, payload);
        toast.success("Updated successfully");
      } else {
        await createNotification(payload);
        toast.success("Uploaded successfully");
      }

      await fetchData();
      closeModal();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error saving");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this document?")) return;

    try {
      await deleteNotification(id);
      toast.success("Deleted successfully");
      fetchData();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= TOGGLE ACTIVE/INACTIVE ================= */
  const toggleActiveStatus = async (item: Notification) => {
    try {
      const payload = new FormData();
      payload.append("is_active", String(!item.is_active));
      await updateNotification(item.id, payload);
      toast.success(`Marked as ${!item.is_active ? "Active" : "Inactive"}`);
      fetchData();
    } catch {
      toast.error("Failed to toggle status");
    }
  };

  /* ================= MODAL ================= */
  const openModal = (item?: Notification) => {
    if (item) {
      setEditing(item);
      setForm({
        title: item.title,
        category: item.category || "",
        type: item.type || "",
        programme: item.programme || "",
        branch: item.branch || "",
        file: null,
        is_active: item.is_active,
        is_scrolling: (item as any).is_scrolling ?? true, // ✅ ADD THIS
      });
    } else {
      setEditing(null);
      setForm({
        title: "",
        category: "",
        type: "",
        programme: "",
        branch: "",
        file: null,
        is_active: true,
        is_scrolling: true, // ✅ ADD THIS
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  /* ================= GET AVAILABLE BRANCHES ================= */
  const availableBranches = getBranchesForProgramme(form.programme);

  /* ================= FILTER ACTIVE ================= */
  const visibleNotifications = showActiveOnly
    ? notifications.filter((n) => n.is_active)
    : notifications;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Notifications</h1>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
            />
            Show Active Only
          </label>
          <button
            onClick={() => openModal()}
            className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2"
          >
            <Plus size={16} /> Upload
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full border rounded text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">S.No</th>
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Type</th>
            <th className="p-2">Programme</th>
            <th className="p-2">Branch</th>
            <th className="p-2">Status</th>
            <th className="p-2">File</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {visibleNotifications.map((n: any, i) => (
            <tr key={n.id} className="border-t text-center">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">{n.title}</td>
              <td className="p-2">{n.category}</td>
              <td className="p-2">{n.type || "-"}</td>
              <td className="p-2">{n.programme || "-"}</td>
              <td className="p-2">{n.branch || "-"}</td>

              <td className="p-2">
                <button
                  onClick={() => toggleActiveStatus(n)}
                  className={`px-2 py-1 rounded text-xs ${
                    n.is_active
                      ? "bg-green-600 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {n.is_active ? "Active" : "Inactive"}
                </button>
              </td>

              <td className="p-2">
                {n.file_url ? (
                  <span className="text-green-600 text-xs">File Uploaded</span>
                ) : (
                  <span className="text-red-500 text-xs">No File</span>
                )}
              </td>

              {/* ✅ FIXED ACTIONS COLUMN */}
              <td className="flex justify-center gap-3 py-2">
                <Eye
                  className={`cursor-pointer ${!n.file_url && "opacity-30"}`}
                  onClick={() => {
                    const url = getFileUrl(n.file_url);
                    if (url) {
                      window.open(url, "_blank");
                    } else {
                      toast.error("No file available");
                    }
                  }}
                />
                <Download
                  className={`cursor-pointer ${!n.file_url && "opacity-30"}`}
                  onClick={() => {
                    const url = getFileUrl(n.file_url);
                    if (url) {
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "";
                      link.click();
                    } else {
                      toast.error("No file available");
                    }
                  }}
                />
                <Pencil
                  onClick={() => openModal(n)}
                  className="cursor-pointer text-blue-600"
                />
                <Trash2
                  onClick={() => handleDelete(n.id)}
                  className="cursor-pointer text-red-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW FILE MODAL - Keep for backward compatibility but not used anymore */}
      {viewFile && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-end mb-2">
              <X onClick={() => setViewFile(null)} className="cursor-pointer" />
            </div>
            <iframe src={viewFile} className="w-[800px] h-[600px]" />
          </div>
        </div>
      )}

      {/* UPLOAD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editing ? "Edit" : "Upload"} Notification
              </h2>
              <X onClick={closeModal} className="cursor-pointer" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border p-2 rounded"
                required
              />

              {/* CATEGORY */}
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                    type: "",
                    programme: "",
                    branch: "",
                  })
                }
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                <option value="nirf">NIRF</option>
                <option value="naac">NAAC</option>
                <option value="reports">Reports</option>
                <option value="minutes">Minutes-Meetings</option>
                <option value="syllabus">Syllabus</option>
              </select>

              {/* TYPE */}
              {form.category === "syllabus" && (
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value,
                      programme: "",
                      branch: "",
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="UG">Under Graduate</option>
                  <option value="PG">Post Graduate</option>
                </select>
              )}

              {/* PROGRAMME */}
              {form.type && (
                <select
                  value={form.programme}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      programme: e.target.value,
                      branch: "",
                    })
                  }
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Programme</option>
                  {(form.type === "UG" ? UG_PROGRAMMES : PG_PROGRAMMES).map(
                    (p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    )
                  )}
                </select>
              )}

              {/* BRANCH */}
              {form.programme && availableBranches.length > 0 && (
                <select
                  value={form.branch}
                  onChange={(e) =>
                    setForm({ ...form, branch: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Branch</option>
                  {availableBranches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="file"
                required={!editing}
                onChange={(e) =>
                  setForm({
                    ...form,
                    file: e.target.files?.[0] || null,
                  })
                }
                className="w-full"
              />

              {/* ✅ Active Checkbox */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm({ ...form, is_active: e.target.checked })
                  }
                />
                Active Notification (show in scroll bar)
              </label>

              {/* ✅ Show in Scroll Bar Checkbox */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_scrolling}
                  onChange={(e) =>
                    setForm({ ...form, is_scrolling: e.target.checked })
                  }
                />
                Show in Scroll Bar
              </label>

              <button
                disabled={submitting}
                className="bg-indigo-600 text-white w-full py-2 rounded disabled:opacity-50"
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}