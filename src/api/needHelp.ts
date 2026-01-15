import { api } from "./client";

interface NeedHelpType {
  email: string;
  comment: string;
}

export const needHelpApi = async (data: NeedHelpType) => {
  const res = await api.post("/auth/needHelp", data);
  return res.data;
};
