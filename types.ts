// types.ts

/**
 * Represents the data required for a user to sign up.
 */
export interface UserSignUp {
  name: string;
  email: string;
  password: string;
}

/**
 * Represents the structure of the response from the sign-up API endpoint.
 */
export interface SignUpResponse {
  success: boolean;
  message: string;
}

// FIX: Add missing Quote type definition.
/**
 * Represents an inspirational quote with its text and author.
 */
export interface Quote {
  text: string;
  author: string;
}

/**
 * Represents a user's personalization preferences.
 */
export interface UserPreferences {
  genres: string;
  mood: string;
  interests: string;
  challenges: string;
  goals: string;
}

/**
 * Represents a user review for a book.
 */
export interface Review {
  user: string;
  avatar: string;
  comment: string;
  rating: number; // Rating from 1 to 5
}

/**
 * Represents a book with its details and reviews.
 */
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  synopsis: string;
  reviews: Review[];
}

/**
 * Represents the price and URL for a book from a specific vendor.
 */
export interface VendorPrice {
  price: string | null;
  url: string | null;
}

/**
 * Represents the collected price information for a book from multiple vendors.
 */
export interface PriceInfo {
  amazon: VendorPrice;
  flipkart: VendorPrice;
}

/**
 * Represents a virtual person (AI chat companion).
 */
export interface VirtualPerson {
  id: number;
  name: string;
  gender: 'male' | 'female';
  avatarUrl: string;
  bio: string;
  shortBio: string;
  systemInstruction: string;
}

/**
 * Represents a single message in a chat conversation.
 */
export interface ChatMessage {
  id: string; // Unique ID for the message
  text: string;
  sender: 'user' | number; // 'user' or the virtual person's ID
  timestamp: number;
}

/**
 * Represents an online session or workshop.
 */
export interface OnlineSession {
  title: string;
  description: string;
  category: string;
  platform: string;
}

/**
 * Represents a community event.
 */
export interface Event {
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
}

/**
 * Represents a counselor profile.
 */
export interface Counselor {
  name: string;
  specialty: string;
  description: string;
}

/**
 * Represents a mindful activity.
 */
export interface Activity {
  title: string;
  description: string;
  category: string;
}

/**
 * Represents the content for the 'Reach Out' page.
 */
export interface ReachOutContent {
  online_sessions: OnlineSession[];
  events: Event[];
  counselors: Counselor[];
  activities: Activity[];
}

/**
 * Represents the user who created a story post.
 */
export interface StoryPostUser {
  name: string;
  handle: string;
  avatarUrl: string;
}

/**
 * Represents a single story post in the 'Connect' feed.
 */
export interface StoryPost {
  id: string;
  user: StoryPostUser;
  story: string;
  imageUrl?: string;
  book: {
    title: string;
    author: string;
  };
  timestamp: number;
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  shareCount: number;
}
