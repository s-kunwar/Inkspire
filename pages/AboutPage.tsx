import React from 'react';
import About from '../components/About';

const AboutPage: React.FC = () => {
  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900 animate-fade-in-up">
       <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Learn about the passion and purpose behind Inkspire.
          </p>
        </div>
      </div>
      <About />
    </main>
  );
};

export default AboutPage;