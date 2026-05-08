import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "@/components/sidebar/Sidebar";

import ChatInput from "@/components/chat/ChatInput";
import MessageBubble from "@/components/chat/MessageBubble";

import { useChatMessages } from "../hooks/useChatMessages";
import { useChats } from "../hooks/useChats";
import { useAuth } from "../hooks/useAuth";

import { CircleDot } from "lucide-react";

const ChatPage = () => {
  const location = useLocation();
  const { user } = useAuth();

  // first message passed from HomePage
  const firstMessage = location.state?.firstMessage as string | undefined;

  // sidebar chats
  const { chats } = useChats(user.id);

  // chat messages
  const { messages, send, loading, streaming } = useChatMessages();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // prevents duplicate auto-send
  const hasSentFirstMessage = useRef(false);

  // -----------------------------
  // AUTO SEND FIRST MESSAGE
  // -----------------------------
  useEffect(() => {
    if (!firstMessage) return;

    if (hasSentFirstMessage.current) return;

    hasSentFirstMessage.current = true;

    send(firstMessage);
  }, [firstMessage, send]);

  // -----------------------------
  // AUTO SCROLL
  // -----------------------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, streaming]);

  return (
    <div className="flex h-screen bg-white">
      {/* -----------------------------
          SIDEBAR
      ----------------------------- */}
      <Sidebar chats={chats} />

      {/* -----------------------------
          CHAT AREA
      ----------------------------- */}
      <div className="flex flex-col flex-1 bg-white">
        {/* -----------------------------
            MESSAGES
        ----------------------------- */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Loading initial chat */}
            {loading && (
              <p className="text-sm text-zinc-400">Loading messages...</p>
            )}

            {/* Messages */}
            {messages
              .filter((message) => message.content)
              .map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

            {/* Typing indicator */}
            {streaming && (
              <div className="flex items-center gap-2 text-sm text-zinc-400 animate-pulse">
                <CircleDot className="w-4 h-4" />
                <span>AI is thinking...</span>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* -----------------------------
            INPUT
        ----------------------------- */}
        <div className="bg-white px-4 py-4  border-zinc-200">
          <div className="max-w-2xl mx-auto">
            <ChatInput onSend={send} disabled={streaming} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
