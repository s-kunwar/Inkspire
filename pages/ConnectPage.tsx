import React from 'react';
import type { StoryPost } from '../types';
import CreatePost from '../components/CreatePost';
import StoryPostCard from '../components/StoryPostCard';
import { SpinnerIcon } from '../components/icons/SpinnerIcon';
import { ConnectIllustration } from '../components/illustrations/ConnectIllustration';

interface ConnectPageProps {
  posts: StoryPost[];
  onPostStory: (story: string, bookTitle: string, bookAuthor: string, imageUrl?: string) => void;
  onToggleLike: (postId: string) => void;
  isGenerating: boolean;
}

const ConnectPage: React.FC<ConnectPageProps> = ({ posts, onPostStory, onToggleLike, isGenerating }) => {
  return (
    <main className="flex-grow bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-row items-start gap-8">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3">
            <div className="min-h-screen">
              {/* Header */}
              <div className="sticky top-20 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg p-4 border-x border-b border-slate-200 dark:border-slate-700">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Connect</h1>
                <p className="text-slate-500 dark:text-slate-400">Share your story. Discover others.</p>
              </div>

              {/* Create Post */}
              <div className="p-4 border-x border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                <CreatePost onPost={onPostStory} />
              </div>

              {/* Feed */}
              <div className="border-x border-slate-200 dark:border-slate-700">
                {isGenerating && posts.length === 0 ? (
                     <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-800/50">
                        <SpinnerIcon className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Loading stories...</h2>
                     </div>
                ) : posts.length > 0 ? (
                    posts.map((post, index) => (
                        <StoryPostCard 
                            key={post.id} 
                            post={post} 
                            onToggleLike={onToggleLike} 
                            style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
                            className="animate-fade-in-up"
                        />
                    ))
                ) : (
                    <div className="text-center py-20 px-4 bg-white dark:bg-slate-800/50">
                        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">No stories yet.</h2>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Be the first to share how a book changed your perspective!
                        </p>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Illustration Column */}
          <div className="w-full lg:w-1/3 hidden lg:flex items-start justify-center pt-12">
            <div className="sticky top-28">
              <ConnectIllustration className="w-full h-auto max-w-md" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ConnectPage;
