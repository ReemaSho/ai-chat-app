import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PanelLeftClose, SquarePen, MessageCircle } from 'lucide-react';
import chatGPTIcon from '@/assets/chatGPTIcon.png';

import { Chat } from '@/types/chat.types';

interface Props {
  chats: Chat[];
}

const Sidebar = ({ chats }: Props) => {
  const [open, setOpen] = useState(true);
  const { chatId } = useParams();

  const sortedChats = [...chats].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div
      className={`h-screen bg-white border-r border-zinc-200 p-4 transition-all duration-300 flex flex-col ${
        open ? 'w-[260px]' : 'w-[70px]'
      }`}
    >
      {/* TOP SECTION */}
      <div className='flex items-center justify-between mb-6'>
        {/* Logo + Title */}
        <div className='flex items-center gap-2 text-zinc-900'>
          <img
            src={chatGPTIcon}
            alt='ChatGPT'
            onClick={() => setOpen(!open)}
            className=' ml-2 w-6 h-6 object-contain cursor-pointer'
          />
        </div>

        {/* Collapse button */}
        {open && (
          <button
            onClick={() => setOpen(false)}
            className='text-zinc-500 hover:text-zinc-900'
          >
            <PanelLeftClose className='w-5 h-5' />
          </button>
        )}
      </div>

      {/* NEW CHAT BUTTON */}
      <Link
        to='/'
        className='mb-2 flex items-center  gap-2 p-2 rounded-lg   hover:bg-zinc-100 text-sm text-zinc-700'
      >
        {open ? (
          <>
            <SquarePen size={18} strokeWidth={1.75} />
            New Chat
          </>
        ) : (
          <SquarePen />
        )}
      </Link>

      {/* CHAT LIST */}
      {open && (
        <div
          className={
            'flex  bold items-center gap-2 p-3 rounded-lg transition text-smbg-zinc-100 border-zinc-300 text-zinc-900 font-medium'
          }
        >
          Recent
        </div>
      )}
      <div className='space-y-2 overflow-y-auto flex-1'>
        {open &&
          sortedChats.map((chat) => {
            const active = Number(chatId) === chat.id;

            return (
              <Link
                key={chat.id}
                to={`/chat/${chat.id}`}
                className={`flex items-center gap-2 p-2 rounded-lg transition text-sm ${
                  active
                    ? 'bg-zinc-100 border-zinc-300 text-zinc-900 font-medium'
                    : 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-700'
                }`}
              >
                <span className='truncate'>{chat.title}</span>
              </Link>
            );
          })}
        {!open && (
          <div
            className='flex items-center gap-2 p-2 rounded-lg transition text-sm'
            onClick={() => setOpen(!open)}
          >
            <MessageCircle size={20} strokeWidth={1.75} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
