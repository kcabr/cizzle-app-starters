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
} from "@mui/material";
import React from "react";
import { CustomLink } from "~/components/CustomLink";
import { postsQueryOptions } from "../utils/posts";

export const Route = createFileRoute("/posts")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(postsQueryOptions());
  },
  component: PostsLayoutComponent,
});

function PostsLayoutComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions());

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Posts
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Select a Post
            </Typography>
            <List>
              {[
                ...postsQuery.data,
                { id: "i-do-not-exist", title: "Non-existent Post" },
              ].map((post) => (
                <React.Fragment key={post.id}>
                  <ListItem disablePadding>
                    <CustomLink
                      to="/posts/$postId"
                      params={{ postId: post.id }}
                      sx={{
                        display: "block",
                        py: 1,
                        "&:hover": { color: "primary.main" },
                      }}
                      activeProps={{
                        sx: {
                          fontWeight: "bold",
                          color: "primary.main",
                        },
                      }}
                    >
                      {post.title.substring(0, 30)}
                      {post.title.length > 30 ? "..." : ""}
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
