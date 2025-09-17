import { GoogleGenAI } from "@google/genai";
import type { PriceInfo } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

/**
 * Fetches book prices from Amazon and Flipkart using the Gemini API with Google Search.
 * @param title - The title of the book.
 * @param author - The author of the book.
 * @returns A promise that resolves to an object containing price information.
 */
export const getBookPrices = async (
  title: string,
  author: string
): Promise<PriceInfo> => {
  const prompt = `
    Based on Google Search results, find the current price and product URL for the book "${title}" by ${author} on amazon.in and flipkart.com.
    Search for the most common edition (e.g., paperback).
    Provide your response ONLY as a single, minified JSON object with the following structure:
    {"amazon": {"price": "₹XXX.XX", "url": "product_url"}, "flipkart": {"price": "₹XXX.XX", "url": "product_url"}}
    If a price or URL cannot be found for a vendor, use null for that specific value. Do not add any text before or after the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an API that responds only in valid, minified JSON. Do not include any text before or after the JSON object.",
        tools: [{ googleSearch: {} }],
      },
    });

    const responseText = response.text.trim();
    
    // Robustly find the JSON block within the response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch || !jsonMatch[0]) {
      // Throw an error if no JSON object is found in the response
      throw new Error(`AI response did not contain a valid JSON object. Response: "${responseText}"`);
    }

    const jsonString = jsonMatch[0];
    const parsedResult = JSON.parse(jsonString);

    // Basic validation of the parsed structure
    const amazonData = parsedResult.amazon || { price: null, url: null };
    const flipkartData = parsedResult.flipkart || { price: null, url: null };

    return {
      amazon: {
        price: amazonData.price,
        url: amazonData.url,
      },
      flipkart: {
        price: flipkartData.price,
        url: flipkartData.url,
      },
    };

  } catch (error) {
    console.error("Error fetching or parsing book prices from Gemini API:", error);
    throw new Error("Failed to fetch book prices.");
  }
};