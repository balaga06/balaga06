import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth";
export default function ProtectedRoute({ children }) {
    const { token } = useAuth();
    if (!token) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return children;
}
