import axios, {
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

/* ================= BASE INSTANCE ================= */

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: false,
});

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    // ✅ DO NOT overwrite headers
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<any>) => {
    const status = error.response?.status;

    /* ================= 401 ================= */
    if (status === 401) {
      console.warn("🔒 Unauthorized - redirecting to login");

      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    /* ================= 500 ================= */
    if (status === 500) {
      console.error("🔥 Server error:", error.response?.data);
    }

    /* ================= NETWORK ================= */
    if (!error.response) {
      console.error("🌐 Network error / backend down");
    }

    return Promise.reject(error);
  }
);

export default api;