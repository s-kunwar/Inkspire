import React, { useState, useEffect, useRef } from 'react';
import type { VirtualPerson, ChatMessage } from '../types';
import MessageBubble from './MessageBubble';
import { SendIcon } from './icons/SendIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ChatWindowProps {
  person: VirtualPerson;
  messages: ChatMessage[];
  onSendMessage: (personId: number, messageText: string) => void;
  isTyping: boolean;
  onBack: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ person, messages, onSendMessage, isTyping, onBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(person.id, inputText.trim());
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-800/50">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
        <button 
          onClick={onBack} 
          className="md:hidden mr-2 p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Back to chat list"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <img src={person.avatarUrl} alt={person.name} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-grow overflow-hidden">
          <h2 className="font-bold text-lg text-slate-800 dark:text-white truncate">{person.name}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{person.shortBio}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} person={person} />
        ))}
        {isTyping && (
            <div className="flex items-center">
                <img src={person.avatarUrl} alt={person.name} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex items-center space-x-1.5 p-3 bg-slate-200 dark:bg-slate-700 rounded-2xl">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
            disabled={!inputText.trim()}
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
