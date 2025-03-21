import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { NewsSearchForm } from "~/components/NewsSearchForm";
import { ArticleCard } from "~/components/ArticleCard";
import { searchNews } from "~/utils/news";
import { CustomButtonLink } from "~/components/CustomButtonLink";
import { seo } from "~/utils/seo";
import type { NewsResponse } from "~/utils/news";

export const Route = createFileRoute("/news/search")({
  component: NewsSearchPage,
  head: () => ({
    title: "Search News Articles",
    meta: [
      ...seo({
        title: "Search News Articles | TanStack Start Demo",
        description: "Search for news articles from around the world",
      }),
    ],
  }),
});

function NewsSearchPage() {
  const [searchParams, setSearchParams] = useState({
    query: "",
    page: 1,
    pageSize: 9,
  });

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["newsSearch", searchParams],
    queryFn: () => searchNews({ data: searchParams }),
    enabled: !!searchParams.query,
    gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes
  });

  const handleSearch = (query: string) => {
    setSearchParams((prev) => ({ ...prev, query, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Safely access data properties with optional chaining
  const totalResults = data?.totalResults || 0;
  const articles = data?.articles || [];

  return (
    <div className="mb-8">
      <div className="mb-4">
        <CustomButtonLink
          to="/news"
          variant="text"
          color="primary"
          className="mb-2"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          }
        >
          Back to headlines
        </CustomButtonLink>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Search News Articles
        </h2>

        <NewsSearchForm
          onSearch={handleSearch}
          initialQuery={searchParams.query}
          isLoading={isFetching}
        />

        {isLoading && searchParams.query ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-800 dark:text-red-200 mb-4">
            <p>Error: {error?.message || "Failed to load articles"}</p>
          </div>
        ) : data && searchParams.query ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Found {totalResults} results for "{searchParams.query}"
              </h3>
              {isFetching && (
                <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mb-6 pt-4"></div>

            {articles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <div key={`${article.url}-${index}`}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>

                {totalResults > searchParams.pageSize && (
                  <div className="flex justify-center mt-6">
                    <nav className="flex items-center">
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(1, searchParams.page - 1))
                        }
                        disabled={searchParams.page === 1}
                        className="mr-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Page {searchParams.page} of{" "}
                        {Math.ceil(totalResults / searchParams.pageSize)}
                      </span>
                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(
                              Math.ceil(totalResults / searchParams.pageSize),
                              searchParams.page + 1
                            )
                          )
                        }
                        disabled={
                          searchParams.page >=
                          Math.ceil(totalResults / searchParams.pageSize)
                        }
                        className="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  No articles found
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Try a different search term
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-8 text-center rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Search for news articles
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a search term above to find articles from around the world
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
