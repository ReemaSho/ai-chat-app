import express from "express";
import { sendMessage, getMessagesByChat, } from "../controllers/message.controller.js";
const router = express.Router();
router.post("/messages", sendMessage);
router.get("/chats/:chatId/messages", getMessagesByChat);
export default router;
//# sourceMappingURL=message.routes.js.map