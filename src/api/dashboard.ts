import { api } from "./client";

export const getAllTasks = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};
