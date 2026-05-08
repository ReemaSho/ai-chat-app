import { useNavigate } from "react-router-dom";
import { sendMessageStream } from "@/api/message.api";
import { useAuth } from "@/hooks/useAuth";

export const useStartChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const startChat = async (content: string) => {
    try {
      let createdChatId: number | null = null;
      const chatId = null;
      await sendMessageStream(chatId, content, user.id, undefined, (meta) => {
        createdChatId = meta.chatId;
      });

      // navigate AFTER stream starts
      if (createdChatId) {
        navigate(`/chat/${createdChatId}`);
      }
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  return { startChat };
};
