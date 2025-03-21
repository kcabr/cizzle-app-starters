import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Welcome to Cizzle's TanStack Starter App Template
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Todos"
              description="Manage your todos with a simple CRUD interface. Uses Prisma ORM with Supabase."
              link="/todos"
            />
            <FeatureCard
              title="Notes"
              description="Create and manage your notes. Demonstrates RSC (React Server Components)."
              link="/notes"
            />
            <FeatureCard
              title="Counter"
              description="Simple counter example. Shows Redux Toolkit for state management."
              link="/counter"
            />
            <FeatureCard
              title="Posts"
              description="Post list from API. Uses React Query for data fetching."
              link="/posts"
            />
            <FeatureCard
              title="Profile"
              description="Authenticated user profile. Shows integration with Clerk authentication."
              link="/profile"
            />
            <FeatureCard
              title="News"
              description="Browse and search news articles. Shows React Query and external API integration."
              link="/news"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  link,
  onClick,
}: {
  title: string;
  description: string;
  link: string;
  onClick?: () => void;
}) {
  const content = (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mt-4">
        <span className="inline-flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Explore
          </span>
        </span>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left">
        {content}
      </button>
    );
  }

  return (
    <Link to={link} className="block">
      {content}
    </Link>
  );
}
