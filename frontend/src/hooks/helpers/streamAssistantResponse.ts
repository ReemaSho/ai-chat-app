import { sendMessageStream } from '@/api/message.api';

interface Params {
  chatId: number;
  content: string;
  userId: number;
  assistantMessageId: number;

  setIsFirstChunkReceived: (value: boolean) => void;

  updateMessage: (chatId: number, messageId: number, content: string) => void;
}

export const streamAssistantResponse = async ({
  chatId,
  content,
  userId,
  assistantMessageId,
  setIsFirstChunkReceived,
  updateMessage,
}: Params) => {
  let assistantText = '';
  let firstChunkReceived = false;

  await sendMessageStream(chatId, content, userId, (chunk) => {
    if (!firstChunkReceived) {
      firstChunkReceived = true;
      setIsFirstChunkReceived(true);
    }

    assistantText += chunk;

    updateMessage(chatId, assistantMessageId, assistantText);
  });
};
