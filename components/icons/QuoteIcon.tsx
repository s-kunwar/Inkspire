import React from 'react';

// Using a more standard quote icon shape
export const QuoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M14.017 21v-7.391c0-2.725-1.195-4.524-3.824-5.223l.142-.972c2.83.693 4.682 2.822 4.682 5.995v8.591h-1zm-8.001 0v-7.391c0-2.725-1.196-4.524-3.825-5.223l.142-.972c2.83.693 4.682 2.822 4.682 5.995v8.591h-1.001z"/>
  </svg>
);