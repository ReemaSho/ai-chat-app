import { api } from "./axios";

export const getChatsByUser = async (userId: number) => {
  const response = await api.get(`/chats/${userId}`);
  return response.data;
};

export const createChat = async (title: string, userId: number) => {
  const response = await api.post("/chats", {
    title,
    userId,
  });

  return response.data;
};
