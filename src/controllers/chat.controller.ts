import { Request, Response } from "express";
import { Chat } from "../models/Chat.js";
import { User } from "../models/User.js";

// CREATE CHAT
export const createChat = async (req: Request, res: Response) => {
  try {
    const { title, userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chat = await Chat.create({
      title,
      userId,
    });

    return res.status(201).json(chat);
  } catch (error) {
    return res.status(500).json({ message: "Error creating chat", error });
  }
};

// GET ALL CHATS FOR USER
export const getChatsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const chats = await Chat.findAll({
      where: { userId },
    });

    return res.json(chats);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching chats", error });
  }
};
