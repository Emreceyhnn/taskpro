import axios from "axios";
import { getAccessToken } from "../lib/token";

export const api = axios.create({
  baseURL: "https://taskpro-backend-57d3.onrender.com",
  withCredentials: true,
});

/* ================= REQUEST ================= */
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= RESPONSE ================= */
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    // 🔥 Session yok / expired → GLOBAL redirect
    if (
      status === 401 &&
      (message === "Session not found" || message === "Session expired")
    ) {
      // login sayfasındaysa loop'a girme
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);
