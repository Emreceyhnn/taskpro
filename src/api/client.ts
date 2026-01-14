import axios from "axios";
import { getAccessToken } from "../lib/token";
const BACKEND_ENDPOINT = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BACKEND_ENDPOINT,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
