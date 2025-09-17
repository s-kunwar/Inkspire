import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon } from './icons/ImageIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface CreatePostProps {
  onPost: (story: string, bookTitle: string, bookAuthor: string, imageUrl?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [story, setStory] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [story]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (story.trim() && bookTitle.trim() && bookAuthor.trim()) {
      onPost(story, bookTitle, bookAuthor, imagePreview || undefined);
      setStory('');
      setBookTitle('');
      setBookAuthor('');
      setImagePreview(null);
      setIsFocused(false);
      if(fileInputRef.current) fileInputRef.current.value = '';
      textareaRef.current?.blur();
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
  }

  const canSubmit = story.trim() && bookTitle.trim() && bookAuthor.trim();

  return (
    <div className="flex items-start space-x-4">
      <img src="https://i.pravatar.cc/48?u=user_profile" alt="Your avatar" className="w-12 h-12 rounded-full" />
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="How did a book change your life?"
            className="w-full bg-transparent text-lg text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none resize-none overflow-hidden"
            rows={isFocused ? 3 : 1}
          />
        </div>

        {imagePreview && isFocused && (
            <div className="mt-3 relative">
                <img src={imagePreview} alt="Preview" className="rounded-lg w-full max-h-80 object-cover" />
                <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                    aria-label="Remove image"
                >
                    <XCircleIcon className="w-6 h-6" />
                </button>
            </div>
        )}

        <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isFocused ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="Book Title"
                className="w-full text-sm px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <input
                type="text"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                placeholder="Book Author"
                className="w-full text-sm px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/50 transition-colors"
              aria-label="Add image"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="bg-teal-500 text-white font-bold py-2 px-6 rounded-full disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-teal-600 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
