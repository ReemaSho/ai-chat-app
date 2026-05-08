import express from "express";
import { createChat, getChatsByUser } from "../controllers/chat.controller.js";
const router = express.Router();
// create chat
router.post("/chats", createChat);
// get chats for user
router.get("/chats/:userId", getChatsByUser);
export default router;
//# sourceMappingURL=chat.routes.js.map