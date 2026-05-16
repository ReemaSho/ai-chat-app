import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from './useAuth';
import { useChatStore } from '@/store/chatStore';

import { Message } from '@/types/message.types';

import {
  createMessage,
  loadChatMessages,
  streamAssistantResponse,
} from './helpers';

const EMPTY_MESSAGES: Message[] = [];

interface SendOptions {
  addUserMessage?: boolean;
}

export const useChatMessages = () => {
  const { user } = useAuth();
  const { chatId } = useParams();

  const currentChatId = chatId ? Number(chatId) : null;

  const processedPendingMessages = useRef<Set<number>>(new Set());

  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [isFirstChunkReceived, setIsFirstChunkReceived] = useState(false);

  const messages = useChatStore((state) =>
    currentChatId
      ? state.messagesByChatId[currentChatId] ?? EMPTY_MESSAGES
      : EMPTY_MESSAGES
  );

  const pendingMessage = useChatStore((state) =>
    currentChatId ? state.pendingMessageByChatId[currentChatId] : undefined
  );

  const setMessages = useChatStore((state) => state.setMessages);
  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessage = useChatStore((state) => state.updateMessage);
  const clearPendingMessage = useChatStore(
    (state) => state.clearPendingMessage
  );

  // LOAD CHAT HISTORY
  useEffect(() => {
    if (!currentChatId) return;
    if (messages.length > 0) return;

    loadChatMessages({
      chatId: currentChatId,
      setMessages,
      setLoading,
    });
  }, [currentChatId, messages.length, setMessages]);

  // SEND MESSAGE
  const send = useCallback(
    async (content: string, options?: SendOptions) => {
      if (!currentChatId || !content.trim()) return;

      const addUserMessage = options?.addUserMessage ?? true;

      try {
        setStreaming(true);
        setIsFirstChunkReceived(false);

        if (addUserMessage) {
          addMessage(
            currentChatId,
            createMessage({
              role: 'user',
              content,
              chatId: currentChatId,
            })
          );
        }

        const assistantMessage = createMessage({
          role: 'assistant',
          content: '',
          chatId: currentChatId,
        });

        addMessage(currentChatId, assistantMessage);

        await streamAssistantResponse({
          chatId: currentChatId,
          content,
          userId: user.id,
          assistantMessageId: assistantMessage.id,
          setIsFirstChunkReceived,
          updateMessage,
        });
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setStreaming(false);
        setIsFirstChunkReceived(false);
      }
    },
    [currentChatId, user.id, addMessage, updateMessage]
  );

  // HANDLE PENDING FIRST MESSAGE
  useEffect(() => {
    if (!currentChatId || !pendingMessage) return;

    if (processedPendingMessages.current.has(currentChatId)) return;

    processedPendingMessages.current.add(currentChatId);

    clearPendingMessage(currentChatId);

    send(pendingMessage, {
      addUserMessage: false,
    });
  }, [currentChatId, pendingMessage, clearPendingMessage, send]);

  return {
    messages,
    send,
    loading,
    streaming,
    isFirstChunkReceived,
  };
};
