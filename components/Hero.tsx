import React from 'react';
import { HeroIllustration } from './illustrations/HeroIllustration';

const Hero: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="absolute inset-0 aurora-bg z-0"></div>
      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight mb-4">
              Discover Your Next Great Read, Mindfully.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
              Inkspire is a curated platform that connects you with books that inspire, challenge, and calm your mind. Join our community and rediscover the joy of reading.
            </p>
            <a
              href="#signup"
              onClick={handleSmoothScroll}
              className="inline-block bg-teal-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-600 dark:hover:bg-teal-400 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </a>
          </div>
          <div className="md:w-1/2">
            <HeroIllustration className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;