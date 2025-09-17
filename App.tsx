import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import ReadersCorner from './components/ReadersCorner';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import ExplorePage from './pages/ExplorePage';
import CustomizePage from './pages/CustomizePage';
import ReadingListPage from './pages/ReadingListPage';
import ReachOutPage from './pages/ReachOutPage';
import ConnectPage from './pages/ConnectPage';
import FamPage from './pages/FamPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import InspirationalQuote from './components/InspirationalQuote';
import LoadingScreen from './components/LoadingScreen';
import type { UserPreferences, Book, VirtualPerson, ChatMessage, Quote, ReachOutContent, StoryPost } from './types';
import { getPersonalizedRecommendations, getPopularBooks } from './services/recommendationService';
import { generateFamMembers, getChatResponse } from './services/famService';
import { getInspirationalQuote } from './services/quoteService';
import { getReachOutContent } from './services/reachOutService';
import { getInitialStories, getPersonalizedStories } from './services/storyService';
import { defaultFam } from './data/defaultFam';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [personalizedBooks, setPersonalizedBooks] = useState<Book[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [recommendationError, setRecommendationError] = useState('');
  const [readingList, setReadingList] = useState<Book[]>([]);
  
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  // Fam Chat State
  const [famMembers, setFamMembers] = useState<VirtualPerson[]>(defaultFam);
  const [chatHistory, setChatHistory] = useState<Record<number, ChatMessage[]>>({});
  const [typingStates, setTypingStates] = useState<Record<number, boolean>>({});
  
  // Quote State
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);

  // Reach Out State
  const [reachOutContent, setReachOutContent] = useState<ReachOutContent | null>(null);

  // Connect State
  const [storyPosts, setStoryPosts] = useState<StoryPost[]>([]);

  // Global Loading State
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState<Quote | null>(null);

  const readingListIds = useMemo(() => readingList.map(book => book.id), [readingList]);

  const handleNewQuote = async () => {
    setIsQuoteLoading(true);
    const newQuote = await getInspirationalQuote(userPreferences || undefined);
    setQuote(newQuote);
    setIsQuoteLoading(false);
  };
  
  useEffect(() => {
    handleNewQuote();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsGenerating(true);
      try {
        const [initialBooks, defaultReachOut, initialStories] = await Promise.all([
            getPopularBooks(),
            getReachOutContent(),
            getInitialStories()
        ]);
        setPersonalizedBooks(initialBooks);
        setReachOutContent(defaultReachOut);
        setStoryPosts(initialStories);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setRecommendationError("Sorry, we couldn't load initial content. Please try again later.");
        setPersonalizedBooks([]);
        setReachOutContent(null);
        setStoryPosts([]);
      } finally {
        setIsGenerating(false);
      }
    };
    fetchInitialData();
  }, []);

  const navigate = async (page: string, dataPromise: Promise<any> = Promise.resolve()) => {
    if (page === currentPage && !globalLoading) return;

    setGlobalLoading(true);
    getInspirationalQuote(userPreferences || undefined).then(setLoadingQuote);

    const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

    await Promise.all([dataPromise, minDelay]);

    setCurrentPage(page);
    window.scrollTo(0, 0);
    setGlobalLoading(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('explore');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('home');
  };

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  const handleToggleReadingList = (book: Book) => {
    setReadingList(prevList =>
      prevList.some(item => item.id === book.id)
        ? prevList.filter(item => item.id !== book.id)
        : [...prevList, book]
    );
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setPersonalizedBooks(prevBooks =>
        prevBooks.map(b => (b.id === updatedBook.id ? updatedBook : b))
    );
    setReadingList(prevList =>
        prevList.map(b => (b.id === updatedBook.id ? updatedBook : b))
    );
  };
  
  const handleGetRecommendations = async (preferences: UserPreferences) => {
    setIsGenerating(true);
    setRecommendationError('');
    setUserPreferences(preferences);
    
    const recommendationPromise = (async () => {
        try {
            const [
              recommendedBooks, 
              newFamMembers, 
              newQuote, 
              personalizedReachOut,
              personalizedStories
            ] = await Promise.all([
                getPersonalizedRecommendations(preferences),
                generateFamMembers(preferences),
                getInspirationalQuote(preferences),
                getReachOutContent(preferences),
                getPersonalizedStories(preferences),
            ]);

            setPersonalizedBooks(recommendedBooks);
            setFamMembers(newFamMembers);
            setQuote(newQuote);
            setReachOutContent(personalizedReachOut);
            setStoryPosts(personalizedStories);
            setChatHistory({});
        } catch (error) {
            console.error("Failed to get recommendations or generate fam:", error);
            setRecommendationError('Sorry, we couldn\'t generate content at this time. Please try again later.');
            throw error;
        }
    })();

    try {
        await navigate('explore', recommendationPromise);
    } catch(e) {
        setGlobalLoading(false);
        setCurrentPage('customize');
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSendMessage = async (personId: number, messageText: string) => {
    const person = famMembers.find(p => p.id === personId);
    if (!person) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      text: messageText,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    const currentConversation = chatHistory[personId] || [];
    const updatedConversation = [...currentConversation, userMessage];

    setChatHistory(prev => ({ ...prev, [personId]: updatedConversation }));
    setTypingStates(prev => ({ ...prev, [personId]: true }));

    try {
      const aiResponseText = await getChatResponse(person, updatedConversation);
      
      const chunks = aiResponseText.split(/(?<=[.!?])\s+/).filter(chunk => chunk.trim() !== '');

      if (chunks.length <= 1) {
        const aiMessage: ChatMessage = {
          id: `${Date.now()}-ai`,
          text: aiResponseText,
          sender: personId,
          timestamp: Date.now(),
        };
        setChatHistory(prev => ({
          ...prev,
          [personId]: [...(prev[personId] || []), aiMessage],
        }));
      } else {
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          const delay = 800 + Math.random() * 700;
          
          await new Promise(resolve => setTimeout(resolve, delay));

          const aiMessage: ChatMessage = {
            id: `${Date.now()}-ai-${i}`,
            text: chunk,
            sender: personId,
            timestamp: Date.now() + i * 10,
          };
          
          setChatHistory(prev => ({
            ...prev,
            [personId]: [...(prev[personId] || []), aiMessage],
          }));
        }
      }
    } catch (error) {
      console.error("Failed to get chat response:", error);
      const errorMessage: ChatMessage = {
        id: `${Date.now()}-error`,
        text: "Sorry, I'm having trouble connecting right now. Let's try again in a bit.",
        sender: personId,
        timestamp: Date.now(),
      };
      setChatHistory(prev => ({
        ...prev,
        [personId]: [...(prev[personId] || []), errorMessage],
      }));
    } finally {
      setTypingStates(prev => ({ ...prev, [personId]: false }));
    }
  };

  const handlePostStory = (story: string, bookTitle: string, bookAuthor: string, imageUrl?: string) => {
    const newPost: StoryPost = {
      id: `user-${Date.now()}`,
      user: {
        name: 'You',
        handle: 'your_profile',
        avatarUrl: 'https://i.pravatar.cc/48?u=user_profile'
      },
      story,
      imageUrl,
      book: { title: bookTitle, author: bookAuthor },
      timestamp: Date.now(),
      likeCount: 0,
      isLiked: false,
      commentCount: 0,
      shareCount: 0,
    };
    setStoryPosts([newPost, ...storyPosts]);
  };

  const handleToggleLike = (postId: string) => {
    setStoryPosts(storyPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
        };
      }
      return post;
    }));
  };

  const renderLoggedInContent = () => {
    switch (currentPage) {
      case 'explore':
        return <ExplorePage books={personalizedBooks} readingList={readingListIds} onToggleReadingList={handleToggleReadingList} isGenerating={isGenerating} onUpdateBook={handleUpdateBook} />;
      case 'customize':
        return <CustomizePage onGetRecommendations={handleGetRecommendations} isGenerating={isGenerating} error={recommendationError} />;
      case 'readingList':
        return <ReadingListPage books={readingList} readingList={readingListIds} onToggleReadingList={handleToggleReadingList} onUpdateBook={handleUpdateBook} />;
      case 'reachout':
        return <ReachOutPage content={reachOutContent} isGenerating={isGenerating} />;
      case 'connect':
        return <ConnectPage posts={storyPosts} onPostStory={handlePostStory} onToggleLike={handleToggleLike} isGenerating={isGenerating} />;
      case 'fam':
        return <FamPage 
          famMembers={famMembers}
          chatHistory={chatHistory}
          onSendMessage={handleSendMessage}
          typingStates={typingStates}
        />;
      default:
        return <ExplorePage books={personalizedBooks} readingList={readingListIds} onToggleReadingList={handleToggleReadingList} isGenerating={isGenerating} onUpdateBook={handleUpdateBook} />;
    }
  };

  const renderLoggedOutContent = () => {
    switch (currentPage) {
      case 'features':
        return <FeaturesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <main className="flex-grow">
            <Hero />
            <Features />
            <About />
            <InspirationalQuote quote={quote} isLoading={isQuoteLoading} onNewQuote={handleNewQuote} />
            <ReadersCorner />
            <SignUp onSignUpSuccess={handleLoginSuccess} />
          </main>
        );
    }
  };

  const showFooter = !isLoggedIn || currentPage !== 'fam';

  return (
    <div className="min-h-screen flex flex-col">
      {globalLoading && <LoadingScreen quote={loadingQuote} />}
      <Header isLoggedIn={isLoggedIn} onNavigate={handleNavigate} currentPage={currentPage} onLogout={handleLogout} />
      {isLoggedIn ? (
        renderLoggedInContent()
      ) : (
        renderLoggedOutContent()
      )}
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
