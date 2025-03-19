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
import { blue, green, purple, red, orange } from "@mui/material/colors";
import { CustomLink } from "~/components/CustomLink";
import { usersQueryOptions } from "../utils/users";
import React from "react";

export const Route = createFileRoute("/users")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions());
  },
  component: UsersLayoutComponent,
});

// Helper to generate consistent avatar colors based on user ID
const getAvatarColor = (id: number | string) => {
  const colors = [blue[500], green[500], purple[500], red[500], orange[500]];
  const numericId = typeof id === "string" ? parseInt(id) || 0 : id;
  return colors[numericId % colors.length];
};

function UsersLayoutComponent() {
  const usersQuery = useSuspenseQuery(usersQueryOptions());

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Select a User
            </Typography>
            <List>
              {[
                ...usersQuery.data,
                { id: "i-do-not-exist", name: "Non-existent User", email: "" },
              ].map((user) => (
                <React.Fragment key={user.id}>
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
                        bgcolor: getAvatarColor(user.id),
                        width: 32,
                        height: 32,
                      }}
                    >
                      {user.name.substring(0, 1)}
                    </Avatar>
                    <CustomLink
                      to="/users/$userId"
                      params={{ userId: String(user.id) }}
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
                      {user.name}
                    </CustomLink>
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
