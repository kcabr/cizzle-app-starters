import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  CssBaseline,
  Tooltip,
  Avatar,
  Container,
  ThemeProvider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  PostAdd,
  Note,
  FormatListBulleted,
  Dashboard,
} from "@mui/icons-material";
import { Link, useRouter } from "@tanstack/react-router";
import { theme } from "~/setup/theme.js";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "~/utils/createEmotionCache.js";

// Create a client-side cache for Emotion
const clientSideEmotionCache = createEmotionCache();

const DRAWER_WIDTH = 240;

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home", icon: <Home />, exact: true },
  { path: "/posts", label: "Posts", icon: <PostAdd /> },
  { path: "/todos", label: "Todos", icon: <FormatListBulleted /> },
  { path: "/notes", label: "Notes", icon: <Note /> },
  { path: "/deferred", label: "Deferred", icon: <Dashboard /> },
  { path: "/ui-samples", label: "UI Samples", icon: <Dashboard /> },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          App
          <Box component="span" sx={{ color: "secondary.main" }}>
            Suite
          </Box>
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? router.state.location.pathname === item.path
            : router.state.location.pathname.startsWith(item.path);

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  my: 0.5,
                  mx: 1,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{
            height: 48,
            justifyContent: "flex-start",
            pl: 2,
            borderRadius: 2,
          }}
        >
          Help & Support
        </Button>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={clientSideEmotionCache}>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />

          {/* App Bar */}
          <AppBar
            position="fixed"
            sx={{
              width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
              ml: { md: `${DRAWER_WIDTH}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "bold",
                }}
              >
                Welcome to AppSuite
              </Typography>

              <Box sx={{ flexGrow: 1 }} />

              <Box>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ borderRadius: 8 }}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Drawer */}
          <Box
            component="nav"
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: DRAWER_WIDTH,
                  borderRight: "none",
                  boxShadow: 3,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", md: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: DRAWER_WIDTH,
                  borderRight: "none",
                  boxShadow: 3,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Toolbar /> {/* This creates space for the fixed AppBar */}
            <Container
              maxWidth="xl"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </Container>
          </Box>
        </Box>
      </CacheProvider>
    </ThemeProvider>
  );
}
