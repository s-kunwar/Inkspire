import React from 'react';
import type { ChatMessage, VirtualPerson } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
  person: VirtualPerson;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, person }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <img src={person.avatarUrl} alt={person.name} className="w-8 h-8 rounded-full" />
      )}
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isUser
            ? 'bg-teal-500 text-white rounded-br-lg'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-lg'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
