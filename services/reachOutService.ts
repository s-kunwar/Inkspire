import { GoogleGenAI, Type } from "@google/genai";
import type { UserPreferences, ReachOutContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const defaultContent: ReachOutContent = {
  online_sessions: [
    { title: "Intro to Mindfulness Meditation", description: "Learn the basics of mindfulness in this guided session to calm your mind.", category: "Mindfulness", platform: "Zoom" },
    { title: "Digital Detox Workshop", description: "Discover strategies to reduce screen time and cultivate a healthier relationship with technology.", category: "Well-being", platform: "Google Meet" },
  ],
  events: [
    { title: "Community Book Swap", description: "Meet fellow readers and exchange your favorite books in a friendly, relaxed atmosphere.", category: "Community", date: "Next Saturday", location: "Online Forum" },
    { title: "Guided Journaling Group", description: "Join our weekly group to explore your thoughts and feelings through guided journaling prompts.", category: "Self-Reflection", date: "Every Wednesday", location: "Online" },
  ],
  counselors: [
    { name: "Anjali Sharma", specialty: "Stress & Anxiety", description: "Anjali helps clients develop coping mechanisms for stress and anxiety in a supportive environment." },
    { name: "Ravi Kapoor", specialty: "Career & Life Transitions", description: "Ravi specializes in guiding individuals through career changes and major life adjustments." },
  ],
  activities: [
    { title: "Mindful Morning Walk", description: "Start your day with a 15-minute walk, focusing on your breath and the sensations around you.", category: "Mindfulness" },
    { title: "Creative Doodling", description: "Spend 10 minutes doodling without any goal. Let your mind wander and express itself freely.", category: "Creative" },
  ],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    online_sessions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          category: { type: Type.STRING },
          platform: { type: Type.STRING }
        },
        required: ["title", "description", "category", "platform"]
      }
    },
    events: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          category: { type: Type.STRING },
          date: { type: Type.STRING },
          location: { type: Type.STRING }
        },
        required: ["title", "description", "category", "date", "location"]
      }
    },
    counselors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          specialty: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["name", "specialty", "description"]
      }
    },
    activities: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          category: { type: Type.STRING }
        },
        required: ["title", "description", "category"]
      }
    },
  },
  required: ["online_sessions", "events", "counselors", "activities"]
};

export const getReachOutContent = async (preferences?: UserPreferences): Promise<ReachOutContent> => {
  const isPersonalized = preferences && !Object.values(preferences).every(v => v === '');
  let prompt: string;
  
  if (isPersonalized) {
    prompt = `
      Based on the following user profile, generate a diverse and supportive list of mental health and well-being resources. Create exactly 2 items for each category: online_sessions, events, counselors, and activities. All content should be in simple, clear, and encouraging English. The content should be directly relevant to the user's profile. For example, if the user feels stressed, suggest meditation sessions. If they are interested in art, suggest art therapy activities.

      User Profile:
      - Mood/State of Mind: "${preferences.mood}"
      - Interests: "${preferences.interests}"
      - Challenges: "${preferences.challenges}"
      - Goals: "${preferences.goals}"
    `;
  } else {
    // If not personalized, just return the default content immediately.
    return defaultContent;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const jsonResponseText = response.text.trim();
    const result = JSON.parse(jsonResponseText);

    // Validate the structure to ensure all keys are present
    if (result.online_sessions && result.events && result.counselors && result.activities) {
      return result;
    } else {
      throw new Error("AI response was missing required fields.");
    }
  } catch (error) {
    console.error(`Error calling Gemini API for Reach Out content (Personalized: ${isPersonalized}):`, error);
    // Fallback to default content on any error
    return defaultContent;
  }
};