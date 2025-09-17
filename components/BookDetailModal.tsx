import React, { useState, useEffect } from 'react';
import type { Book, PriceInfo, Review } from '../types';
import { StarIcon } from './icons/StarIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { getBookPrices } from '../services/priceService';
import { getBookReviews } from '../services/reviewService';
import { AmazonIcon } from './icons/AmazonIcon';
import { FlipkartIcon } from './icons/FlipkartIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
  readingList: string[];
  onToggleReadingList: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose, readingList, onToggleReadingList, onUpdateBook }) => {
  const [imageError, setImageError] = useState(false);
  const [prices, setPrices] = useState<PriceInfo | null>(null);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [isFetchingReviews, setIsFetchingReviews] = useState(false);

  // State for the new review form
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const placeholderUrl = `https://picsum.photos/seed/${encodeURIComponent(book.title)}/400/600`;

  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoadingPrices(true);
      setPrices(null);
      setPriceError(null);
      try {
        const fetchedPrices = await getBookPrices(book.title, book.author);
        setPrices(fetchedPrices);
      } catch (error) {
        console.error("Failed to fetch book prices:", error);
        setPriceError("Could not fetch prices at this time.");
      } finally {
        setIsLoadingPrices(false);
      }
    };

    const fetchReviewsIfNeeded = async () => {
        if (book.reviews.length < 3) {
            setIsFetchingReviews(true);
            try {
                const newReviews = await getBookReviews(book.title, book.author);
                if (newReviews.length > 0) {
                    const combinedReviews = [...book.reviews];
                    newReviews.forEach(newReview => {
                        if (!combinedReviews.some(existing => existing.comment === newReview.comment)) {
                            combinedReviews.push(newReview);
                        }
                    });
                    onUpdateBook({ ...book, reviews: combinedReviews });
                }
            } catch (error) {
                console.error("Failed to fetch additional reviews:", error);
            } finally {
                setIsFetchingReviews(false);
            }
        }
    };
    
    fetchPrices();
    fetchReviewsIfNeeded();

  }, [book.id, onUpdateBook]); // Rerun effects when a new book is selected

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSubmitReview = () => {
    if (!newReviewText.trim() || newReviewRating === 0) return;

    const newReview: Review = {
      user: 'You',
      avatar: `https://i.pravatar.cc/40?u=user_profile`, // A static avatar for the user
      comment: newReviewText,
      rating: newReviewRating,
    };

    // Prepend the new review so it appears at the top
    const updatedReviews = [newReview, ...book.reviews];
    onUpdateBook({ ...book, reviews: updatedReviews });

    // Reset and close the form
    setNewReviewText('');
    setNewReviewRating(0);
    setHoverRating(0);
    setIsWritingReview(false);
  };

  const imageUrl = imageError || !book.coverUrl ? placeholderUrl : book.coverUrl;
  const isInReadingList = readingList.includes(book.id);

  const renderPriceSection = () => {
    if (isLoadingPrices) {
      return <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 py-4"><SpinnerIcon className="w-5 h-5 animate-spin" /> Fetching prices...</div>;
    }
    if (priceError) {
      return <p className="text-red-500 text-center py-4">{priceError}</p>;
    }
    if (!prices || (!prices.amazon.url && !prices.flipkart.url)) {
      return <p className="text-slate-500 dark:text-slate-400 text-center py-4">Could not find this book online.</p>;
    }
    return (
      <div className="space-y-3">
        {prices.amazon.url && (
          <a href={prices.amazon.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <AmazonIcon className="w-6 h-6" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">Amazon</span>
            </div>
            <span className="font-bold text-teal-600 dark:text-teal-400">{prices.amazon.price || 'View Offer'} &rarr;</span>
          </a>
        )}
        {prices.flipkart.url && (
          <a href={prices.flipkart.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <div className="flex items-center gap-3">
              <FlipkartIcon className="w-6 h-6" />
              <span className="font-semibold text-slate-700 dark:text-slate-200">Flipkart</span>
            </div>
            <span className="font-bold text-teal-600 dark:text-teal-400">{prices.flipkart.price || 'View Offer'} &rarr;</span>
          </a>
        )}
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Left side: Book Cover */}
        <div className="w-full h-80 md:h-auto md:w-1/3 flex-shrink-0 bg-slate-200 dark:bg-slate-700">
          <img 
            src={imageUrl} 
            alt={`Cover of ${book.title}`} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>

        {/* Right side: Details and Reviews */}
        <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{book.title}</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">by {book.author}</p>
            </div>
            <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors text-3xl">&times;</button>
          </div>
          
          {/* Add to List Button */}
          <button
            onClick={() => onToggleReadingList(book)}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-colors mb-3
                       ${isInReadingList 
                           ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900' 
                           : 'bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500'}`}
          >
            <BookmarkIcon isSaved={isInReadingList} className="w-5 h-5" />
            {isInReadingList ? 'Remove from My List' : 'Add to My List'}
          </button>

          {/* Write a Review Button */}
          <button
            onClick={() => setIsWritingReview(prev => !prev)}
            className={`w-full text-center font-semibold py-3 px-4 rounded-lg transition-colors mb-6
                       ${isWritingReview 
                           ? 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600' 
                           : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-700'}`}
          >
            {isWritingReview ? 'Cancel Review' : 'Write a Review'}
          </button>

          {/* Review Form */}
          {isWritingReview && (
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg animate-fade-in-up transition-all" style={{animationDuration: '0.5s'}}>
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Your Review</h4>
              <div className="flex items-center mb-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 mr-3">Your Rating:</span>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon
                        key={i}
                        className={`w-6 h-6 cursor-pointer transition-colors ${
                            (hoverRating || newReviewRating) > i ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600 hover:text-amber-300'
                        }`}
                        onClick={() => setNewReviewRating(i + 1)}
                        onMouseEnter={() => setHoverRating(i + 1)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${i + 1} star`}
                        />
                    ))}
                </div>
              </div>
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows={4}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                placeholder="Share your thoughts on this book..."
                aria-label="Review text"
              />
              <button
                onClick={handleSubmitReview}
                disabled={!newReviewText.trim() || newReviewRating === 0}
                className="mt-3 w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition-all disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </div>
          )}
          
          {/* Synopsis */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">Synopsis</h3>
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{book.synopsis}</p>
          </div>

          {/* Where to Buy */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">Where to Buy</h3>
            {renderPriceSection()}
          </div>
          
          {/* Reviews */}
          <div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Reviews</h3>
            <div className="space-y-4">
              {book.reviews.length === 0 && !isFetchingReviews && (
                <p className="text-slate-500 dark:text-slate-400">No reviews yet for this book.</p>
              )}
              {book.reviews.map((review, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <div className="flex items-center">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{review.user}</p>
                      <div className="flex items-center ml-4">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">{review.comment}</p>
                  </div>
                </div>
              ))}
              {isFetchingReviews && (
                  <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 py-4">
                    <SpinnerIcon className="w-5 h-5 animate-spin" /> Fetching reviews...
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
