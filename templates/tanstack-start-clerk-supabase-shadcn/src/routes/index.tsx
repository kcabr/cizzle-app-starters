import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container py-16 mx-auto text-center">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-400">
          Your Next Big SaaS
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mb-10">
          TanStack Start/Router/Form . TypeScript . Clerk . Supabase/Prisma .
          Stripe . shadcn/ui . ag-grid
        </p>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mb-10">
          A production-ready full-stack starter for building modern web
          applications with best practices baked in.
        </p>
        <div className="flex gap-4">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
          >
            Get Started
          </Button>
          <Link to="/showcase">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-indigo-400 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
