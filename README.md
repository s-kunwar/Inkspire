# Inkspire

## 1. Project Overview & Vision  
Inkspire is a modern web app made to be a calm place for readers. It mixes the fun of reading with mental well-being and community support.  

Unlike normal book suggestion apps, Inkspire creates a complete space where users can find books that match how they feel, connect with people like them, and access mental health resources.  

The main goal is to use AI to make a **personalized and caring space** where users can:
- Discover books that fit their life situation.  
- Talk to a supportive community.  
- Get help and tips for mental well-being.  

Inkspire is designed to be a peaceful spot on the internet, away from all the noise, and help people enjoy reading in a deeper way.  

---

## 2. Core Theme & Purpose  
**Theme:** Mindful Reading & Digital Well-being  
**Purpose:** To help users find books that inspire, relax, or challenge them. Inkspire wants to turn reading into a mindful habit that supports self-growth and mental health.  

---

## 3. Target Audience  
Inkspire is made for people who:  
- Want more than just a "next book" list — they want books that match their life and mood.  
- Feel stressed by the fast pace of life and want a calming online space.  
- Like connecting with others who share their reading interests.  
- Care about self-growth, reflection, and mental health.  

---

## 4. Key Features & Functionality  

Inkspire has several main features, all powered by the **Google Gemini API** for a smooth and personalized experience.  

### a. Deep Personalization Engine (Customize Page)  
- **What it does:** When users join, they answer a simple questionnaire about their favorite genres, mood, hobbies, challenges, and goals.  
- **AI Role:** Gemini processes these answers and builds a user profile. This profile powers book suggestions, AI companions, and other features.  

### b. The Reading Nook (Explore Page)  
- **What it does:** This is the main page where users see a grid of book suggestions.  
- **AI Role:** Gemini creates smart search queries to find books from APIs like Google Books and Open Library.  
- **Book Details:** Clicking on a book shows:  
  - Cover art and summary  
  - AI-generated reviews (4–5 fake but realistic reviews for variety)  
  - Price comparison from sites like Amazon and Flipkart  
- **User Actions:** Add/remove books from "My Reading List" and write their own reviews.  

### c. AI-Powered Community (Connect Page)  
- **What it does:** A social feed where users share how books impacted them.  
- **AI Role:** Gemini creates an initial feed of posts so it feels active from the start. After a user sets up their profile, the feed updates to match their interests.  
- **User Actions:** Like posts and engage with others.  

### d. AI Companionship (Fam Page)  
- **What it does:** Gives users a "Fam" — 10 AI friends they can chat with safely.  
- **AI Role:** Gemini creates unique personas with names, bios, and personalities based on the user's profile. All chat replies are short and casual, like texting a friend.  

### e. Holistic Well-being Hub (Reach Out Page)  
- **What it does:** Provides mental health resources.  
- **AI Role:** Based on the user's needs, Gemini suggests:  
  - Online sessions (like guided meditation)  
  - Virtual events (like journaling groups)  
  - Fictional counselor profiles  
  - Small daily activities for stress relief  

### f. Personal Library (My Reading List Page)  
- **What it does:** A space to view and manage all saved books in a clean, easy layout.  

---

## 5. Technology & Architecture  

- **Frontend:** React 19 + TypeScript (modern and reliable)  
- **Styling:** TailwindCSS (responsive, easy-to-maintain design). Includes light/dark mode support.  
- **AI Engine:** Google Gemini API using `@google/genai` for:  
  - Understanding user preferences  
  - Generating book suggestions, reviews, and posts  
  - Creating and running AI personas  
  - Finding live prices with Google Search grounding  
- **Architecture:**  
  - **SPA (Single Page Application):** Smooth experience without reloading pages  
  - **Component-Based:** Clean structure with separate pages, components, and services  
  - **Service Layer:** Handles all API calls (recommendationService, famService, etc.)  
  - **State Management:** Uses React hooks (`useState`, `useEffect`, `useContext`)  

---

## 6. UI/UX Design Philosophy  

- **Look & Feel:** Clean, soft colors (teal, slate), calm design, lots of white space, and Lexend font for readability.  
- **Visual Identity:** Custom SVG illustrations that match the feature purpose and switch with light/dark mode.  
- **User Experience:**  
  - Smooth animations and transitions  
  - Inspiring quotes on loading screens  
  - Mobile-first design (works on all devices)  
  - Accessible for everyone (semantic HTML, ARIA attributes)  
  - Interactive with hover effects, micro-animations, and clear feedback  


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
