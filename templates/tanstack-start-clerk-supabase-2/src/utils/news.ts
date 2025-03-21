import { log } from "console";
import { z } from "zod";

// Define types for NewsAPI responses
export const ArticleSchema = z.object({
  source: z.object({
    id: z.string().nullable(),
    name: z.string(),
  }),
  author: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable(),
  publishedAt: z.string(),
  content: z.string().nullable(),
});

export const NewsResponseSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  articles: z.array(ArticleSchema),
});

export type Article = z.infer<typeof ArticleSchema>;
export type NewsResponse = z.infer<typeof NewsResponseSchema>;

// Get your API key from https://newsapi.org
//const API_KEY = process.env.NEWSAPI_KEY || "";
const BASE_URL = "https://newsapi.org/v2";

interface TopHeadlinesParams {
  data: {
    category?: string;
    country?: string;
    pageSize?: number;
    page?: number;
  };
}

interface SearchParams {
  data: {
    query: string;
    pageSize?: number;
    page?: number;
    sortBy?: "relevancy" | "popularity" | "publishedAt";
  };
}

export async function getTopHeadlines({
  data,
}: TopHeadlinesParams): Promise<NewsResponse> {
  const params = new URLSearchParams({
    apiKey: "2601710ac62f4a5c800a804de80b17cb", // TODO: Hide this better but .env is not working.
    category: data.category || "general",
    country: data.country || "us",
    pageSize: (data.pageSize || 10).toString(),
    page: (data.page || 1).toString(),
  });

  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?${params.toString()}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch top headlines");
    }

    const data = await response.json();
    return NewsResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
}

export async function searchNews({
  data,
}: SearchParams): Promise<NewsResponse> {
  const params = new URLSearchParams({
    apiKey: "2601710ac62f4a5c800a804de80b17cb", // TODO: Hide this better but .env is not working.
    q: data.query,
    pageSize: (data.pageSize || 10).toString(),
    page: (data.page || 1).toString(),
    sortBy: data.sortBy || "publishedAt",
  });

  try {
    const response = await fetch(`${BASE_URL}/everything?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to search news");
    }

    const data = await response.json();
    return NewsResponseSchema.parse(data);
  } catch (error) {
    console.error("Error searching news:", error);
    throw error;
  }
}
