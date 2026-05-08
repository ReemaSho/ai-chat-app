import axios from "axios";

const API = "http://localhost:8000/api/v1";

export const getChats = (userId: number) =>
  axios.get(`${API}/users/${userId}/chats`);

export const getMessages = (chatId: number) =>
  axios.get(`${API}/chats/${chatId}/messages`);

export const sendMessage = (data: any) => axios.post(`${API}/messages`, data);
