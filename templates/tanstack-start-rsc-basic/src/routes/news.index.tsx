import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  Chip,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
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

  // Add debugging information
  console.log("News Page Data:", data);
  console.log("Initial Data:", initialData);
  console.log("Loading:", isLoading);
  console.log("Error:", isError, error);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h2">
          Top Headlines
        </Typography>
        <CustomButtonLink to="/news/search" variant="contained" color="primary">
          Search Articles
        </CustomButtonLink>
      </Box>

      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem
                key={cat}
                value={cat}
                sx={{ textTransform: "capitalize" }}
              >
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isLoading && !data ? (
        <Typography>Loading headlines...</Typography>
      ) : isError ? (
        <Paper
          sx={{ p: 3, bgcolor: "error.light", color: "error.contrastText" }}
        >
          <Typography>
            Error loading headlines: {error?.message || "Unknown error"}
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {data?.articles?.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${article.url}-${index}`}>
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>

          {data?.articles?.length === 0 && (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography variant="h6">
                No articles found for this category
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try selecting a different category
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
