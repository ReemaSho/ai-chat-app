import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: Props) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || disabled) return;

    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
        className="h-10 bg-white border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={disabled}
      />

      <Button
        onClick={handleSend}
        className="h-10 bg-black text-white hover:bg-zinc-800"
        disabled={disabled}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
