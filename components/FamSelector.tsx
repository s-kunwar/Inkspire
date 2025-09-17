import React from 'react';
import type { VirtualPerson } from '../types';

interface FamSelectorProps {
  famMembers: VirtualPerson[];
  onSelectChat: (id: number) => void;
  activeChatId: number | null;
}

const FamSelector: React.FC<FamSelectorProps> = ({ famMembers, onSelectChat, activeChatId }) => {
  return (
    <div className="p-3 bg-white dark:bg-slate-900">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {famMembers.map(person => (
          <button
            key={person.id}
            onClick={() => onSelectChat(person.id)}
            className="flex flex-col items-center flex-shrink-0 w-20 text-center focus:outline-none"
          >
            <div className={`relative rounded-full p-1 transition-all ${
                activeChatId === person.id ? 'bg-gradient-to-tr from-teal-400 to-cyan-500' : 'bg-transparent'
            }`}>
              <img
                src={person.avatarUrl}
                alt={person.name}
                className="w-16 h-16 rounded-full border-2 border-white dark:border-slate-900"
              />
            </div>
            <p className={`mt-1.5 text-xs font-medium truncate w-full ${
                activeChatId === person.id ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
            }`}>
              {person.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FamSelector;
