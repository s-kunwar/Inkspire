import React, { useState, useEffect } from 'react';
import type { VirtualPerson, ChatMessage } from '../types';
import FamList from '../components/FamList';
import ChatWindow from '../components/ChatWindow';
import { ChatIllustration } from '../components/illustrations/ChatIllustration';

interface FamPageProps {
  famMembers: VirtualPerson[];
  chatHistory: Record<number, ChatMessage[]>;
  onSendMessage: (personId: number, messageText: string) => void;
  typingStates: Record<number, boolean>;
}

const FamPage: React.FC<FamPageProps> = ({ famMembers, chatHistory, onSendMessage, typingStates }) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(() => {
    // Default to first user on desktop, but show the list on mobile initially.
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && famMembers.length > 0) {
      return famMembers[0].id;
    }
    return null;
  });

  useEffect(() => {
    // This effect ensures that if the famMembers list changes (e.g., after customization),
    // we don't have a selectedChatId that no longer exists.
    if (selectedChatId !== null && !famMembers.find(p => p.id === selectedChatId)) {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
      setSelectedChatId(isDesktop && famMembers.length > 0 ? famMembers[0].id : null);
    }
  }, [famMembers, selectedChatId]);

  const handleSelectChat = (id: number) => {
    setSelectedChatId(id);
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };
  
  const selectedPerson = famMembers.find(p => p.id === selectedChatId);
  const selectedConversation = selectedChatId ? chatHistory[selectedChatId] || [] : [];
  const isTyping = selectedChatId ? !!typingStates[selectedChatId] : false;

  return (
    <main className="flex-grow bg-white dark:bg-slate-900 h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex h-full max-w-7xl mx-auto md:border-x border-slate-200 dark:border-slate-700">
        
        {/* Fam List Pane */}
        <div className={`
          w-full md:w-1/3 lg:w-1/4 flex-shrink-0 flex-col border-r border-slate-200 dark:border-slate-700
          transition-all duration-300
          ${selectedChatId !== null ? 'hidden md:flex' : 'flex'}
        `}>
          <FamList
            famMembers={famMembers}
            onSelectChat={handleSelectChat}
            activeChatId={selectedChatId}
            chatHistory={chatHistory}
          />
        </div>

        {/* Chat Window Pane */}
        <div className={`
          w-full md:w-2/3 lg:w-3/4 flex-col flex-grow
          transition-all duration-300
          ${selectedChatId === null ? 'hidden md:flex' : 'flex'}
        `}>
          {selectedPerson ? (
            <ChatWindow
              key={selectedPerson.id}
              person={selectedPerson}
              messages={selectedConversation}
              onSendMessage={onSendMessage}
              isTyping={isTyping}
              onBack={handleBack}
            />
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
              <ChatIllustration className="w-64 h-64 text-slate-300 dark:text-slate-600 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Your conversations live here</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm">
                Select a friend to start chatting and build connections.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FamPage;
