import { GoogleGenAI, Type } from "@google/genai";
import type { Quote, UserPreferences } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const defaultQuotes: Quote[] = [
  { text: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.", author: "George R.R. Martin" },
  { text: "Until I feared I would lose it, I never loved to read. One does not love breathing.", author: "Harper Lee" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "The only thing you absolutely have to know, is the location of the library.", author: "Albert Einstein" },
  { text: "Reading is a conversation. All books talk. But a good book listens as well.", author: "Mark Haddon" }
];

export const getInspirationalQuote = async (preferences?: UserPreferences): Promise<Quote> => {
  const isPersonalized = preferences && !Object.values(preferences).every(v => v === '');
  let prompt: string;

  if (isPersonalized) {
    prompt = `
      Based on the following user profile, generate a single, short, inspiring quote that would resonate with them. The quote should be insightful and relevant to their current life situation.

      - Mood/State of Mind: "${preferences.mood}"
      - Interests: "${preferences.interests}"
      - Challenges: "${preferences.challenges}"
      - Goals: "${preferences.goals}"

      The quote can be from a real person or an insightful proverb.
    `;
  } else {
    prompt = `
      Generate a single, short, inspiring quote about the joy of reading, mindfulness, or personal growth. The quote can be from a real person or an insightful proverb.
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: {
              type: Type.STRING,
              description: "The generated inspirational quote text."
            },
            author: {
              type: Type.STRING,
              description: "The author of the quote (e.g., 'Albert Einstein' or 'Japanese Proverb')."
            }
          },
          required: ['quote', 'author']
        }
      }
    });

    const jsonResponseText = response.text.trim();
    const result = JSON.parse(jsonResponseText);
    
    if (result.quote && result.author) {
      return { text: result.quote, author: result.author };
    } else {
      throw new Error("Invalid response structure from AI.");
    }

  } catch (error) {
    console.error(`Error calling Gemini API for quote generation (Personalized: ${isPersonalized}):`, error);
    // Fallback to a default quote on error
    return defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)];
  }
};