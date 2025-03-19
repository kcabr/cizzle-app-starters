import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Typography, Box } from "@mui/material";
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
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        News Explorer
      </Typography>
      <Typography variant="body1" paragraph>
        Search for news articles or browse the latest headlines.
      </Typography>

      {/* Render nested routes (news.index.tsx, news.search.tsx, etc.) */}
      <Outlet />
    </Box>
  );
}
