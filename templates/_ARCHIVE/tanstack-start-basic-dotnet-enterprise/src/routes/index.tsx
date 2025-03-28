import { createFileRoute } from "@tanstack/react-router";
import { Box, Typography, Grid, Paper, Stack } from "@mui/material";
import { CustomButtonLink } from "~/components/CustomButtonLink";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Cizzle's Enterprise TanStack Starter
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        A comprehensive Tanstack Start starting point combining Material UI,
        React Query, React Server Components, and modern best practies all to be
        used for Enterprise Apps.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                Weather Dashboard
              </Typography>
              <Typography paragraph>
                Explore real-time weather data with server-side rendering for
                optimal performance. View detailed weather information for
                cities around the world.
              </Typography>
              <CustomButtonLink
                to="/weather"
                variant="contained"
                color="primary"
              >
                Open Weather Dashboard
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                Recipe Explorer
              </Typography>
              <Typography paragraph>
                Discover delicious recipes with server-side rendering and
                client-side search. Detailed recipe instructions and ingredients
                with beautiful UI.
              </Typography>
              <CustomButtonLink
                to="/recipes"
                variant="contained"
                color="secondary"
              >
                Browse Recipes
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                Stock Market Tracker
              </Typography>
              <Typography paragraph>
                Track stock market data with server-side rendering and
                client-side sorting/filtering. Interactive stock details with
                visual indicators for price movements.
              </Typography>
              <CustomButtonLink
                to="/stocks"
                variant="contained"
                color="success"
              >
                View Stock Market
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                News Explorer
              </Typography>
              <Typography paragraph>
                Browse top headlines and search for news articles from around
                the world. This demo showcases API integration, search
                functionality, and pagination.
              </Typography>
              <CustomButtonLink to="/news" variant="contained" color="primary">
                Explore News Articles
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                Material UI Integration
              </Typography>
              <Typography paragraph>
                This project demonstrates Material UI integration with TanStack
                Start, including theme setup, custom link components, and
                consistent styling.
              </Typography>
              <CustomButtonLink
                to="/counter"
                variant="contained"
                color="secondary"
              >
                Try the Material UI Counter
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                React Query Integration
              </Typography>
              <Typography paragraph>
                See how React Query is integrated with TanStack Router for
                efficient data fetching, caching, and state management.
              </Typography>
              <CustomButtonLink
                to="/posts"
                variant="contained"
                color="secondary"
              >
                Explore Posts with React Query
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                Server Functions & Persistence
              </Typography>
              <Typography paragraph>
                Experience server functions with persistent data storage using
                the file system, demonstrating full-stack capabilities.
              </Typography>
              <CustomButtonLink
                to="/counter"
                variant="contained"
                color="success"
              >
                Try the Persistent Counter
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h2">
                Deferred Data & Suspense
              </Typography>
              <Typography paragraph>
                See how TanStack Start handles deferred data loading and
                suspense for a smoother user experience with asynchronous
                operations.
              </Typography>
              <CustomButtonLink
                to="/deferred"
                variant="contained"
                color="warning"
              >
                View Deferred Example
              </CustomButtonLink>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
