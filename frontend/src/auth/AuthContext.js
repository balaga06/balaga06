import { createContext } from "react";
export const AuthContext = createContext({
    admin: null,
    token: null,
    login: () => { },
    logout: () => { },
});
