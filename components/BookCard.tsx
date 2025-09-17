import React, { useState } from 'react';
import type { Book } from '../types';
import { BookmarkIcon } from './icons/BookmarkIcon';

interface BookCardProps {
  book: Book;
  onSelect: () => void;
  readingList: string[];
  onToggleReadingList: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onSelect, readingList, onToggleReadingList }) => {
  const [imageError, setImageError] = useState(false);
  const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(book.title)}/400/600`;
  
  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError || !book.coverUrl ? placeholderUrl : book.coverUrl;
  const isInReadingList = readingList.includes(book.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    onToggleReadingList(book);
  };

  return (
    <div className="gallery-item group" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect()}>
      <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-300 transform
                     ${isInReadingList 
                        ? 'bg-teal-500 text-white scale-100 opacity-100' 
                        : 'bg-black/60 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 hover:bg-teal-500'}`}
          aria-label={isInReadingList ? 'Remove from reading list' : 'Add to reading list'}
        >
          <BookmarkIcon isSaved={isInReadingList} className="w-6 h-6" />
        </button>

        <img 
          src={imageUrl} 
          alt={`Cover of ${book.title}`}
          className="w-full h-auto block object-cover" 
          onError={handleImageError}
        />
        {(imageError || !book.coverUrl) && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
            <h3 className="font-bold text-2xl leading-tight">{book.title}</h3>
            <p className="text-base italic mt-2">{book.author}</p>
          </div>
        )}
      </div>
    </div>
  );
};