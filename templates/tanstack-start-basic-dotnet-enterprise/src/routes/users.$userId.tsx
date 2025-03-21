import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Avatar, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material'
import { blue, green, purple, red, orange } from '@mui/material/colors'
import { NotFound } from '~/components/NotFound'
import { UserErrorComponent } from '~/components/UserError'
import { userQueryOptions } from '~/utils/users'
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

export const Route = createFileRoute('/users/$userId')({
  loader: async ({ params: { userId }, context }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId))
  },
  errorComponent: UserErrorComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>
  },
})

// Helper to generate consistent avatar colors based on user ID
const getAvatarColor = (id: number | string) => {
  const colors = [blue[700], green[700], purple[700], red[700], orange[700]];
  const numericId = typeof id === 'string' ? parseInt(id) || 0 : id;
  return colors[numericId % colors.length];
}

function UserComponent() {
  const { userId } = Route.useParams()
  const userQuery = useSuspenseQuery(userQueryOptions(userId))
  const user = userQuery.data

  return (
    <Box>
      <Card variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2,
              bgcolor: getAvatarColor(user.id),
              fontSize: '2.5rem'
            }}
          >
            {user.name.substring(0, 1)}
          </Avatar>
          
          <Typography variant="h4" gutterBottom>
            {user.name}
          </Typography>
          
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            User ID: {user.id}
          </Typography>
          
          <Divider sx={{ my: 2, width: '100%' }} />
          
          <Box sx={{ width: '100%' }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={user.email} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Username" 
                  secondary={user.name.toLowerCase().replace(/\s/g, '_')} 
                />
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
