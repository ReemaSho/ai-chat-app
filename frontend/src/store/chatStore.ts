import { create } from 'zustand';

import { Chat } from '@/types/chat.types';
import { Message } from '@/types/message.types';

interface ChatStore {
  chats: Chat[];
  messagesByChatId: Record<number, Message[]>;
  pendingMessageByChatId: Record<number, string>;

  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;

  setMessages: (chatId: number, messages: Message[]) => void;
  addMessage: (chatId: number, message: Message) => void;
  updateMessage: (chatId: number, messageId: number, content: string) => void;

  setPendingMessage: (chatId: number, content: string) => void;
  clearPendingMessage: (chatId: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  messagesByChatId: {},
  pendingMessageByChatId: {},

  setChats: (chats) => set({ chats }),

  addChat: (chat) =>
    set((state) => ({
      chats: [chat, ...state.chats.filter((c) => c.id !== chat.id)],
    })),

  setMessages: (chatId, messages) =>
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: messages,
      },
    })),

  addMessage: (chatId, message) =>
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: [...(state.messagesByChatId[chatId] || []), message],
      },
    })),

  updateMessage: (chatId, messageId, content) =>
    set((state) => ({
      messagesByChatId: {
        ...state.messagesByChatId,
        [chatId]: (state.messagesByChatId[chatId] || []).map((message) =>
          message.id === messageId ? { ...message, content } : message
        ),
      },
    })),

  setPendingMessage: (chatId, content) =>
    set((state) => ({
      pendingMessageByChatId: {
        ...state.pendingMessageByChatId,
        [chatId]: content,
      },
    })),

  clearPendingMessage: (chatId) =>
    set((state) => {
      const pendingMessages = { ...state.pendingMessageByChatId };
      delete pendingMessages[chatId];

      return {
        pendingMessageByChatId: pendingMessages,
      };
    }),
}));
