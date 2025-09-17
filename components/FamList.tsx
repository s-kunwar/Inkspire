import React from 'react';
import type { VirtualPerson, ChatMessage } from '../types';

interface FamListProps {
  famMembers: VirtualPerson[];
  onSelectChat: (id: number) => void;
  activeChatId: number | null;
  chatHistory: Record<number, ChatMessage[]>;
}

const FamList: React.FC<FamListProps> = ({ famMembers, onSelectChat, activeChatId, chatHistory }) => {
  const getSubtitle = (person: VirtualPerson): string => {
    const history = chatHistory[person.id];
    if (!history || history.length === 0) {
      return person.shortBio;
    }
    const lastMessage = history[history.length - 1];
    const prefix = lastMessage.sender === 'user' ? 'You: ' : '';
    const text = lastMessage.text.length > 30 ? `${lastMessage.text.substring(0, 30)}...` : lastMessage.text;
    return `${prefix}${text}`;
  }

  return (
    <>
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Fam</h1>
      </div>
      <div className="flex-grow overflow-y-auto">
        {famMembers.map(person => (
          <div
            key={person.id}
            onClick={() => onSelectChat(person.id)}
            className={`flex items-center p-4 cursor-pointer transition-colors border-l-4 ${
              activeChatId === person.id
                ? 'bg-teal-50 dark:bg-teal-900/50 border-teal-500 dark:border-teal-400'
                : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <img src={person.avatarUrl} alt={person.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow overflow-hidden">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">{person.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {getSubtitle(person)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FamList;
