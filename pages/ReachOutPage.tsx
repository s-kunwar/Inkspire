import React from 'react';
import type { ReachOutContent, OnlineSession, Event, Counselor, Activity } from '../types';
import { ReachOutIllustration } from '../components/illustrations/ReachOutIllustration';
import { VideoCameraIcon } from '../components/icons/VideoCameraIcon';
import { CalendarDaysIcon } from '../components/icons/CalendarDaysIcon';
import { UserGroupIcon } from '../components/icons/UserGroupIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';

interface ReachOutPageProps {
  content: ReachOutContent | null;
  isGenerating: boolean;
}

interface ContentCardProps {
  item: OnlineSession | Event | Counselor | Activity;
  icon: React.ReactNode;
  type: 'session' | 'event' | 'counselor' | 'activity';
  delay: number;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, icon, type, delay }) => {
  const getCategory = () => {
    if ('category' in item) return item.category;
    if ('specialty' in item) return item.specialty;
    return 'General';
  };

  const getTitle = () => {
    if ('name' in item) return item.name;
    return item.title;
  };

  return (
    <div 
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-in-up"
        style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-500 dark:text-teal-400">
          {icon}
        </div>
        <div className="flex-grow">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">{getCategory()}</p>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-1">{getTitle()}</h3>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-300 mt-4 flex-grow">{item.description}</p>
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400">
        {'platform' in item && `Platform: ${item.platform}`}
        {'date' in item && `Date: ${item.date} | Location: ${item.location}`}
        {type === 'counselor' && <a href="#" className="font-semibold text-teal-600 hover:underline">Connect Now &rarr;</a>}
        {type === 'activity' && <a href="#" className="font-semibold text-teal-600 hover:underline">Start Activity &rarr;</a>}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
            {children}
        </div>
    </div>
);


const ReachOutPage: React.FC<ReachOutPageProps> = ({ content, isGenerating }) => {
    if (isGenerating || !content) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <SpinnerIcon className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Loading resources...</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">Finding the best support options for you.</p>
            </div>
        );
    }

  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-16 text-center lg:text-left">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
              A Space to Connect & Grow
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0">
              Discover resources, events, and supportive connections tailored to your well-being journey. You're not alone.
            </p>
          </div>
          <div className="lg:w-1/2 w-full max-w-md lg:max-w-none">
            <ReachOutIllustration className="w-full h-auto" />
          </div>
        </div>

        {/* Content Sections */}
        <Section title="Online Sessions">
          {content.online_sessions.map((item, i) => (
            <ContentCard key={`session-${i}`} item={item} icon={<VideoCameraIcon className="w-6 h-6" />} type="session" delay={i * 100} />
          ))}
        </Section>
        
        <Section title="Community Events">
          {content.events.map((item, i) => (
            <ContentCard key={`event-${i}`} item={item} icon={<CalendarDaysIcon className="w-6 h-6" />} type="event" delay={i * 100} />
          ))}
        </Section>

        <Section title="Supportive Counselors">
          {content.counselors.map((item, i) => (
            <ContentCard key={`counselor-${i}`} item={item} icon={<UserGroupIcon className="w-6 h-6" />} type="counselor" delay={i * 100} />
          ))}
        </Section>

        <Section title="Mindful Activities">
          {content.activities.map((item, i) => (
            <ContentCard key={`activity-${i}`} item={item} icon={<SparklesIcon className="w-6 h-6" />} type="activity" delay={i * 100} />
          ))}
        </Section>
      </div>
    </main>
  );
};

export default ReachOutPage;