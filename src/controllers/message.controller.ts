import { Request, Response } from "express";
import { Chat } from "../models/Chat.js";
import { Message } from "../models/Message.js";
import { openRouter } from "../config/openrouter.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, content, userId } = req.body;

    // 1. find or create chat
    let chat = chatId ? await Chat.findByPk(chatId) : null;

    if (!chat) {
      chat = await Chat.create({
        title: content.slice(0, 30),
        userId: userId || 1,
      });
    }

    // 2. save user message
    const userMessage = await Message.create({
      role: "user",
      content,
      chatId: chat.id,
    });

    // 3. get history
    const messages = await Message.findAll({
      where: { chatId: chat.id },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    const formattedMessages = messages
      .reverse()
      .map((m) => {
        const role = m.getDataValue("role");
        const content = m.getDataValue("content");

        return {
          role: role as "user" | "assistant",
          content: String(content).trim(),
        };
      })
      .filter((m) => m.content.length > 0);

    // 4. IMPORTANT: enable streaming response
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // PHASE 1: send metadata FIRST (as a chunk)
    res.write(
      JSON.stringify({
        type: "meta",
        chatId: chat.id,
        userMessage,
      }) + "\n"
    );

    // 5. call OpenRouter stream
    const stream = await openRouter.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: formattedMessages,
      stream: true,
    });

    let fullResponse = "";

    //  PHASE 2: stream AI tokens
    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;

      if (content) {
        fullResponse += content;

        res.write(
          JSON.stringify({
            type: "chunk",
            content,
          }) + "\n"
        );
      }
    }

    // 6. save final assistant message
    await Message.create({
      role: "assistant",
      content: fullResponse,
      chatId: chat.id,
    });

    // 7. end stream
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error sending message",
    });
  }
};

export const getMessagesByChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.findAll({
      where: { chatId },
      order: [["createdAt", "ASC"]],
    });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching messages",
    });
  }
};
