import React, { useState } from 'react';
import type { UserPreferences } from '../types';
import { CustomizeIllustration } from '../components/illustrations/CustomizeIllustration';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';

interface CustomizePageProps {
  onGetRecommendations: (preferences: UserPreferences) => Promise<void>;
  isGenerating: boolean;
  error: string;
}

const CustomizePage: React.FC<CustomizePageProps> = ({ onGetRecommendations, isGenerating, error }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    genres: '',
    mood: '',
    interests: '',
    challenges: '',
    goals: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGetRecommendations(preferences);
  };

  const formFields = [
    { name: 'genres', label: 'What genres or types of stories are you drawn to?', placeholder: 'e.g., quiet character studies, sci-fi with philosophical questions, memoirs about resilience...' },
    { name: 'mood', label: 'How are you feeling lately? What kind of mood are you hoping to find in a book?', placeholder: 'e.g., feeling a bit lost and looking for hope, stressed and need an escape, curious and want to learn...' },
    { name: 'interests', label: 'Beyond books, what are your hobbies and interests?', placeholder: 'e.g., hiking in nature, learning to code, painting, ancient history, psychology...' },
    { name: 'challenges', label: 'Are there any specific challenges, experiences, or themes you\'re currently navigating or reflecting on?', placeholder: 'e.g., dealing with a big life change, overcoming a personal fear, understanding a past relationship...' },
    { name: 'goals', label: 'What are some of your future goals or aspirations?', placeholder: 'e.g., wanting to be more mindful, building better habits, starting a new career path...' },
  ];

  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="lg:w-1/2 w-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">Curate Your Journey</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Tell us a little about yourself. The more you share, the better we can tailor your reading recommendations to fit your life right now.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map(field => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-slate-700 dark:text-slate-300 font-semibold mb-2">{field.label}</label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={preferences[field.name as keyof UserPreferences]}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-3 bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 dark:hover:bg-teal-400 transition-all disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <SpinnerIcon className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Find My Books
                      <SparklesIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 w-full hidden lg:block">
            <CustomizeIllustration />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomizePage;