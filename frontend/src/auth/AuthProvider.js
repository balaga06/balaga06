import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin") || "null"));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const login = ({ admin, token }) => {
        console.log("Saving token:", token); // ✅ debug
        localStorage.setItem("admin", JSON.stringify(admin));
        localStorage.setItem("token", token);
        setAdmin(admin);
        setToken(token);
    };
    const logout = () => {
        localStorage.removeItem("admin");
        localStorage.removeItem("token");
        setAdmin(null);
        setToken(null);
    };
    return (_jsx(AuthContext.Provider, { value: { admin, token, login, logout }, children: children }));
};
