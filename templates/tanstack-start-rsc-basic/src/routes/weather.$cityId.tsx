import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
  Stack,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { cityWeatherQueryOptions } from "../utils/weather";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { blue, yellow, cyan } from "@mui/material/colors";

export const Route = createFileRoute("/weather/$cityId")({
  loader: async ({ context, params }) => {
    try {
      // Prefetch city data on the server
      await context.queryClient.ensureQueryData(
        cityWeatherQueryOptions(params.cityId)
      );
      return { notFound: false };
    } catch (error) {
      // Handle not found case
      return { notFound: true, error: String(error) };
    }
  },
  component: CityWeatherDetailPage,
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// Helper to get weather icon
const getWeatherIcon = (conditions: string) => {
  switch (conditions.toLowerCase()) {
    case "sunny":
      return "☀️";
    case "clear":
      return "🌙";
    case "partly cloudy":
      return "⛅";
    case "cloudy":
      return "☁️";
    case "rainy":
      return "🌧️";
    default:
      return "🌤️";
  }
};

function CityWeatherDetailPage() {
  const { notFound, error } = Route.useLoaderData();
  const { cityId } = Route.useParams();

  if (notFound) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Weather data not found for this city. Error: {error}
      </Alert>
    );
  }

  const cityWeatherQuery = useSuspenseQuery(cityWeatherQueryOptions(cityId));
  const cityData = cityWeatherQuery.data;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <LocationCityIcon sx={{ fontSize: 36, mr: 2, color: "primary.main" }} />
        <Typography variant="h4" component="h2">
          {cityData.city}, {cityData.country}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main weather card */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      fontSize: 64,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getWeatherIcon(cityData.conditions)}
                  </Box>
                  <Box>
                    <Typography variant="h2" sx={{ fontWeight: "bold", mb: 0 }}>
                      {cityData.temperature}°C
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {cityData.conditions}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <OpacityIcon sx={{ mr: 1, color: blue[500] }} />
                    <Typography>Humidity: {cityData.humidity}%</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AirIcon sx={{ mr: 1, color: cyan[500] }} />
                    <Typography>Wind: {cityData.windSpeed} km/h</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Last updated */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <AccessTimeIcon
              sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              Last updated: {formatDate(cityData.updatedAt)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
