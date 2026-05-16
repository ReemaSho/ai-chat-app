import { Message } from '@/types/message.types';

interface Params {
  role: 'user' | 'assistant';
  content: string;
  chatId: number;
}

export const createMessage = ({ role, content, chatId }: Params): Message => ({
  id: Date.now() + Math.floor(Math.random() * 1000),
  role,
  content,
  chatId,
});
