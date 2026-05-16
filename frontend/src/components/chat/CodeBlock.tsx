import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className='my-5 overflow-hidden rounded-2xl border border-zinc-200 bg-[#f7f7f8]'>
      <div className='flex items-center justify-between border-b border-zinc-200 bg-[#f7f7f8] px-4 py-2 text-xs text-zinc-500'>
        <span className='font-medium'>{language || 'text'}</span>

        <button
          onClick={handleCopy}
          className='flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-blue-600'
        >
          {copied ? (
            <Check className='h-3.5 w-3.5' />
          ) : (
            <Copy className='h-3.5 w-3.5' />
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        PreTag='div'
        customStyle={{
          margin: 0,
          padding: '16px',
          background: '#f7f7f8',
          fontSize: '14px',
          lineHeight: '1.7',
        }}
        codeTagProps={{
          style: {
            color: '#2563eb',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
