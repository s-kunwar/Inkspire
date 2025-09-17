import React from 'react';

export const BookCardSkeleton: React.FC = () => {
  return (
    <div className="gallery-item">
      <div className="relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse">
        <div className="aspect-[2/3] w-full"></div>
      </div>
    </div>
  );
};