import { api } from "./client";
import type { Dayjs } from "dayjs";
import axios from "axios";

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

export interface EditBoardType {
  _id: string;
  title: string;
  background: string;
  icon: string;
}

export interface EditColumnType {
  _id: string;
  name: string;
  order?: number;
}

export interface EditCardType {
  _id: string;
  boardId?: string;
  columnId?: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low" | "none" | "";
  deadline: Dayjs | null;
}

export interface CardForwarderType {
  _id: string;
  columnId: string;
}

/* ---------------------------------- BOARD --------------------------------- */

export const addBoardApi = async (data: AddBoardType) => {
  const res = await api.post("/dashboard/boards", data);
  return res.data;
};

export const editBoardApi = async (data: EditBoardType) => {
  const res = await api.patch(`/dashboard/boards/${data._id}`, data);
  return res.data;
};

export const deleteBoardApi = async (data: string) => {
  const res = await api.delete(`/dashboard/boards/${data}`);
  return res.data;
};

/* --------------------------------- COLUMN --------------------------------- */

export const addColumnApi = async (data: AddColumnType) => {
  const res = await api.post(`/dashboard/boards/${data.boardId}/columns`, data);
  return res.data;
};

export const EditColumn = async (data: EditColumnType) => {
  const res = await api.patch(`/dashboard/columns/${data._id}`, data);
  return res.data;
};

export const deleteColumnApi = async (data: string) => {
  const res = await api.delete(`/dashboard/columns/${data}`);
  return res.data;
};

/* ---------------------------------- TASK ---------------------------------- */

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

export const editCardApi = async (data: EditCardType) => {
  const res = await api.patch(`/dashboard/tasks/${data._id}`, data);
  return res;
};

export const cardForwarder = async (data: CardForwarderType) => {
  const res = await api.patch(`/dashboard/tasks/${data._id}/forward`, data);
  return res.data;
};

export const deleteCardApi = async (taskId: string) => {
  const res = await api.delete(`/dashboard/tasks/${taskId}`);
  return res.data;
};

/* --------------------------------- ALLDATA -------------------------------- */

export const getAllTasks = async () => {
  try {
    const res = await api.get("/dashboard");
    return res.data;
  } catch (error: unknown) {
    console.log(error);
  }
};

interface NeedHelpValues {
  email: string;
  comment: string;
}

export const needHelpApi = async (data: NeedHelpValues) => {
  console.log(data);
};
