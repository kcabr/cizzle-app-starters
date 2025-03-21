import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Divider,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "~/utils/createEmotionCache.js";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "~/setup/theme.js";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Speed from "@mui/icons-material/Speed";
import Security from "@mui/icons-material/Security";
import Code from "@mui/icons-material/Code";

// Create a client-side cache for Emotion
const clientSideEmotionCache = createEmotionCache();

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="slide-up">
        {/* Hero Section */}
        <Box
          sx={{
            pt: 8,
            pb: 12,
            mb: 8,
            borderRadius: 4,
            background: "linear-gradient(135deg, #7b1fa2 0%, #4527a0 100%)",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Abstract shapes for background */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -80,
              left: -80,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              px: { xs: 2, sm: 6, md: 8 },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              fontWeight="800"
              gutterBottom
            >
              Welcome to AppSuite
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, maxWidth: 800, mx: "auto", opacity: 0.9 }}
            >
              A modern application starter with TanStack Router, Material UI,
              Clerk authentication, and Supabase integration
            </Typography>
            <Box
              sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Button
                component={Link}
                to="/ui-samples"
                variant="contained"
                size="large"
                color="secondary"
                endIcon={<ChevronRight />}
                sx={{ px: 4, py: 1.5, borderRadius: 3 }}
              >
                Explore UI Components
              </Button>
              <Button
                component="a"
                href="https://clerk.com"
                target="_blank"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderColor: "white",
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Features Section */}
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Key Features
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              title: "Modern Stack",
              description:
                "Built with React 19, TanStack Router, and Material UI 6 for a cutting-edge development experience.",
              icon: <Code sx={{ fontSize: 40 }} />,
              color: "primary.main",
            },
            {
              title: "Authentication",
              description:
                "Seamless authentication flow powered by Clerk with support for social logins and multi-factor authentication.",
              icon: <Security sx={{ fontSize: 40 }} />,
              color: "secondary.main",
            },
            {
              title: "Performance",
              description:
                "Optimized for speed with efficient data fetching using TanStack Query and built-in Supabase integration.",
              icon: <Speed sx={{ fontSize: 40 }} />,
              color: "info.main",
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: "50%",
                    color: feature.color,
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  gutterBottom
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Getting started section */}
        <Box
          sx={{
            borderRadius: 4,
            p: 4,
            mb: 8,
            backgroundColor: "rgba(0,0,0,0.02)",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 4, textAlign: "center" }}
          >
            Getting Started
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 3, textAlign: "center", maxWidth: 800, mx: "auto" }}
          >
            Jump right in and explore the different sections of the application.
            Sign in to access protected routes and features.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {[
              {
                title: "Posts",
                path: "/posts",
                description: "Explore the posts section with CRUD operations",
              },
              {
                title: "Todos",
                path: "/todos",
                description: "Manage your tasks in the todos section",
              },
              {
                title: "Notes",
                path: "/notes",
                description: "Create and organize your notes",
              },
              {
                title: "UI Components",
                path: "/ui-samples",
                description: "Explore the UI component library",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  variant="elevation"
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={item.path}
                      size="small"
                      endIcon={<ChevronRight />}
                    >
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ textAlign: "center", mb: 4, opacity: 0.7 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} AppSuite - Built with TanStack Router,
            Material UI, Clerk & Supabase
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
