import { Outlet, createFileRoute } from "@tanstack/react-router";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/news")({
  component: NewsLayout,
  head: () => ({
    title: "News Explorer",
    meta: [
      ...seo({
        title: "News Explorer | TanStack Start Demo",
        description: "Search and explore news articles from around the world",
      }),
    ],
  }),
});

function NewsLayout() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          News Explorer
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Search for news articles or browse the latest headlines.
        </p>

        {/* Render nested routes (news/index.tsx, news/search.tsx, etc.) */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
