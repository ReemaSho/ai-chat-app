import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMessagesByChat, sendMessageStream } from "@/api/message.api";
import { Message } from "@/types/message.types";

export const useChatMessages = () => {
  const { chatId } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false); // history loading
  const [streaming, setStreaming] = useState(false); // AI streaming

  // -----------------------------
  // LOAD HISTORY
  // -----------------------------
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);

        const data = await getMessagesByChat(Number(chatId));
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // -----------------------------
  // SEND MESSAGE (STREAMING)
  // -----------------------------
  const send = async (content: string) => {
    if (!chatId || !content.trim()) return;

    try {
      // 🔥 UI immediately shows "thinking"
      setStreaming(true);

      const userMessage: Message = {
        id: Date.now(),
        role: "user",
        content,
      };

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);

      let assistantText = "";
      let firstChunkReceived = false;

      await sendMessageStream(
        Number(chatId),
        content,
        1,

        // -----------------------------
        // STREAM CHUNK HANDLER
        // -----------------------------
        (chunk) => {
          // 🔥 first chunk arrives → AI is "active"
          if (!firstChunkReceived) {
            firstChunkReceived = true;
            setStreaming(false); // stop "thinking" state
          }

          assistantText += chunk;

          setMessages((prev) => {
            const copy = [...prev];
            const lastIndex = copy.length - 1;

            const last = copy[lastIndex];

            if (last?.role === "assistant") {
              copy[lastIndex] = {
                ...last,
                content: assistantText,
              };
            }

            return copy;
          });
        },

        (meta) => {
          console.log("meta:", meta);
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setStreaming(false);
    }
  };

  return {
    messages,
    send,
    loading,
    streaming,
  };
};
