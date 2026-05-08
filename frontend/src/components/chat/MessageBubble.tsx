import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Message } from '@/types/message.types';

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`m flex w-full  ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          min-w-0
          max-w-[85%]
          rounded-2xl
          px-5
          py-4
          text-sm
          shadow-sm
          ${isUser ? 'bg-zinc-100 ' : ' bg-white text-zinc-800'}
        `}
      >
        {isUser ? (
          <p className='whitespace-pre-wrap break-words leading-7'>
            {message.content}
          </p>
        ) : (
          <div
            className='
              prose prose-zinc max-w-none
              min-w-0 overflow-hidden break-words

              prose-p:my-3
              prose-p:leading-7

              prose-headings:font-semibold
              prose-headings:text-zinc-900
              prose-h1:text-2xl
              prose-h2:text-xl
              prose-h3:text-lg

              prose-strong:text-zinc-900

              prose-a:text-blue-600
              prose-a:no-underline
              hover:prose-a:underline

              prose-ul:my-3
              prose-ol:my-3
              prose-li:my-1

              prose-blockquote:border-l-4
              prose-blockquote:border-zinc-300
              prose-blockquote:pl-4
              prose-blockquote:italic
              prose-blockquote:text-zinc-600

              prose-code:rounded-md
              prose-code:bg-zinc-100
              prose-code:px-1.5
              prose-code:py-0.5
              prose-code:text-pink-600
              prose-code:before:content-none
              prose-code:after:content-none

              prose-pre:max-w-full
              prose-pre:overflow-x-auto
              prose-pre:rounded-xl
              prose-pre:border
              prose-pre:border-zinc-800
              prose-pre:bg-zinc-950
              prose-pre:p-4
              prose-pre:text-sm
              prose-pre:text-white

              prose-table:block
              prose-table:max-w-full
              prose-table:overflow-x-auto
              prose-table:border
              prose-table:border-zinc-300

              prose-th:border
              prose-th:border-zinc-300
              prose-th:bg-zinc-100
              prose-th:px-3
              prose-th:py-2

              prose-td:border
              prose-td:border-zinc-300
              prose-td:px-3
              prose-td:py-2
            '
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
