import { createFileRoute } from '@tanstack/react-router'
import { Typography, Paper, Box } from '@mui/material'
import { Counter, getCount } from '~/components/Counter'

export const Route = createFileRoute('/counter')({
  loader: async () => {
    return await getCount()
  },
  component: CounterPage,
})

function CounterPage() {
  const count = Route.useLoaderData()
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Persistent Counter Example
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ maxWidth: 600, textAlign: 'center', mb: 4 }}>
        This counter demonstrates server functions with file system persistence. 
        When you increment the counter, the value is stored on the server and will
        persist between page refreshes and server restarts.
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Counter initialCount={count} />
      </Paper>
    </Box>
  )
}