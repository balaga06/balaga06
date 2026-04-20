import axios from "axios";
export const loginService = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/admins/login", { email, password });
    // ✅ SAVE TOKEN HERE
    localStorage.setItem("token", res.data.token);
    return res.data;
};
