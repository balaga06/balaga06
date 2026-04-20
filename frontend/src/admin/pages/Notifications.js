import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Eye, Download, } from "lucide-react";
import toast from "react-hot-toast";
import { getNotifications, createNotification, updateNotification, deleteNotification, } from "@/admin/services/notification.api";
const BASE_URL = "http://localhost:5000";
export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewFile, setViewFile] = useState(null);
    const [editing, setEditing] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showActiveOnly, setShowActiveOnly] = useState(true); // ✅ view toggle
    const [form, setForm] = useState({
        title: "",
        category: "",
        type: "",
        programme: "",
        branch: "",
        file: null,
        is_active: true,
        is_scrolling: true, // ✅ ADD THIS
    });
    // ✅ SAFE URL HANDLER FUNCTION
    const getFileUrl = (file) => {
        if (!file)
            return null;
        if (file.startsWith("http"))
            return file;
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
    const getBranchesForProgramme = (programme) => {
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
        }
        catch {
            toast.error("Failed to fetch notifications");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
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
            if (form.file)
                payload.append("file", form.file);
            if (editing) {
                await updateNotification(editing.id, payload);
                toast.success("Updated successfully");
            }
            else {
                await createNotification(payload);
                toast.success("Uploaded successfully");
            }
            await fetchData();
            closeModal();
        }
        catch (err) {
            toast.error(err?.response?.data?.message || "Error saving");
        }
        finally {
            setSubmitting(false);
        }
    };
    /* ================= DELETE ================= */
    const handleDelete = async (id) => {
        if (!confirm("Delete this document?"))
            return;
        try {
            await deleteNotification(id);
            toast.success("Deleted successfully");
            fetchData();
        }
        catch {
            toast.error("Delete failed");
        }
    };
    /* ================= TOGGLE ACTIVE/INACTIVE ================= */
    const toggleActiveStatus = async (item) => {
        try {
            const payload = new FormData();
            payload.append("is_active", String(!item.is_active));
            await updateNotification(item.id, payload);
            toast.success(`Marked as ${!item.is_active ? "Active" : "Inactive"}`);
            fetchData();
        }
        catch {
            toast.error("Failed to toggle status");
        }
    };
    /* ================= MODAL ================= */
    const openModal = (item) => {
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
                is_scrolling: item.is_scrolling ?? true, // ✅ ADD THIS
            });
        }
        else {
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
        return (_jsx("div", { className: "flex justify-center min-h-[60vh]", children: _jsx(Loader2, { className: "animate-spin w-8 h-8 text-indigo-600" }) }));
    }
    /* ================= GET AVAILABLE BRANCHES ================= */
    const availableBranches = getBranchesForProgramme(form.programme);
    /* ================= FILTER ACTIVE ================= */
    const visibleNotifications = showActiveOnly
        ? notifications.filter((n) => n.is_active)
        : notifications;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Notifications" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("label", { className: "flex items-center gap-1 text-sm", children: [_jsx("input", { type: "checkbox", checked: showActiveOnly, onChange: (e) => setShowActiveOnly(e.target.checked) }), "Show Active Only"] }), _jsxs("button", { onClick: () => openModal(), className: "bg-indigo-600 text-white px-4 py-2 rounded flex gap-2", children: [_jsx(Plus, { size: 16 }), " Upload"] })] })] }), _jsxs("table", { className: "w-full border rounded text-sm", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "p-2", children: "S.No" }), _jsx("th", { className: "p-2", children: "Title" }), _jsx("th", { className: "p-2", children: "Category" }), _jsx("th", { className: "p-2", children: "Type" }), _jsx("th", { className: "p-2", children: "Programme" }), _jsx("th", { className: "p-2", children: "Branch" }), _jsx("th", { className: "p-2", children: "Status" }), _jsx("th", { className: "p-2", children: "File" }), _jsx("th", { className: "p-2", children: "Actions" })] }) }), _jsx("tbody", { children: visibleNotifications.map((n, i) => (_jsxs("tr", { className: "border-t text-center", children: [_jsx("td", { className: "p-2", children: i + 1 }), _jsx("td", { className: "p-2", children: n.title }), _jsx("td", { className: "p-2", children: n.category }), _jsx("td", { className: "p-2", children: n.type || "-" }), _jsx("td", { className: "p-2", children: n.programme || "-" }), _jsx("td", { className: "p-2", children: n.branch || "-" }), _jsx("td", { className: "p-2", children: _jsx("button", { onClick: () => toggleActiveStatus(n), className: `px-2 py-1 rounded text-xs ${n.is_active
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-400 text-white"}`, children: n.is_active ? "Active" : "Inactive" }) }), _jsx("td", { className: "p-2", children: n.file_url ? (_jsx("span", { className: "text-green-600 text-xs", children: "File Uploaded" })) : (_jsx("span", { className: "text-red-500 text-xs", children: "No File" })) }), _jsxs("td", { className: "flex justify-center gap-3 py-2", children: [_jsx(Eye, { className: `cursor-pointer ${!n.file_url && "opacity-30"}`, onClick: () => {
                                                const url = getFileUrl(n.file_url);
                                                if (url) {
                                                    window.open(url, "_blank");
                                                }
                                                else {
                                                    toast.error("No file available");
                                                }
                                            } }), _jsx(Download, { className: `cursor-pointer ${!n.file_url && "opacity-30"}`, onClick: () => {
                                                const url = getFileUrl(n.file_url);
                                                if (url) {
                                                    const link = document.createElement("a");
                                                    link.href = url;
                                                    link.download = "";
                                                    link.click();
                                                }
                                                else {
                                                    toast.error("No file available");
                                                }
                                            } }), _jsx(Pencil, { onClick: () => openModal(n), className: "cursor-pointer text-blue-600" }), _jsx(Trash2, { onClick: () => handleDelete(n.id), className: "cursor-pointer text-red-600" })] })] }, n.id))) })] }), viewFile && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex justify-center items-center z-50", children: _jsxs("div", { className: "bg-white p-4 rounded max-w-4xl max-h-[90vh] overflow-auto", children: [_jsx("div", { className: "flex justify-end mb-2", children: _jsx(X, { onClick: () => setViewFile(null), className: "cursor-pointer" }) }), _jsx("iframe", { src: viewFile, className: "w-[800px] h-[600px]" })] }) })), isModalOpen && (_jsx("div", { className: "fixed inset-0 bg-black/40 flex justify-center items-center z-50", children: _jsxs("div", { className: "bg-white p-6 rounded w-full max-w-md max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex justify-between mb-4", children: [_jsxs("h2", { className: "text-lg font-semibold", children: [editing ? "Edit" : "Upload", " Notification"] }), _jsx(X, { onClick: closeModal, className: "cursor-pointer" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsx("input", { placeholder: "Title", value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), className: "w-full border p-2 rounded", required: true }), _jsxs("select", { value: form.category, onChange: (e) => setForm({
                                        ...form,
                                        category: e.target.value,
                                        type: "",
                                        programme: "",
                                        branch: "",
                                    }), className: "w-full border p-2 rounded", required: true, children: [_jsx("option", { value: "", children: "Select Category" }), _jsx("option", { value: "nirf", children: "NIRF" }), _jsx("option", { value: "naac", children: "NAAC" }), _jsx("option", { value: "reports", children: "Reports" }), _jsx("option", { value: "minutes", children: "Minutes-Meetings" }), _jsx("option", { value: "syllabus", children: "Syllabus" })] }), form.category === "syllabus" && (_jsxs("select", { value: form.type, onChange: (e) => setForm({
                                        ...form,
                                        type: e.target.value,
                                        programme: "",
                                        branch: "",
                                    }), className: "w-full border p-2 rounded", required: true, children: [_jsx("option", { value: "", children: "Select Type" }), _jsx("option", { value: "UG", children: "Under Graduate" }), _jsx("option", { value: "PG", children: "Post Graduate" })] })), form.type && (_jsxs("select", { value: form.programme, onChange: (e) => setForm({
                                        ...form,
                                        programme: e.target.value,
                                        branch: "",
                                    }), className: "w-full border p-2 rounded", required: true, children: [_jsx("option", { value: "", children: "Select Programme" }), (form.type === "UG" ? UG_PROGRAMMES : PG_PROGRAMMES).map((p) => (_jsx("option", { value: p, children: p }, p)))] })), form.programme && availableBranches.length > 0 && (_jsxs("select", { value: form.branch, onChange: (e) => setForm({ ...form, branch: e.target.value }), className: "w-full border p-2 rounded", required: true, children: [_jsx("option", { value: "", children: "Select Branch" }), availableBranches.map((b) => (_jsx("option", { value: b, children: b }, b)))] })), _jsx("input", { type: "file", required: !editing, onChange: (e) => setForm({
                                        ...form,
                                        file: e.target.files?.[0] || null,
                                    }), className: "w-full" }), _jsxs("label", { className: "flex items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: form.is_active, onChange: (e) => setForm({ ...form, is_active: e.target.checked }) }), "Active Notification (show in scroll bar)"] }), _jsxs("label", { className: "flex items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: form.is_scrolling, onChange: (e) => setForm({ ...form, is_scrolling: e.target.checked }) }), "Show in Scroll Bar"] }), _jsx("button", { disabled: submitting, className: "bg-indigo-600 text-white w-full py-2 rounded disabled:opacity-50", children: submitting ? "Saving..." : "Save" })] })] }) }))] }));
}
