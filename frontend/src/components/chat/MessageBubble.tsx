import { Message } from "@/types/message.types";

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%]
          rounded-2xl
          px-4
          py-3
          text-sm
          whitespace-pre-wrap
          leading-relaxed
          shadow-sm
          ${
            isUser
              ? "bg-zinc-100 text-zinc-800 border border-zinc-200"
              : "bg-white-500 text-zinc-800 "
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
