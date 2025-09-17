import React from 'react';
import type { Book } from '../types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  readingList: string[];
  onToggleReadingList: (book: Book) => void;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, onSelectBook, readingList, onToggleReadingList }) => {
  return (
    <div className="masonry-gallery">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onSelect={() => onSelectBook(book)} 
          readingList={readingList}
          onToggleReadingList={onToggleReadingList}
        />
      ))}
    </div>
  );
};