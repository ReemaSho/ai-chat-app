import { getMessagesByChat } from '@/api/message.api';
import { Message } from '@/types/message.types';

interface Params {
  chatId: number;
  setMessages: (chatId: number, messages: Message[]) => void;
  setLoading: (loading: boolean) => void;
}

export const loadChatMessages = async ({
  chatId,
  setMessages,
  setLoading,
}: Params) => {
  try {
    setLoading(true);

    const data = await getMessagesByChat(chatId);

    setMessages(chatId, data);
  } catch (error) {
    console.error('Failed to load messages:', error);
  } finally {
    setLoading(false);
  }
};
