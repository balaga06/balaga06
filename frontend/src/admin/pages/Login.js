import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, GraduationCap } from "lucide-react";
import { loginService } from "@/auth/authService";
import { useAuth } from "@/auth/useAuth";
export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    /* ================= SUBMIT ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await loginService(formData.email, formData.password);
            // ✅ CORRECT auth state update
            login({
                admin: data.user,
                token: data.token,
            });
            navigate("/admin");
        }
        catch (err) {
            setError(err?.response?.data?.message || "Invalid email or password");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-slate-100 px-4", children: _jsxs("div", { className: "w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-8", children: [_jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx("div", { className: "w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center mb-3", children: _jsx(GraduationCap, { className: "w-7 h-7 text-white" }) }), _jsx("h1", { className: "text-xl font-semibold text-slate-800", children: "JNTUK Admin Portal" }), _jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Internal Quality Assurance Cell (IQAC)" })] }), error && (_jsx("div", { className: "mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), placeholder: "admin@jntuk.edu.in", className: "w-full h-11 pl-10 pr-3 border border-slate-300 rounded-md text-sm\n                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }), placeholder: "********", className: "w-full h-11 pl-10 pr-10 border border-slate-300 rounded-md text-sm\n                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600", children: showPassword ? (_jsx(EyeOff, { className: "w-4 h-4" })) : (_jsx(Eye, { className: "w-4 h-4" })) })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-slate-500", children: "Authorized users only" }), _jsx(Link, { to: "/admin/forgot-password", className: "text-indigo-600 hover:underline", children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md\n                       text-sm font-medium transition disabled:opacity-70 flex items-center justify-center", children: loading ? "Signing in..." : "Sign In" })] }), _jsxs("div", { className: "mt-8 text-center text-xs text-slate-500", children: ["\u00A9 ", new Date().getFullYear(), " Jawaharlal Nehru Technological University, Kakinada"] }), _jsx("div", { className: "mt-4 text-center", children: _jsx(Link, { to: "/", className: "text-xs text-slate-500 hover:text-slate-700", children: "\u2190 Back to University Website" }) })] }) }));
}
