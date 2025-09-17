import React from 'react';
import { BookCardSkeleton } from './BookCardSkeleton';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="masonry-gallery">
      {Array.from({ length: 12 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};