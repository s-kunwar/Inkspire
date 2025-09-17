import React from 'react';
import type { Quote } from '../types';
import { QuoteIcon } from './icons/QuoteIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface InspirationalQuoteProps {
  quote: Quote | null;
  isLoading: boolean;
  onNewQuote: () => void;
}

const InspirationalQuote: React.FC<InspirationalQuoteProps> = ({ quote, isLoading, onNewQuote }) => {
  return (
    <section id="quote" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8">Words to Inspire</h2>
            <div className="max-w-3xl mx-auto min-h-[160px] flex flex-col justify-center">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <SpinnerIcon className="w-8 h-8 text-teal-500 animate-spin" />
                    </div>
                ) : quote ? (
                    <blockquote className="animate-fade-in-up">
                        <QuoteIcon className="w-12 h-12 text-teal-200 dark:text-teal-700 mx-auto mb-4" />
                        <p className="text-2xl md:text-3xl italic font-light text-slate-700 dark:text-slate-200">
                            "{quote.text}"
                        </p>
                        <cite className="block mt-6 text-slate-500 dark:text-slate-400 font-semibold not-italic">
                            — {quote.author}
                        </cite>
                    </blockquote>
                ) : (
                    <p>Could not load a quote at this time.</p>
                )}
            </div>
             <button
                onClick={onNewQuote}
                disabled={isLoading}
                className="mt-10 bg-slate-50 dark:bg-slate-800 text-teal-600 dark:text-teal-300 font-semibold px-6 py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all transform hover:scale-105 shadow-md disabled:opacity-50"
             >
                New Quote
            </button>
        </div>
    </section>
  );
};

export default InspirationalQuote;