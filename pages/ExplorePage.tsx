import React, { useState } from 'react';
import { BookGrid } from '../components/BookGrid';
import { BookDetailModal } from '../components/BookDetailModal';
import { SkeletonLoader } from '../components/SkeletonLoader';
import type { Book } from '../types';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

interface ExplorePageProps {
  books: Book[];
  readingList: string[];
  onToggleReadingList: (book: Book) => void;
  isGenerating: boolean;
  onUpdateBook: (book: Book) => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ books, readingList, onToggleReadingList, isGenerating, onUpdateBook }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (isGenerating) {
      return (
        <div className="text-center pt-8">
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-2 animate-fade-in-up">Crafting your library...</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 animate-fade-in-up" style={{ animationDelay: '150ms' }}>Our AI is finding the perfect books for you.</p>
          <SkeletonLoader />
        </div>
      );
    }
    if (books.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-lg text-slate-600 dark:text-slate-300">No books found matching your preferences. Try customizing again!</p>
        </div>
      );
    }
    if (filteredBooks.length > 0) {
      return <BookGrid books={filteredBooks} onSelectBook={handleSelectBook} readingList={readingList} onToggleReadingList={onToggleReadingList} />;
    }
    return (
      <div className="text-center py-20">
        <p className="text-lg text-slate-600 dark:text-slate-300">No books found for your search. Try a different title or author.</p>
      </div>
    );
  };

  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
            Your Reading Nook
          </h1>
          {!isGenerating && (
            <p className="mt-2 sm:mt-0 text-slate-500 dark:text-slate-400">
              {books.length > 0 ? "A personalized selection, just for you." : "Let's find your next read."}
            </p>
          )}
        </div>

        {!isGenerating && books.length > 0 && (
          <div className="relative mb-8 max-w-lg mx-auto sm:mx-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="search"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              aria-label="Search books"
            />
          </div>
        )}

        {renderContent()}
      </div>
      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={handleCloseModal} readingList={readingList} onToggleReadingList={onToggleReadingList} onUpdateBook={onUpdateBook} />
      )}
    </main>
  );
};

export default ExplorePage;