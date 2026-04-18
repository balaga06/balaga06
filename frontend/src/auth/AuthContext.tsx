import { createContext } from "react";

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  login: (data: { admin: Admin; token: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  admin: null,
  token: null,
  login: () => {},
  logout: () => {},
});
