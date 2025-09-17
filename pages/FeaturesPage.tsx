import React from 'react';
import Features from '../components/Features';

const FeaturesPage: React.FC = () => {
  return (
    <main className="flex-grow bg-white dark:bg-slate-900 animate-fade-in-up">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            Features Designed for You
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore how Inkspire creates a personalized and supportive sanctuary for your reading journey.
          </p>
        </div>
      </div>
      <Features />
    </main>
  );
};

export default FeaturesPage;