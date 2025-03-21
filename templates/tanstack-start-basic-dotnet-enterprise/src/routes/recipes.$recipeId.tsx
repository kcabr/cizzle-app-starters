import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Grid,
} from "@mui/material";
import { recipeByIdQueryOptions } from "../utils/recipes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EventIcon from "@mui/icons-material/Event";

export const Route = createFileRoute("/recipes/$recipeId")({
  loader: async ({ context, params }) => {
    try {
      // Prefetch recipe data on the server
      await context.queryClient.ensureQueryData(
        recipeByIdQueryOptions(params.recipeId)
      );
      return { notFound: false };
    } catch (error) {
      // Handle not found case
      return { notFound: true, error: String(error) };
    }
  },
  component: RecipeDetailPage,
});

// Format the date in a human-readable way
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

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

function RecipeDetailPage() {
  const { notFound, error } = Route.useLoaderData();
  const { recipeId } = Route.useParams();

  if (notFound) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          Recipe not found. Error: {error}
        </Alert>
      </Paper>
    );
  }

  const recipeQuery = useSuspenseQuery(recipeByIdQueryOptions(recipeId));
  const recipe = recipeQuery.data;

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={recipe.imageUrl}
          alt={recipe.title}
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 1,
            mb: 2,
          }}
        />

        <Typography variant="h5" component="h2" gutterBottom>
          {recipe.title}
        </Typography>

        <Typography variant="body1" paragraph>
          {recipe.description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon
                fontSize="small"
                sx={{ mr: 1, color: "text.secondary" }}
              />
              <Typography variant="body2">
                Time: {recipe.time} minutes
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                label={recipe.difficulty}
                size="small"
                color={getDifficultyColor(recipe.difficulty) as any}
                sx={{ mr: 1 }}
              />
              <Typography variant="body2">Difficulty</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <PersonIcon
            fontSize="small"
            sx={{ mr: 1, color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            By {recipe.authorName}
          </Typography>

          <Box sx={{ mx: 1, color: "text.secondary" }}>•</Box>

          <EventIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {formatDate(recipe.createdAt)}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, flexWrap: "wrap", gap: 0.5 }}
        >
          {recipe.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <ListAltIcon sx={{ mr: 1 }} />
            Ingredients
          </Typography>
          <List dense disablePadding>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <FiberManualRecordIcon
                    fontSize="small"
                    color="primary"
                    sx={{ fontSize: 8 }}
                  />
                </ListItemIcon>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <CheckCircleOutlineIcon sx={{ mr: 1 }} />
            Instructions
          </Typography>
          <List>
            {recipe.instructions.map((step, index) => (
              <ListItem
                key={index}
                disableGutters
                sx={{ alignItems: "flex-start", mb: 1 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  );
}
