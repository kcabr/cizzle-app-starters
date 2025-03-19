import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Types for News API responses
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Mock data in case the API fails
const mockNewsData: NewsResponse = {
  status: "ok",
  totalResults: 3,
  articles: [
    {
      source: {
        id: "mock-news",
        name: "Mock News",
      },
      author: "John Doe",
      title: "Mock News Article 1",
      description: "This is a mock news article for testing purposes",
      url: "https://example.com/article1",
      urlToImage:
        "https://placehold.co/600x400/orange/white?text=News+Article+1",
      publishedAt: new Date().toISOString(),
      content:
        "This is the content of the mock news article for testing purposes.",
    },
    {
      source: {
        id: "mock-news",
        name: "Mock News",
      },
      author: "Jane Smith",
      title: "Mock News Article 2",
      description: "This is another mock news article for testing purposes",
      url: "https://example.com/article2",
      urlToImage: "https://placehold.co/600x400/blue/white?text=News+Article+2",
      publishedAt: new Date().toISOString(),
      content:
        "This is the content of another mock news article for testing purposes.",
    },
    {
      source: {
        id: "mock-news",
        name: "Mock News",
      },
      author: "Sam Johnson",
      title: "Mock News Article 3",
      description: "This is a third mock news article for testing purposes",
      url: "https://example.com/article3",
      urlToImage:
        "https://placehold.co/600x400/green/white?text=News+Article+3",
      publishedAt: new Date().toISOString(),
      content:
        "This is the content of a third mock news article for testing purposes.",
    },
  ],
};

// Schema for validation
const SearchParamsSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

// Server function to search news
export const searchNews = createServerFn({ method: "GET" })
  .validator((data: SearchParams) => SearchParamsSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const apiKey = process.env.NEWSAPI_KEY;

      if (!apiKey) {
        console.error("NEWS API key is not configured");
        return mockNewsData;
      }

      const { query, page, pageSize } = data;

      const url = new URL("https://newsapi.org/v2/everything");
      url.searchParams.append("q", query);
      url.searchParams.append("page", page.toString());
      url.searchParams.append("pageSize", pageSize.toString());
      url.searchParams.append("language", "en");
      url.searchParams.append("sortBy", "publishedAt");

      const response = await fetch(url.toString(), {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`News API error: ${response.status} - ${errorText}`);
        return mockNewsData;
      }

      const responseData: NewsResponse = await response.json();
      console.log("Search News API Response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error in searchNews:", error);
      return mockNewsData;
    }
  });

// Server function to fetch top headlines
export const getTopHeadlines = createServerFn({ method: "GET" })
  .validator(
    (data: { country?: string; category?: string; pageSize?: number }) => {
      return {
        country: data.country || "us",
        category: data.category || "general",
        pageSize: data.pageSize || 10,
      };
    }
  )
  .handler(async ({ data }) => {
    try {
      const apiKey = process.env.NEWSAPI_KEY;

      if (!apiKey) {
        console.error("NEWS API key is not configured");
        return mockNewsData;
      }

      const { country, category, pageSize } = data;

      console.log("Getting top headlines with:", {
        country,
        category,
        pageSize,
      });

      const url = new URL("https://newsapi.org/v2/top-headlines");
      url.searchParams.append("country", country);
      url.searchParams.append("category", category);
      url.searchParams.append("pageSize", pageSize.toString());

      const response = await fetch(url.toString(), {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`News API error: ${response.status} - ${errorText}`);
        return mockNewsData;
      }

      const responseData: NewsResponse = await response.json();
      console.log("Top Headlines API Response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error in getTopHeadlines:", error);
      return mockNewsData;
    }
  });
