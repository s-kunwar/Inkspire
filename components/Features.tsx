import React from 'react';
import { PersonalizedRecsIllustration, CommunityIllustration, InspirationIllustration, SupportIllustration } from './illustrations/FeatureIllustrations';

const features = [
  {
    name: 'Personalized Recommendations',
    description: 'Our magical library understands your mood and suggests the perfect book to bring you peace and joy.',
    illustration: PersonalizedRecsIllustration,
  },
  {
    name: 'Connect & Share',
    description: 'Join heartwarming discussions with fellow book lovers in our cozy and supportive community spaces.',
    illustration: CommunityIllustration,
  },
  {
    name: 'Inspirational Feed',
    description: 'Receive uplifting quotes and beautiful passages daily to inspire mindfulness and brighten your day.',
    illustration: InspirationIllustration,
  },
  {
    name: 'Professional Support',
    description: 'Connect with caring professionals who can guide you on your journey to well-being through literature.',
    illustration: SupportIllustration,
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            A Sanctuary For Your Mind
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Every feature is thoughtfully designed to create a peaceful and enriching reading experience that supports your well-being.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className="flex flex-col text-center bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6 bg-teal-50 dark:bg-teal-900/20">
                <feature.illustration className="w-full h-40 object-contain" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{feature.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;