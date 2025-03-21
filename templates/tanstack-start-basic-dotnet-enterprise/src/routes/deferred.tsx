import { Await, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Suspense, useState } from 'react'
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  LinearProgress,
  Button, 
  Card, 
  CardContent,
  Skeleton,
  Divider,
  Chip
} from '@mui/material'

// Fast server function
const personServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(({ data: name }) => {
    return { name, randomNumber: Math.floor(Math.random() * 100) }
  })

// Slow server function (1 second delay)
const slowServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(async ({ data: name }) => {
    await new Promise((r) => setTimeout(r, 1000))
    return { name, randomNumber: Math.floor(Math.random() * 100) }
  })

// Very slow server function (3 seconds delay)
const verySlowServerFn = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(async ({ data: name }) => {
    await new Promise((r) => setTimeout(r, 3000))
    return { 
      name, 
      randomNumber: Math.floor(Math.random() * 100),
      message: "This data took 3 seconds to load!" 
    }
  })

export const Route = createFileRoute('/deferred')({
  loader: async () => {
    return {
      deferredMessage: new Promise<string>((r) =>
        setTimeout(() => r('This content arrived after 2 seconds'), 2000),
      ),
      deferredPerson: slowServerFn({ data: 'Tanner Linsley' }),
      verySlowPerson: verySlowServerFn({ data: 'Alice Johnson' }),
      person: await personServerFn({ data: 'John Doe' }),
    }
  },
  component: Deferred,
})

function Deferred() {
  const [count, setCount] = useState(0)
  const { deferredMessage, deferredPerson, verySlowPerson, person } = Route.useLoaderData()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Deferred Loading & Suspense
      </Typography>
      
      <Typography variant="body1" paragraph>
        This example demonstrates Suspense and deferred data loading. The UI remains interactive
        while data is loading. Click the button below to test.
      </Typography>
      
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Counter: {count}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setCount(count + 1)}
          sx={{ mb: 2 }}
        >
          Increment
        </Button>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Grid container spacing={3}>
        {/* Instant data (no suspense needed) */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Instant Data
              </Typography>
              <Chip label="Loaded immediately" color="success" size="small" sx={{ mb: 2 }} />
              <Typography variant="body1">
                <strong>{person.name}</strong> - {person.randomNumber}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This data loaded synchronously during the initial request
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 1-second deferred person data */}
        <Grid item xs={12} md={4}>
          <Suspense fallback={
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  1-Second Delay
                </Typography>
                <Chip label="Loading..." color="warning" size="small" sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
                <LinearProgress />
              </CardContent>
            </Card>
          }>
            <Await
              promise={deferredPerson}
              children={(data) => (
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      1-Second Delay
                    </Typography>
                    <Chip label="Loaded after 1s" color="success" size="small" sx={{ mb: 2 }} />
                    <Typography variant="body1">
                      <strong>{data.name}</strong> - {data.randomNumber}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      This data arrived 1 second after the initial request
                    </Typography>
                  </CardContent>
                </Card>
              )}
            />
          </Suspense>
        </Grid>
        
        {/* 2-second deferred message */}
        <Grid item xs={12} md={4}>
          <Suspense fallback={
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  2-Second Delay
                </Typography>
                <Chip label="Loading..." color="warning" size="small" sx={{ mb: 2 }} />
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="95%" />
                </Box>
                <LinearProgress />
              </CardContent>
            </Card>
          }>
            <Await
              promise={deferredMessage}
              children={(data) => (
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      2-Second Delay
                    </Typography>
                    <Chip label="Loaded after 2s" color="success" size="small" sx={{ mb: 2 }} />
                    <Typography variant="body1">
                      "{data}"
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      This message arrived 2 seconds after the initial request
                    </Typography>
                  </CardContent>
                </Card>
              )}
            />
          </Suspense>
        </Grid>
        
        {/* 3-second very slow data */}
        <Grid item xs={12}>
          <Suspense fallback={
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Very Slow Data (3-Second Delay)
              </Typography>
              <Chip label="Loading..." color="warning" size="small" sx={{ mb: 2 }} />
              <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
              </Box>
              <LinearProgress color="secondary" sx={{ mt: 2 }} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                This component is still loading but the rest of the UI remains interactive
              </Typography>
            </Paper>
          }>
            <Await
              promise={verySlowPerson}
              children={(data) => (
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Very Slow Data (3-Second Delay)
                  </Typography>
                  <Chip label="Loaded after 3s" color="success" size="small" sx={{ mb: 2 }} />
                  <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="h5">
                      <strong>{data.name}</strong> - {data.randomNumber}
                    </Typography>
                    <Typography variant="body1" color="secondary" sx={{ mt: 2 }}>
                      {data.message}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    This component arrived 3 seconds after the initial request, while the UI remained fully interactive
                  </Typography>
                </Paper>
              )}
            />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}
