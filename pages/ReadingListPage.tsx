import React, { useState } from 'react';
import { BookGrid } from '../components/BookGrid';
import { BookDetailModal } from '../components/BookDetailModal';
import type { Book } from '../types';
import { HeartIcon } from '../components/icons/HeartIcon';
import { ReadingListIllustration } from '../components/illustrations/ReadingListIllustration';

interface ReadingListPageProps {
  books: Book[];
  readingList: string[];
  onToggleReadingList: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
}

const ReadingListPage: React.FC<ReadingListPageProps> = ({ books, readingList, onToggleReadingList, onUpdateBook }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          
          {/* Left Column: Content */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
                My Reading List
                </h1>
                <p className="mt-2 sm:mt-0 text-slate-500 dark:text-slate-400">The books you're excited to read next.</p>
            </div>

            {books.length > 0 ? (
              <BookGrid books={books} onSelectBook={handleSelectBook} readingList={readingList} onToggleReadingList={onToggleReadingList} />
            ) : (
              <div className="text-center py-20 flex flex-col items-center">
                {/* FIX: Added missing isFilled prop to satisfy HeartIconProps interface. */}
                <HeartIcon className="w-24 h-24 text-teal-200 dark:text-teal-800 mb-4" isFilled={false} />
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Your reading list is empty.</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
                  Go to the 'Explore' page to discover new books and add them to your list by clicking the bookmark icon.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Illustration */}
          <div className="w-full lg:w-1/3 hidden lg:block">
            <div className="lg:sticky top-28 flex items-center" style={{ height: 'calc(100vh - 7rem)' }}>
              <ReadingListIllustration />
            </div>
          </div>

        </div>
      </div>
      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={handleCloseModal} readingList={readingList} onToggleReadingList={onToggleReadingList} onUpdateBook={onUpdateBook} />
      )}
    </main>
  );
};

export default ReadingListPage;