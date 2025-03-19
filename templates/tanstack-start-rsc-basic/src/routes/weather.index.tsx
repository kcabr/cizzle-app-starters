import { createFileRoute } from "@tanstack/react-router";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";

export const Route = createFileRoute("/weather/")({
  component: WeatherIndexPage,
});

function WeatherIndexPage() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <PublicIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Welcome to the Weather Dashboard
      </Typography>
      <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: "auto" }}>
        This dashboard demonstrates server-side rendering of weather data.
        Select a city from the list to view detailed weather information.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        All data is fetched and rendered on the server for optimal performance
        and SEO.
      </Typography>
    </Box>
  );
}
