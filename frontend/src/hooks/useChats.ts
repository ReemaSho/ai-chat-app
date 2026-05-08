import { useEffect, useState } from "react";
import { getChatsByUser } from "@/api/chat.api";
import { Chat } from "@/types/chat.types";

export const useChats = (userId: number) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const data = await getChatsByUser(userId);
      setChats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        const data = await getChatsByUser(userId);
        setChats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, [userId]);

  return {
    chats,
    loading,
    refetch: fetchChats,
  };
};
