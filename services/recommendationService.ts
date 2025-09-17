import { GoogleGenAI, Type } from "@google/genai";
import type { Book, UserPreferences } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to map Google Books API item to our Book type
const mapGoogleBookToBook = (item: any): Book | null => {
  if (!item.id || !item.volumeInfo?.title) {
    return null;
  }
  
  let coverUrl = item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || '';
  if (coverUrl) {
    coverUrl = coverUrl.replace('http:', 'https:').replace('&edge=curl', '');
  }

  return {
    id: `g-${item.id}`, // Prefix to avoid ID collisions
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.join(', ') || 'Unknown Author',
    coverUrl: coverUrl,
    synopsis: item.volumeInfo.description || 'No synopsis available.',
    reviews: [],
  };
};

// Helper to map Open Library API doc to our Book type
const mapOpenLibraryDocToBook = (doc: any): Book | null => {
    if (!doc.key || !doc.title) {
        return null;
    }

    let coverUrl = '';
    if (doc.cover_i) {
        coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`;
    }

    // Open Library often has 'first_sentence' which can be a good fallback for synopsis
    const synopsis = (Array.isArray(doc.first_sentence) && doc.first_sentence.length > 0)
      ? doc.first_sentence[0]
      : (typeof doc.first_sentence === 'string' ? doc.first_sentence : 'No synopsis available.');

    return {
        id: `ol-${doc.key.replace('/works/', '')}`, // Prefix to avoid ID collisions
        title: doc.title,
        author: doc.author_name?.join(', ') || 'Unknown Author',
        coverUrl: coverUrl,
        synopsis: synopsis,
        reviews: [],
    };
}

/**
 * Adds a book to a Map, merging it with an existing entry if a duplicate is found.
 * @param book The book to add or merge.
 * @param map The map of books, keyed by a normalized title-author string.
 */
const addOrMergeBook = (book: Book, map: Map<string, Book>) => {
    const key = `${book.title.toLowerCase().trim()}|${book.author.toLowerCase().trim()}`;
    const existingBook = map.get(key);

    if (!existingBook) {
        map.set(key, book);
    } else {
        // Merge logic: prefer data that is more complete.
        // Prefer the book that has a cover URL. If both have one, the existing one is kept.
        if (!existingBook.coverUrl && book.coverUrl) {
            existingBook.coverUrl = book.coverUrl;
        }
        // Prefer a longer synopsis, assuming it's more descriptive.
        // Avoid replacing a good synopsis with the default "No synopsis available."
        if (book.synopsis && book.synopsis !== 'No synopsis available.' && (!existingBook.synopsis || existingBook.synopsis === 'No synopsis available.' || book.synopsis.length > existingBook.synopsis.length)) {
            existingBook.synopsis = book.synopsis;
        }
    }
};


const fetchFromMultipleSources = async (query: string): Promise<Book[]> => {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&orderBy=relevance&printType=books`;
    const openLibraryUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_sentence`;

    const [googleResult, openLibraryResult] = await Promise.allSettled([
        fetch(googleBooksUrl).then(res => res.json()),
        fetch(openLibraryUrl).then(res => res.json())
    ]);

    const allBooks = new Map<string, Book>();

    // Process Google Books results first as they often have better metadata
    if (googleResult.status === 'fulfilled' && googleResult.value.items) {
        const books = googleResult.value.items.map(mapGoogleBookToBook).filter((b): b is Book => b !== null);
        books.forEach(book => addOrMergeBook(book, allBooks));
    } else {
        console.error("Google Books API failed or returned no items:", googleResult.status === 'rejected' ? googleResult.reason : 'No items');
    }
    
    // Process Open Library results, merging with existing data
    if (openLibraryResult.status === 'fulfilled' && openLibraryResult.value.docs) {
        const books = openLibraryResult.value.docs.map(mapOpenLibraryDocToBook).filter((b): b is Book => b !== null);
        books.forEach(book => addOrMergeBook(book, allBooks));
    } else {
        console.error("Open Library API failed or returned no items:", openLibraryResult.status === 'rejected' ? openLibraryResult.reason : 'No docs');
    }
    
    return Array.from(allBooks.values());
}


/**
 * Fetches popular/trending books from multiple APIs.
 * @returns A promise that resolves to an array of popular books.
 */
export const getPopularBooks = async (): Promise<Book[]> => {
  const query = "new york times best sellers fiction";
  try {
    return await fetchFromMultipleSources(query);
  } catch (error) {
    console.error("Error fetching popular books:", error);
    throw new Error("Failed to fetch popular books.");
  }
};


/**
 * Generates personalized book recommendations using Gemini and multiple book APIs.
 * @param preferences - The user's preferences.
 * @returns A promise that resolves to a sorted array of recommended books.
 */
export const getPersonalizedRecommendations = async (
  preferences: UserPreferences,
): Promise<Book[]> => {

  const prompt = `
    Based on this user profile, generate a single, effective search query string for book APIs to find relevant books. The query should be a combination of keywords related to genres, themes, and interests. Do not use special operators like "inauthor:" or "intitle:". Just provide a natural string of keywords.

    User Profile:
    - Favorite Genres/Story Types: "${preferences.genres}"
    - Current Mood/State of Mind: "${preferences.mood}"
    - Hobbies and Interests: "${preferences.interests}"
    - Current Challenges: "${preferences.challenges}"
    - Future Goals: "${preferences.goals}"
  `;

  try {
    // Step 1: Use Gemini to get a search query
    const queryResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            search_query: {
              type: Type.STRING,
              description: 'A single, effective search query string for book APIs.',
            },
          },
          required: ['search_query']
        },
      },
    });

    const queryResult = JSON.parse(queryResponse.text.trim());
    const searchQuery = queryResult.search_query;
    
    if (!searchQuery) {
        throw new Error("Gemini did not return a search query.");
    }

    // Step 2: Use the generated query to fetch books from multiple sources
    return await fetchFromMultipleSources(searchQuery);

  } catch (error) {
    console.error("Error in recommendation service:", error);
    // Fallback to popular books if personalization fails
    console.log("Falling back to popular books.");
    return getPopularBooks();
  }
};