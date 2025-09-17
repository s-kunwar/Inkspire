import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, VirtualPerson, ChatMessage } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateFamMembers = async (preferences: UserPreferences): Promise<VirtualPerson[]> => {
  const prompt = `
    Based on the following user profile, create a diverse group of 10 unique virtual friends with common, modern Indian names. These friends should feel relatable and supportive.

    User Profile:
    - Favorite Genres/Story Types: "${preferences.genres}"
    - Current Mood/State of Mind: "${preferences.mood}"
    - Hobbies and Interests: "${preferences.interests}"
    - Current Challenges: "${preferences.challenges}"
    - Future Goals: "${preferences.goals}"

    For each of the 10 friends, provide:
    1.  A unique ID from 1 to 10.
    2.  A modern Indian name.
    3.  The person's gender ('male' or 'female').
    4.  A short, engaging bio (1-2 sentences) that hints at their personality.
    5.  A very short (2-4 words) bio or title for display in a list.
    6.  A detailed "systemInstruction" for the AI model. This instruction MUST command the AI to adopt the persona's voice and personality. It should explicitly state their communication style, which must be based on simple, clear, and easy-to-understand English vocabulary, avoiding complex jargon or regional slang.
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
            fam_members: {
              type: Type.ARRAY,
              description: "An array of 10 virtual friend personas.",
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.NUMBER },
                  name: { type: Type.STRING },
                  gender: { type: Type.STRING, description: "The gender of the person, either 'male' or 'female'." },
                  bio: { type: Type.STRING },
                  shortBio: { type: Type.STRING, description: "A very short (2-4 words) bio or title." },
                  systemInstruction: { type: Type.STRING }
                },
                required: ['id', 'name', 'gender', 'bio', 'shortBio', 'systemInstruction']
              }
            }
          },
          required: ['fam_members']
        }
      }
    });

    const jsonResponseText = response.text.trim();
    const result = JSON.parse(jsonResponseText);

    if (!result.fam_members || result.fam_members.length !== 10) {
      throw new Error("AI did not return 10 fam members.");
    }
    
    // Assign a gender-specific avatar URL to each member
    return result.fam_members.map((member: Omit<VirtualPerson, 'avatarUrl'>) => ({
      ...member,
      avatarUrl: member.gender === 'female'
        ? `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(member.name)}`
        : `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(member.name)}`
    }));

  } catch (error) {
    console.error("Error calling Gemini API for fam generation:", error);
    throw new Error("Failed to generate virtual friends.");
  }
};

export const getChatResponse = async (
    persona: VirtualPerson, 
    history: ChatMessage[]
): Promise<string> => {

    // Create a simplified history for the prompt
    const historyForPrompt = history.slice(-10).map(msg => ({ // last 10 messages
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: historyForPrompt,
            config: {
                systemInstruction: `
                    ${persona.systemInstruction}
                    IMPORTANT: Your responses must be short, like text messages. If you have something long to say, break it into multiple small, distinct sentences. You must not use bullet points or lists. Keep your language casual and natural.
                `,
            },
        });

        return response.text;
    } catch (error) {
        console.error("Error getting chat response from Gemini:", error);
        throw new Error("Failed to get chat response.");
    }
}