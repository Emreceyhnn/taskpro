import { api } from "./client";
import type { Dayjs } from "dayjs";

export interface AddBoardType {
  title: string;
  background: string;
  icon: string;
}

export interface AddColumnType {
  name: string;
  boardId: string;
}

export interface AddCardType {
  columnId: string;
  boardId: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low" | "none" | "";
  deadline: Dayjs | null;
}

export const addBoardApi = async (data: AddBoardType) => {
  const res = await api.post("/dashboard/boards", data);
  return res.data;
};

export const addColumnApi = async (data: AddColumnType) => {
  const res = await api.post(`/dashboard/boards/${data.boardId}/columns`, data);
  return res.data;
};

export const addCardApi = async (data: AddCardType) => {
  const res = await api.post(
    `/dashboard/boards/${data.boardId}/columns/${data.columnId}/tasks`,
    {
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
    }
  );
  return res.data;
};

export const getAllTasks = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};
