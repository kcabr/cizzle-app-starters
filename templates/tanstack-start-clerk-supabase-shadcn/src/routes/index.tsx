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
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
          YOUR BIG TEXT SAAS SERVICE
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mb-10">
          This is the subtext describing your amazing service. Explain the core
          value proposition here briefly and compellingly.
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="px-8 py-6 text-lg">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
