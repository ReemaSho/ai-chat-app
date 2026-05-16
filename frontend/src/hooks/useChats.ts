import { useEffect, useState } from 'react';

import { getChatsByUser } from '@/api/chat.api';

import { useChatStore } from '@/store/chatStore';

export const useChats = (userId: number) => {
  const [loading, setLoading] = useState(false);

  // Zustand store
  const chats = useChatStore((state) => state.chats);
  const setChats = useChatStore((state) => state.setChats);
  const addChat = useChatStore((state) => state.addChat);

  // -----------------------------
  // FETCH CHATS
  // -----------------------------
  useEffect(() => {
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

    fetchChats();
  }, [userId, setChats]);

  return {
    chats,
    loading,
    addChat,
  };
};
