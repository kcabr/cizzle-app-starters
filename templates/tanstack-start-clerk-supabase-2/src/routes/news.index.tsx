import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "~/components/ArticleCard";
import { getTopHeadlines } from "~/utils/news";
import { CustomButtonLink } from "~/components/CustomButtonLink";

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export const Route = createFileRoute("/news/")({
  component: NewsHomePage,
  loader: async () => {
    // Preload top headlines for initial page load
    return getTopHeadlines({ data: { category: "general", pageSize: 12 } });
  },
});

function NewsHomePage() {
  const initialData = Route.useLoaderData();
  const [category, setCategory] = React.useState("general");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topHeadlines", category],
    queryFn: () => getTopHeadlines({ data: { category, pageSize: 12 } }),
    initialData: category === "general" ? initialData : undefined,
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          Top Headlines
        </h2>
        <CustomButtonLink to="/news/search" variant="contained" color="primary">
          Search Articles
        </CustomButtonLink>
      </div>

      <div className="mb-6">
        <label
          htmlFor="category-select"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-52 p-2.5"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>

      {isLoading && !data ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading headlines...
          </p>
        </div>
      ) : isError ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-800 dark:text-red-200">
          <p>Error loading headlines: {error?.message || "Unknown error"}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.articles?.map((article, index) => (
              <div key={`${article.url}-${index}`}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          {data?.articles?.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                No articles found for this category
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try selecting a different category
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
