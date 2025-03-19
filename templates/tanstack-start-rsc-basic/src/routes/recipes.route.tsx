import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  allRecipesQueryOptions,
  searchRecipesQueryOptions,
} from "../utils/recipes";
import { CustomLink } from "~/components/CustomLink";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export const Route = createFileRoute("/recipes")({
  loader: async ({ context }) => {
    // Prefetch recipes data on the server
    await context.queryClient.ensureQueryData(allRecipesQueryOptions());
  },
  component: RecipesLayoutComponent,
});

// Helper to get difficulty color
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "default";
  }
};

function RecipesLayoutComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  // Use search query if available, otherwise use all recipes
  const queryOptions = searchQuery
    ? searchRecipesQueryOptions(searchQuery)
    : allRecipesQueryOptions();

  const recipesQuery = useSuspenseQuery(queryOptions);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Recipe Explorer
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Discover delicious recipes with server-side rendering for optimal
        performance
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search recipes by name, description or tags..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {searchQuery
                ? `Search Results: ${recipesQuery.data.length} recipe(s) found`
                : "All Recipes"}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {recipesQuery.data.map((recipe) => (
              <Grid item xs={12} sm={6} key={recipe.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.imageUrl}
                    alt={recipe.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <CustomLink
                      to="/recipes/$recipeId"
                      params={{ recipeId: recipe.id }}
                      sx={{
                        color: "text.primary",
                        textDecoration: "none",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <Typography variant="h6" component="div" gutterBottom>
                        {recipe.title}
                      </Typography>
                    </CustomLink>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      noWrap
                    >
                      {recipe.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <AccessTimeIcon
                        fontSize="small"
                        sx={{ mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {recipe.time} min
                      </Typography>

                      <Box sx={{ mx: 1 }}>•</Box>

                      <Chip
                        label={recipe.difficulty}
                        size="small"
                        color={getDifficultyColor(recipe.difficulty) as any}
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                    </Box>

                    <Box>
                      <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        {recipe.tags.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, fontSize: "0.7rem", my: 0.25 }}
                          />
                        ))}
                        {recipe.tags.length > 3 && (
                          <Typography
                            variant="caption"
                            sx={{ alignSelf: "center" }}
                          >
                            +{recipe.tags.length - 3} more
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {recipesQuery.data.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ py: 4, textAlign: "center" }}>
                  <Typography variant="body1">
                    No recipes found matching your search.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
