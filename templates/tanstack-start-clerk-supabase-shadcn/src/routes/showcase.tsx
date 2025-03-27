import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AccentButton } from "../components/AccentButton";

export const Route = createFileRoute("/showcase")({
  component: Showcase,
});

function Showcase() {
  return (
    <div className="container py-10 mx-auto">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Feature Showcase
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore the different features and components available in this
            template
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl mt-8">
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
            <FeatureCard
              title="UI Components"
              description="Explore the shadcn UI components available in this template."
              link="/ui-showcase"
              isHighlighted={true}
            />
            <FeatureCard
              title="Test"
              description="A test page for development and experimentation."
              link="/test"
            />
            <FeatureCard
              title="Form"
              description="Example form implementation using TanStack Form."
              link="/form"
            />
            <FeatureCard
              title="User Info"
              description="View detailed user information and settings."
              link="/user-info"
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
  isHighlighted = false,
}: {
  title: string;
  description: string;
  link: string;
  onClick?: () => void;
  isHighlighted?: boolean;
}) {
  const content = (
    <Card
      className={`h-full transition-all hover:shadow-md ${isHighlighted ? "border-primary" : ""}`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <AccentButton to={link} isHighlighted={isHighlighted}>
          Explore
        </AccentButton>
      </CardFooter>
    </Card>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left block w-full">
        {content}
      </button>
    );
  }

  return <div className="block w-full">{content}</div>;
}
