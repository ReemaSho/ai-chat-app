import { useNavigate } from 'react-router-dom';

import { createChat } from '@/api/chat.api';
import { useAuth } from '@/hooks/useAuth';
import { useChatStore } from '@/store/chatStore';
import { Message } from '@/types/message.types';

export const useStartChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const addChat = useChatStore((state) => state.addChat);
  const addMessage = useChatStore((state) => state.addMessage);
  const setPendingMessage = useChatStore((state) => state.setPendingMessage);

  const startChat = async (content: string) => {
    if (!content.trim()) return;

    const newChat = await createChat(content.slice(0, 30), user.id);

    addChat(newChat);

    const firstUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content,
      chatId: newChat.id,
    };

    addMessage(newChat.id, firstUserMessage);

    setPendingMessage(newChat.id, content);

    navigate(`/chat/${newChat.id}`);
  };

  return { startChat };
};
