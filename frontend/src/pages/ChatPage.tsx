import { useEffect, useRef } from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
import ChatInput from '@/components/chat/ChatInput';
import MessageBubble from '@/components/chat/MessageBubble';

import { useChatMessages } from '../hooks/useChatMessages';
import { useChats } from '../hooks/useChats';
import { useAuth } from '../hooks/useAuth';

import { CircleDot } from 'lucide-react';

const ChatPage = () => {
  const { user } = useAuth();

  const { chats } = useChats(user.id);
  const { messages, send, loading, streaming, isFirstChunkReceived } =
    useChatMessages();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, streaming]);

  return (
    <div className='flex h-screen bg-white'>
      <Sidebar chats={chats} />

      <div className='flex flex-col flex-1 bg-white'>
        <div className='flex-1 overflow-y-auto px-4 py-6'>
          <div className='w-full max-w-4xl mx-auto space-y-4'>
            {loading && (
              <p className='text-sm text-zinc-400'>Loading messages...</p>
            )}

            {messages
              .filter((message) => message.content)
              .map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

            {streaming && !isFirstChunkReceived && (
              <div className='flex items-center gap-2 text-sm text-zinc-400 animate-pulse'>
                <CircleDot className='w-4 h-4' />
                <span>AI is thinking...</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className='bg-white px-4 pt-0 pb-6 border-zinc-200'>
          <div className='max-w-3xl mx-auto'>
            <ChatInput onSend={send} disabled={streaming} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
