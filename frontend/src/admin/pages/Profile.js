import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Camera, X, } from "lucide-react";
export default function Profile() {
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        name: "Admin User",
        email: "admin@jntuk.edu.in",
        phone: "",
    });
    /* ================= IMAGE HANDLERS ================= */
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };
    const handleRemoveImage = () => {
        setProfileImage(null);
    };
    /* ================= INPUT HANDLER ================= */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    /* ================= SUBMIT ================= */
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto px-6 py-10", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-800 mb-1", children: "My Profile" }), _jsx("p", { className: "text-slate-500 mb-8", children: "Manage your personal information" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white border border-slate-200 rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center gap-6 mb-8", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-28 h-28 rounded-full bg-slate-100 border flex items-center justify-center overflow-hidden", children: profileImage ? (_jsx("img", { src: profileImage, alt: "Profile", className: "w-full h-full object-cover" })) : (_jsx(User, { className: "w-12 h-12 text-slate-400" })) }), _jsxs("label", { className: "absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition", children: [_jsx(Camera, { className: "w-4 h-4" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleImageChange, hidden: true })] }), profileImage && (_jsx("button", { type: "button", onClick: handleRemoveImage, className: "absolute -top-1 -right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition", title: "Remove image", children: _jsx(X, { className: "w-3 h-3" }) }))] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-800", children: "Profile Photo" }), _jsx("p", { className: "text-sm text-slate-500", children: "Upload or remove your profile image" })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Full Name" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(User, { className: "absolute left-3 top-3 w-4 h-4 text-slate-400" }), _jsx("input", { name: "name", value: formData.name, onChange: handleChange, className: "w-full pl-9 h-10 border rounded-md" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Email" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Mail, { className: "absolute left-3 top-3 w-4 h-4 text-slate-400" }), _jsx("input", { value: formData.email, disabled: true, className: "w-full pl-9 h-10 border rounded-md bg-slate-100 cursor-not-allowed" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium", children: "Phone" }), _jsxs("div", { className: "relative mt-1", children: [_jsx(Phone, { className: "absolute left-3 top-3 w-4 h-4 text-slate-400" }), _jsx("input", { name: "phone", value: formData.phone, onChange: handleChange, className: "w-full pl-9 h-10 border rounded-md" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-4 mt-8", children: [_jsx(Button, { variant: "outline", type: "reset", children: "Cancel" }), _jsx(Button, { type: "submit", children: "Save Changes" })] })] })] }));
}
