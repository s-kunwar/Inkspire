import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, StoryPost } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const generateStories = async (prompt: string): Promise<StoryPost[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  user_name: { type: Type.STRING },
                  user_handle: { type: Type.STRING },
                  story: { type: Type.STRING },
                  book_title: { type: Type.STRING },
                  book_author: { type: Type.STRING },
                  image_prompt: { type: Type.STRING, description: "An optional prompt for a relevant image." },
                },
                required: ["user_name", "user_handle", "story", "book_title", "book_author"]
              }
            }
          },
          required: ["stories"]
        }
      }
    });

    const jsonResponseText = response.text.trim();
    const result = JSON.parse(jsonResponseText);
    
    if (!result.stories || !Array.isArray(result.stories)) {
      throw new Error("Invalid response structure from AI for stories.");
    }
    
    // Map the AI response to our StoryPost type, adding random engagement data
    return result.stories.map((story: any, index: number): StoryPost => {
        const imageUrl = story.image_prompt 
            ? `https://picsum.photos/seed/${encodeURIComponent(story.image_prompt)}/600/400` 
            : undefined;

        return {
            id: `story-${Date.now()}-${index}`,
            user: {
                name: story.user_name,
                handle: story.user_handle,
                avatarUrl: `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(story.user_name)}` // Simple avatar generation
            },
            story: story.story,
            imageUrl,
            book: {
                title: story.book_title,
                author: story.book_author
            },
            timestamp: Date.now() - Math.floor(Math.random() * 86400000 * 3), // Random time in last 3 days
            likeCount: Math.floor(Math.random() * 250),
            isLiked: false,
            commentCount: Math.floor(Math.random() * 50),
            shareCount: Math.floor(Math.random() * 25),
        };
    });

  } catch (error) {
    console.error("Error calling Gemini API for story generation:", error);
    throw new Error("Failed to generate stories.");
  }
};

export const getInitialStories = async (): Promise<StoryPost[]> => {
  const prompt = `
    Generate a diverse list of 25 short, realistic stories for a social feed. Each story should be from a different person sharing how a book influenced their life.
    The stories must have varied tones: some inspiring, some critical, some funny, some about misunderstandings, some about failures.
    The story itself should have a random length, between 100 and 1000 words.
    For approximately 30% of the stories, also provide a short, descriptive prompt for an image that could accompany the story (e.g., "a cozy armchair by a rainy window with a cup of tea"). For the other 70%, this 'image_prompt' field should be null or omitted.
    For each story, provide a realistic user name, a twitter-style user handle, the story, the book title, the book author, and the optional image_prompt.
    The people sharing should have modern, common Indian names.
  `;
  return generateStories(prompt);
};

export const getPersonalizedStories = async (preferences: UserPreferences): Promise<StoryPost[]> => {
  const prompt = `
    Based on the following user profile, generate a diverse list of 25 short, realistic stories for a social feed. Each story should be from a different person sharing how a book influenced their life.
    The stories must have varied tones but should be tailored to resonate with the user's profile.
    The story itself should have a random length, between 100 and 1000 words.
    For approximately 30% of the stories, also provide a short, descriptive prompt for an image that could accompany the story. For the other 70%, this 'image_prompt' field should be null or omitted.
    For each story, provide a realistic user name, a twitter-style user handle, the story, the book title, the book author, and the optional image_prompt.
    The people sharing should have modern, common Indian names.

    User Profile:
    - Favorite Genres/Story Types: "${preferences.genres}"
    - Current Mood/State of Mind: "${preferences.mood}"
    - Hobbies and Interests: "${preferences.interests}"
    - Current Challenges: "${preferences.challenges}"
    - Future Goals: "${preferences.goals}"
  `;
  return generateStories(prompt);
};
