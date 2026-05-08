import { api } from "./axios";

/* ---------------------------
   NON-STREAMING (keep axios)
---------------------------- */

export const getMessagesByChat = async (chatId: number) => {
  const response = await api.get(`/chats/${chatId}/messages`);
  return response.data;
};

/* ---------------------------
   STREAMING (NEW)
---------------------------- */

export const sendMessageStream = async (
  chatId: number | null,
  content: string,
  userId: number,
  onChunk?: (text: string) => void,
  onMeta?: (meta: any) => void
) => {
  const response = await fetch("http://localhost:8000/api/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId,
      content,
      userId,
    }),
  });

  if (!response.body) {
    throw new Error("Streaming not supported in this browser response");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const data = JSON.parse(line);

        // 🟢 metadata (chatId, userMessage, etc.)
        if (data.type === "meta") {
          onMeta?.(data);
        }

        // 🟢 AI streaming chunk
        if (data.type === "chunk") {
          onChunk?.(data.content);
        }
      } catch (err) {
        console.error("Stream parse error:", err);
      }
    }
  }
};

export const sendMessage = async (
  chatId: number | null,
  content: string,
  userId: number
) => {
  const response = await api.post("/messages", {
    chatId,
    content,
    userId,
  });

  return response.data;
};
