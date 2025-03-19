import { createFileRoute } from "@tanstack/react-router";
import { Box, Typography, Paper } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export const Route = createFileRoute("/recipes/")({
  component: RecipesIndexPage,
});

function RecipesIndexPage() {
  return (
    <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
      <Box sx={{ textAlign: "center", py: 2 }}>
        <RestaurantIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Welcome to Recipe Explorer
        </Typography>
        <Typography variant="body1" paragraph>
          Browse our collection of delicious recipes from around the world. All
          recipe data is server-side rendered for optimal performance.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a recipe from the list to view detailed instructions and
          ingredients.
        </Typography>
      </Box>
    </Paper>
  );
}
