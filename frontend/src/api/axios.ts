import axios, {
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

/* ================= BASE INSTANCE ================= */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

/* ================= REQUEST INTERCEPTOR ================= */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

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

    if (status === 401) {
      console.warn("🔒 Unauthorized - redirecting to login");

      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    if (status === 500) {
      console.error("🔥 Server error:", error.response?.data);
    }

    if (!error.response) {
      console.error("🌐 Network error / backend down");
    }

    return Promise.reject(error);
  }
);

export default api;