import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Save, Lock, Bell, University, UserCog, KeyRound, CheckCircle, } from "lucide-react";
/* ================= MAIN COMPONENT ================= */
export default function Settings() {
    const [settings, setSettings] = useState({
        universityName: "Jawaharlal Nehru Technological University Kakinada",
        shortName: "JNTUK",
        adminEmail: "admin@jntuk.edu.in",
        contactNumber: "+91 98765 43210",
        twoFactorAuth: true,
        emailNotifications: true,
        systemMaintenance: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const handleChange = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };
    const handlePasswordChange = (key, value) => {
        setPasswords({ ...passwords, [key]: value });
    };
    const handlePasswordSave = () => {
        if (!passwords.currentPassword ||
            !passwords.newPassword ||
            !passwords.confirmPassword) {
            alert("Please fill all password fields");
            return;
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }
        setPasswordSaved(true);
        setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setTimeout(() => {
            setPasswordSaved(false);
            setShowPassword(false);
        }, 2000);
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-slate-800", children: "Settings" }), _jsx("p", { className: "text-sm text-slate-500", children: "Manage system, security, and university configuration" })] }), _jsxs(Section, { title: "University Information", icon: _jsx(University, { className: "w-5 h-5 text-indigo-600" }), children: [_jsx(Field, { label: "University Name", value: settings.universityName, onChange: (e) => handleChange("universityName", e.target.value) }), _jsx(Field, { label: "Short Name", value: settings.shortName, onChange: (e) => handleChange("shortName", e.target.value) }), _jsx(Field, { label: "Contact Number", value: settings.contactNumber, onChange: (e) => handleChange("contactNumber", e.target.value) })] }), _jsx(Section, { title: "Administrator", icon: _jsx(UserCog, { className: "w-5 h-5 text-indigo-600" }), children: _jsx(Field, { label: "Admin Email", value: settings.adminEmail, type: "email", onChange: (e) => handleChange("adminEmail", e.target.value) }) }), _jsxs(Section, { title: "Security", icon: _jsx(Lock, { className: "w-5 h-5 text-indigo-600" }), children: [_jsxs("button", { onClick: () => setShowPassword(!showPassword), className: "flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline col-span-full", children: [_jsx(KeyRound, { className: "w-4 h-4" }), "Change Password"] }), showPassword && (_jsxs("div", { className: "col-span-full space-y-4 mt-2", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsx(Field, { label: "Current Password", type: "password", value: passwords.currentPassword, onChange: (e) => handlePasswordChange("currentPassword", e.target.value) }), _jsx(Field, { label: "New Password", type: "password", value: passwords.newPassword, onChange: (e) => handlePasswordChange("newPassword", e.target.value) }), _jsx(Field, { label: "Confirm New Password", type: "password", value: passwords.confirmPassword, onChange: (e) => handlePasswordChange("confirmPassword", e.target.value) })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { onClick: handlePasswordSave, className: "flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium", children: [_jsx(Save, { className: "w-4 h-4" }), "Save Password"] }), passwordSaved && (_jsxs("span", { className: "flex items-center gap-2 text-green-600 text-sm font-medium", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), "Password saved successfully"] }))] })] }))] }), _jsx(Section, { title: "Notifications", icon: _jsx(Bell, { className: "w-5 h-5 text-indigo-600" }), children: _jsx(Toggle, { label: "Email Notifications", checked: settings.emailNotifications, onChange: (v) => handleChange("emailNotifications", v) }) }), _jsx("div", { className: "flex justify-end", children: _jsxs("button", { className: "flex items-center gap-2 px-5 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium", children: [_jsx(Save, { className: "w-4 h-4" }), "Save Changes"] }) })] }));
}
function Section({ title, icon, children }) {
    return (_jsxs("div", { className: "bg-white border border-slate-200 rounded-xl p-6 space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3 border-b pb-3", children: [icon, _jsx("h2", { className: "text-lg font-semibold text-slate-800", children: title })] }), _jsx("div", { className: "grid md:grid-cols-2 gap-4", children: children })] }));
}
function Field({ label, value, onChange, type = "text", }) {
    return (_jsxs("div", { className: "space-y-1", children: [_jsx("label", { className: "text-sm font-medium text-slate-600", children: label }), _jsx("input", { type: type, value: value, onChange: onChange, className: "w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500" })] }));
}
function Toggle({ label, checked, onChange }) {
    return (_jsxs("div", { className: "flex items-center justify-between col-span-full", children: [_jsx("span", { className: "text-sm font-medium text-slate-700", children: label }), _jsx("button", { onClick: () => onChange(!checked), className: `w-12 h-6 rounded-full px-1 transition ${checked ? "bg-indigo-600" : "bg-slate-300"}`, children: _jsx("span", { className: `block w-4 h-4 bg-white rounded-full transition ${checked ? "translate-x-6" : ""}` }) })] }));
}
