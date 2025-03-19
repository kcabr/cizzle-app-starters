import { Button, Stack, Typography, Paper, Box } from "@mui/material";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

interface TestResponse {
  message?: string;
  error?: string;
}

export const Route = createFileRoute("/test")({
  component: TestPage,
});

function TestPage() {
  const [getResult, setGetResult] = useState<TestResponse | null>(null);
  const [postResult, setPostResult] = useState<TestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testGet = async () => {
    try {
      setError(null);
      const response = await fetch("/dotnetapi/WeatherForecast");
      const data = await response.json();
      setGetResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to make GET request"
      );
    }
  };

  const testPost = async () => {
    try {
      setError(null);
      const response = await fetch("/dotnetapi/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Hello from the client!" }),
      });
      const data = await response.json();
      setPostResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to make POST request"
      );
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        API Proxy Test Page
      </Typography>

      <Stack spacing={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            GET Request Test
          </Typography>
          <Stack spacing={2}>
            <Button variant="contained" onClick={testGet}>
              Test GET Request
            </Button>
            {getResult && (
              <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
                <Typography variant="body1" component="pre">
                  {JSON.stringify(getResult, null, 2)}
                </Typography>
              </Paper>
            )}
          </Stack>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            POST Request Test
          </Typography>
          <Stack spacing={2}>
            <Button variant="contained" onClick={testPost}>
              Test POST Request
            </Button>
            {postResult && (
              <Paper sx={{ p: 2, bgcolor: "action.hover" }}>
                <Typography variant="body1" component="pre">
                  {JSON.stringify(postResult, null, 2)}
                </Typography>
              </Paper>
            )}
          </Stack>
        </Paper>

        {error && (
          <Paper sx={{ p: 2, bgcolor: "error.light" }}>
            <Typography color="error" variant="body1">
              Error: {error}
            </Typography>
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
