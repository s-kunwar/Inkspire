import React from 'react';
import type { Quote } from '../types';

interface LoadingScreenProps {
  quote: Quote | null;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ quote }) => {
  return (
    <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 z-[100] flex flex-col items-center justify-center text-center p-6" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          
          .book-loader {
            perspective: 1000px;
          }

          .book-loader .book-page {
            width: 5rem;
            height: 7rem;
            position: relative;
            transform-style: preserve-3d;
            animation: flip 2.5s ease-in-out infinite;
          }

          .book-loader .page {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: white;
            border: 2px solid #0D9488; /* teal-600 */
            border-radius: 4px;
            backface-visibility: hidden;
          }

          .dark .book-loader .page {
            background-color: #334155; /* slate-700 */
            border-color: #5EEAD4; /* teal-300 */
          }

          .book-loader .page.front {
            transform: rotateY(0deg);
          }

          .book-loader .page.back {
            transform: rotateY(180deg);
          }

          @keyframes flip {
            0% {
              transform: rotateY(0deg);
            }
            50%, 100% {
              transform: rotateY(-180deg);
            }
          }
        `}
      </style>
      <div className="book-loader">
        <div className="book-page">
          <div className="page front"></div>
          <div className="page back"></div>
        </div>
      </div>
      
      {quote ? (
        <blockquote className="mt-12 max-w-lg" style={{ animation: 'fadeInUp 0.8s ease-out 0.5s forwards', opacity: 0 }}>
          <p className="text-lg italic text-slate-600 dark:text-slate-300">"{quote.text}"</p>
          <cite className="block mt-4 text-slate-500 dark:text-slate-400 not-italic">— {quote.author}</cite>
        </blockquote>
      ) : (
         <p className="mt-12 text-lg text-slate-600 dark:text-slate-300" style={{ animation: 'fadeInUp 0.8s ease-out 0.5s forwards', opacity: 0 }}>
          Finding your next great read...
        </p>
      )}
    </div>
  );
};

export default LoadingScreen;
