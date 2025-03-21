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
<<<<<<< HEAD
import { AccentButton } from "../components/AccentButton";
=======
import { Button } from "../components/ui/button";
>>>>>>> 244fa0178de7925d6210540188464ce118f8937e

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="container py-10 mx-auto">
      <header>
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to Cizzle's TanStack Starter App Template
          </h1>
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
<<<<<<< HEAD
        <AccentButton to={link} isHighlighted={isHighlighted}>
          Explore
        </AccentButton>
=======
        <Button
          className={
            isHighlighted
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          }
        >
          Explore
        </Button>
>>>>>>> 244fa0178de7925d6210540188464ce118f8937e
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

<<<<<<< HEAD
  return <div className="block w-full">{content}</div>;
=======
  return (
    <Link to={link} className="block w-full">
      {content}
    </Link>
  );
>>>>>>> 244fa0178de7925d6210540188464ce118f8937e
}
