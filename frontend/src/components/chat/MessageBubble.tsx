import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/chat/CodeBlock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Message } from '@/types/message.types';

interface Props {
  message: Message;
}

const MessageBubble = ({ message }: Props) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className='flex w-full justify-end'>
        <div className='max-w-[75%] rounded-3xl bg-[#f4f4f5] px-5 py-3 text-[15px] leading-7 text-zinc-900 whitespace-pre-wrap break-words'>
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full'>
      <div className='min-w-0 flex-1 text-[15px] leading-7 text-zinc-800'>
        <div
          className='
            prose prose-zinc max-w-none

            prose-p:my-4
            prose-p:leading-8

            prose-headings:font-semibold
            prose-headings:text-zinc-900

            prose-h1:text-3xl
            prose-h1:mb-5

            prose-h2:text-2xl
            prose-h2:mt-8
            prose-h2:mb-4

            prose-h3:text-xl
            prose-h3:mt-6
            prose-h3:mb-3

            prose-strong:text-zinc-900

            prose-ul:my-4
            prose-ol:my-4

            prose-li:my-1
            prose-li:leading-7

            prose-blockquote:border-l-4
            prose-blockquote:border-zinc-300
            prose-blockquote:pl-4
            prose-blockquote:italic
            prose-blockquote:text-zinc-600

            prose-a:text-blue-600
            prose-a:no-underline
            hover:prose-a:underline

            prose-hr:my-8
            prose-hr:border-zinc-200

            prose-code:rounded-md
            prose-code:bg-zinc-100
            prose-code:px-1.5
            prose-code:py-0.5
            prose-code:text-[14px]
            prose-code:font-medium
            prose-code:text-zinc-800
            prose-code:before:content-none
            prose-code:after:content-none
          '
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');

                if (inline || !match) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    language={match[1]}
                    code={String(children).replace(/\n$/, '')}
                  />
                );
              },
              table({ children }) {
                return (
                  <div className='my-6 overflow-x-auto rounded-xl border border-zinc-200'>
                    <Table>{children}</Table>
                  </div>
                );
              },

              thead({ children }) {
                return <TableHeader>{children}</TableHeader>;
              },

              tbody({ children }) {
                return <TableBody>{children}</TableBody>;
              },

              tr({ children }) {
                return <TableRow>{children}</TableRow>;
              },

              th({ children }) {
                return <TableHead>{children}</TableHead>;
              },

              td({ children }) {
                return <TableCell>{children}</TableCell>;
              },
            }}
          >
            {message.content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
