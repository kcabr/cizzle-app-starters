import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Typography,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  Divider,
  Avatar,
} from "@mui/material";
import {
  blue,
  green,
  purple,
  red,
  orange,
  yellow,
  cyan,
} from "@mui/material/colors";
import { CustomLink } from "~/components/CustomLink";
import { weatherDataQueryOptions } from "../utils/weather";
import React from "react";
import AirIcon from "@mui/icons-material/Air";
import OpacityIcon from "@mui/icons-material/Opacity";
import PublicIcon from "@mui/icons-material/Public";

export const Route = createFileRoute("/weather")({
  loader: async ({ context }) => {
    // Prefetch data on server
    await context.queryClient.ensureQueryData(weatherDataQueryOptions());
  },
  component: WeatherLayoutComponent,
});

// Helper to get weather icon color
const getWeatherColor = (conditions: string) => {
  switch (conditions.toLowerCase()) {
    case "sunny":
    case "clear":
      return yellow[700];
    case "partly cloudy":
      return blue[300];
    case "cloudy":
      return blue[200];
    case "rainy":
      return cyan[700];
    default:
      return blue[500];
  }
};

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

function WeatherLayoutComponent() {
  const weatherQuery = useSuspenseQuery(weatherDataQueryOptions());

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Weather Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Server-side rendered weather information with city details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Select a City
            </Typography>
            <List>
              {weatherQuery.data.map((cityData) => (
                <React.Fragment key={cityData.id}>
                  <ListItem
                    disablePadding
                    sx={{
                      display: "flex",
                      py: 1,
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        mr: 2,
                        bgcolor: getWeatherColor(cityData.conditions),
                        width: 32,
                        height: 32,
                      }}
                    >
                      {getWeatherIcon(cityData.conditions)}
                    </Avatar>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CustomLink
                        to="/weather/$cityId"
                        params={{ cityId: cityData.id }}
                        sx={{
                          display: "block",
                          "&:hover": { color: "primary.main" },
                        }}
                        activeProps={{
                          sx: {
                            fontWeight: "bold",
                            color: "primary.main",
                          },
                        }}
                      >
                        {cityData.city}, {cityData.country}
                      </CustomLink>
                      <Typography variant="caption" color="text.secondary">
                        {cityData.temperature}°C | {cityData.conditions}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, minHeight: 400 }}>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
