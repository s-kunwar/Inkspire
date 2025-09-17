import { GoogleGenAI, Type } from "@google/genai";
import type { Review } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Generates realistic book reviews using the Gemini API.
 * @param title The title of the book.
 * @param author The author of the book.
 * @returns A promise that resolves to an array of Review objects.
 */
export const getBookReviews = async (title: string, author: string): Promise<Review[]> => {
  const prompt = `
    For the book ${JSON.stringify(title)} by ${JSON.stringify(author)}, generate a list of 4 to 5 short, realistic book reviews.
    These reviews should capture the informal, conversational, and sometimes opinionated tone found on platforms like Reddit or Quora.
    Each review MUST be only 2 to 3 lines long.
    Assign a different, modern, and common Indian name to each reviewer.
    Provide a plausible star rating between 3 and 5 for each review.
    The reviews should reflect a mix of perspectives – some might be glowingly positive, others might have minor critiques, but they should all sound authentic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reviews: {
              type: Type.ARRAY,
              description: "An array of 4-5 generated book reviews.",
              items: {
                type: Type.OBJECT,
                properties: {
                  user: {
                    type: Type.STRING,
                    description: "A modern, common Indian name for the reviewer."
                  },
                  comment: {
                    type: Type.STRING,
                    description: "The 2-3 line review comment."
                  },
                  rating: {
                    type: Type.NUMBER,
                    description: "A rating from 3 to 5."
                  }
                },
                required: ['user', 'comment', 'rating']
              }
            }
          },
          required: ['reviews']
        }
      }
    });

    const jsonResponseText = response.text.trim();
    const result = JSON.parse(jsonResponseText);

    if (!result.reviews || !Array.isArray(result.reviews)) {
      throw new Error("Invalid response structure from AI.");
    }
    
    // Map the AI response to our Review type, adding a placeholder avatar
    return result.reviews.map((review: Omit<Review, 'avatar'>) => ({
      ...review,
      avatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(review.user)}`
    }));

  } catch (error) {
    console.error(`Error calling Gemini API for review generation for "${title}":`, error);
    // Return an empty array on error so the app doesn't crash
    return [];
  }
};