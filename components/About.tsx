import React from 'react';
import { AboutIllustration } from './illustrations/AboutIllustration';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <AboutIllustration className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              In a world of constant noise and distraction, we believe in the power of reading to bring us back to ourselves. Inkspire was founded on a simple principle: to create a quiet corner of the internet for people who love to read and grow.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              We are not just a service; we are a community of passionate readers, writers, and thinkers dedicated to curating a library that enriches the mind and soul. We carefully select books that spark curiosity, encourage reflection, and offer new perspectives.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              Join us in making reading a mindful practice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;