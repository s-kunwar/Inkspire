import React from 'react';
import type { StoryPost } from '../types';
import { formatTimeAgo } from '../utils/time';
import { HeartIcon } from './icons/HeartIcon';
import { ChatBubbleOvalLeftEllipsisIcon } from './icons/ChatBubbleOvalLeftEllipsisIcon';
import { ArrowPathRoundedSquareIcon } from './icons/ArrowPathRoundedSquareIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface StoryPostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: StoryPost;
  onToggleLike: (postId: string) => void;
}

const StoryPostCard: React.FC<StoryPostCardProps> = ({ post, onToggleLike, ...props }) => {
    
  const ActionButton: React.FC<{
    icon: React.ReactNode;
    count: number;
    colorClasses: string;
    onClick?: (e: React.MouseEvent) => void;
  }> = ({ icon, count, colorClasses, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 group focus:outline-none ${colorClasses}`}
    >
      <div className="p-2 rounded-full transition-colors group-hover:bg-opacity-20">
        {icon}
      </div>
      <span className="text-sm transition-colors">{count > 0 ? count : ''}</span>
    </button>
  );

  return (
    <article 
        {...props}
        className={`bg-white dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex space-x-4 ${props.className || ''}`}
    >
      <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h4 className="font-bold text-slate-800 dark:text-slate-100">{post.user.name}</h4>
          <p className="text-slate-500 dark:text-slate-400">@{post.user.handle}</p>
          <span className="text-slate-500 dark:text-slate-400">&middot;</span>
          <p className="text-slate-500 dark:text-slate-400">{formatTimeAgo(post.timestamp)}</p>
        </div>
        <p className="mt-1 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{post.story}</p>
        
        {post.imageUrl && (
            <div className="mt-4 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <img src={post.imageUrl} alt="User-provided content for their story" className="w-full h-auto object-cover max-h-96" />
            </div>
        )}

        <div className="mt-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center space-x-3 bg-slate-50 dark:bg-slate-800">
            <BookOpenIcon className="w-8 h-8 text-teal-500 flex-shrink-0" />
            <div>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{post.book.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{post.book.author}</p>
            </div>
        </div>

        <div className="flex justify-between items-center mt-4 max-w-sm">
          <ActionButton
            icon={<ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />}
            count={post.commentCount}
            colorClasses="text-slate-500 group-hover:text-blue-500 group-hover:bg-blue-500"
          />
          <ActionButton
            icon={<ArrowPathRoundedSquareIcon className="w-5 h-5" />}
            count={post.shareCount}
            colorClasses="text-slate-500 group-hover:text-green-500 group-hover:bg-green-500"
          />
          <ActionButton
            icon={
              <HeartIcon 
                className={`w-5 h-5 transition-transform duration-200 ease-in-out ${post.isLiked ? 'text-pink-500 scale-110' : 'group-hover:scale-110'}`} 
                isFilled={post.isLiked} 
              />
            }
            count={post.likeCount}
            colorClasses={`text-slate-500 ${post.isLiked ? 'text-pink-500' : 'group-hover:text-pink-500'} group-hover:bg-pink-500`}
            onClick={(e) => { e.stopPropagation(); onToggleLike(post.id); }}
          />
        </div>
      </div>
    </article>
  );
};

export default StoryPostCard;
