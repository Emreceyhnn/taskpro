import { api } from "./client";
import { setAccessToken, clearAccessToken } from "../lib/token";

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  setAccessToken(res.data.data.accessToken);
  return res.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data.message;
};

export const getGoogleOAuthUrl = async () => {
  const res = await api.get("/auth/get-oauth-url");
  console.log(res);
  return res.data.data.url;
};

export const confirmGoogleOAuth = async (code: string) => {
  const res = await api.post("/auth/confirm-oauth", { code });
  setAccessToken(res.data.data.accessToken);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
  clearAccessToken();
};

export const currentUser = async () => {
  const res = await api.get("/auth/current");
  return res.data;
};
