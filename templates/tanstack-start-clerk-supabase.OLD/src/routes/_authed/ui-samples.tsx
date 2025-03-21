import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { theme } from "~/setup/theme.js";
// Import icons individually instead of in bulk for better tree-shaking
import Info from "@mui/icons-material/Info";
import Code from "@mui/icons-material/Code";
import Web from "@mui/icons-material/Web";
import Favorite from "@mui/icons-material/Favorite";
import Share from "@mui/icons-material/Share";
import Download from "@mui/icons-material/Download";

export const Route = createFileRoute("/_authed/ui-samples")({
  component: UISamples,
});

function UISamples() {
  const [tab, setTab] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          sx={{
            mb: 5,
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(45deg, #7b1fa2 30%, #1976d2 90%)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "white",
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Custom UI Showcase
          </Typography>
          <Typography variant="h6">
            Explore our redesigned Material UI components with custom theming
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                  borderColor: "white",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                p: 2,
                fontWeight: 600,
              },
            }}
          >
            <Tab icon={<Web />} label="UI Components" iconPosition="start" />
            <Tab icon={<Code />} label="Form Elements" iconPosition="start" />
            <Tab icon={<Info />} label="Notifications" iconPosition="start" />
          </Tabs>
        </Box>

        {tab === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                }}
              >
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Custom Buttons
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mb: 3, flexWrap: "wrap", gap: 2 }}
                >
                  <Button variant="contained" size="large">
                    Primary Action
                  </Button>
                  <Button variant="outlined" size="large">
                    Secondary Action
                  </Button>
                  <Button variant="contained" color="secondary" size="large">
                    Accent Color
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<Info />}
                  >
                    Important Action
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      color: "white",
                    }}
                    size="large"
                  >
                    Gradient Button
                  </Button>
                </Stack>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Interactive Controls
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <FormGroup row sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={<Checkbox color="secondary" defaultChecked />}
                      label="Enable Feature"
                    />
                    <FormControlLabel
                      control={<Switch color="primary" defaultChecked />}
                      label="Activate Mode"
                    />
                  </FormGroup>
                </Box>

                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Intensity Level
                </Typography>
                <Box sx={{ width: "100%", mb: 4 }}>
                  <Slider
                    defaultValue={70}
                    valueLabelDisplay="auto"
                    marks
                    step={10}
                    min={0}
                    max={100}
                  />
                </Box>

                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Tags & Chips
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
                >
                  <Chip label="Important" color="primary" variant="filled" />
                  <Chip
                    label="In Progress"
                    color="secondary"
                    variant="filled"
                  />
                  <Chip
                    label="Featured"
                    color="success"
                    variant="filled"
                    icon={<Favorite />}
                  />
                  <Chip
                    label="Shared"
                    color="info"
                    variant="filled"
                    icon={<Share />}
                    onClick={() => {}}
                  />
                  <Chip
                    label="Download"
                    color="warning"
                    variant="filled"
                    icon={<Download />}
                    onClick={() => {}}
                  />
                  <Chip
                    label="Delete"
                    color="error"
                    variant="filled"
                    onDelete={() => {}}
                  />
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Interactive Cards
              </Typography>
              <Grid container spacing={3}>
                {[
                  {
                    title: "Advanced Analytics",
                    image: "https://source.unsplash.com/random/800x600/?data",
                    description:
                      "Powerful business intelligence tools to visualize your data and extract meaningful insights.",
                  },
                  {
                    title: "Cloud Storage",
                    image: "https://source.unsplash.com/random/800x600/?cloud",
                    description:
                      "Secure and scalable cloud storage solution for all your important documents and media.",
                  },
                  {
                    title: "Mobile Optimization",
                    image: "https://source.unsplash.com/random/800x600/?mobile",
                    description:
                      "Optimize your application for mobile devices and provide a seamless user experience.",
                  },
                ].map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 16px 32px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h5"
                          component="div"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ p: 2 }}>
                        <Button size="medium" variant="text">
                          Learn More
                        </Button>
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          sx={{ ml: "auto" }}
                        >
                          Get Started
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Enhanced Text Fields
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  helperText="We'll never share your email with anyone else."
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Message"
                  multiline
                  rows={10}
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message here..."
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom fontWeight="bold">
              Selection Controls
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ minWidth: 200, mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    gutterBottom
                  >
                    Country
                  </Typography>
                  <Select defaultValue="us" fullWidth>
                    <MenuItem value="us">United States</MenuItem>
                    <MenuItem value="ca">Canada</MenuItem>
                    <MenuItem value="uk">United Kingdom</MenuItem>
                    <MenuItem value="au">Australia</MenuItem>
                    <MenuItem value="jp">Japan</MenuItem>
                  </Select>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="medium"
                    gutterBottom
                  >
                    Interests
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Technology"
                    />
                    <FormControlLabel control={<Checkbox />} label="Design" />
                    <FormControlLabel control={<Checkbox />} label="Business" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Marketing"
                    />
                  </FormGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Notification Preferences
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Email Notifications"
                  />
                  <FormControlLabel
                    control={<Switch color="secondary" />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Switch color="success" />}
                    label="SMS Notifications"
                  />
                </FormGroup>

                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {tab === 2 && (
          <Paper
            elevation={4}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Notification System
            </Typography>
            <Stack spacing={3} sx={{ mb: 4 }}>
              <Alert
                severity="success"
                variant="filled"
                sx={{ borderRadius: 2 }}
              >
                <AlertTitle>Success</AlertTitle>
                Your profile has been updated successfully!
              </Alert>
              <Alert severity="info" variant="filled" sx={{ borderRadius: 2 }}>
                <AlertTitle>Information</AlertTitle>A new version of the
                application is available.
              </Alert>
              <Alert
                severity="warning"
                variant="filled"
                sx={{ borderRadius: 2 }}
              >
                <AlertTitle>Warning</AlertTitle>
                Your subscription will expire in 7 days.
              </Alert>
              <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
                <AlertTitle>Error</AlertTitle>
                There was a problem processing your request.
              </Alert>
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom fontWeight="bold">
              Progress Indicators
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 4,
                p: 4,
              }}
            >
              <CircularProgress size={80} thickness={4} color="secondary" />
              <Typography variant="h6">Loading Content...</Typography>
              <Button
                variant="contained"
                onClick={() => setSnackbarOpen(true)}
                size="large"
                sx={{ mt: 2 }}
              >
                Show Notification
              </Button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="This is an important notification"
                action={
                  <Button
                    color="secondary"
                    size="small"
                    onClick={() => setSnackbarOpen(false)}
                  >
                    DISMISS
                  </Button>
                }
              />
            </Box>
          </Paper>
        )}
      </div>
    </ThemeProvider>
  );
}
