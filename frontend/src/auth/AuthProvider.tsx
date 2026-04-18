import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  admin: any;
  token: string | null;
  login: (data: { admin: any; token: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [admin, setAdmin] = useState<any>(
    JSON.parse(localStorage.getItem("admin") || "null")
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = ({ admin, token }: { admin: any; token: string }) => {
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

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};