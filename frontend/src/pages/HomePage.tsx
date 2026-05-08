import { useState } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import { useChats } from "../hooks/useChats";
import { useStartChat } from "../hooks/useStartChat";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  const { chats, loading } = useChats(user.id);
  const { startChat } = useStartChat();

  const [message, setMessage] = useState("");
  const [creatingChat, setCreatingChat] = useState(false);

  const handleStartChat = async () => {
    if (!message.trim() || creatingChat) return;

    try {
      setCreatingChat(true);

      // 1. create chat first
      await startChat(message);

      setMessage("");
    } catch (error) {
      console.error("Failed to start chat:", error);
    } finally {
      setCreatingChat(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar chats={chats} />

      <div className="flex-1 flex items-center justify-center">
        {loading ? (
          <p className="text-zinc-400">Loading chats...</p>
        ) : (
          <div className="w-full max-w-2xl px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-zinc-800">
                What can I help you with?
              </h1>
              <p className="text-sm text-zinc-400 mt-2">
                Start a new AI conversation
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm focus-within:ring-2 focus-within:ring-zinc-300">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400 text-base"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStartChat();
                }}
              />

              <button
                onClick={handleStartChat}
                disabled={creatingChat}
                className="px-5 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 transition disabled:opacity-50"
              >
                {creatingChat ? "..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
