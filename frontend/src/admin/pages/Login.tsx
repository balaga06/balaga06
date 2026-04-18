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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginService(
        formData.email,
        formData.password
      );

      // ✅ CORRECT auth state update
      login({
        admin: data.user,
        token: data.token,
      });

      navigate("/admin");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-lg bg-indigo-600 flex items-center justify-center mb-3">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">
            JNTUK Admin Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Internal Quality Assurance Cell (IQAC)
          </p>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="admin@jntuk.edu.in"
                className="w-full h-11 pl-10 pr-3 border border-slate-300 rounded-md text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="********"
                className="w-full h-11 pl-10 pr-10 border border-slate-300 rounded-md text-sm
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Authorized users only</span>
            <Link
              to="/admin/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md
                       text-sm font-medium transition disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* ================= FOOTER ================= */}
        <div className="mt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Jawaharlal Nehru Technological University, Kakinada
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            ← Back to University Website
          </Link>
        </div>
      </div>
    </div>
  );
}
