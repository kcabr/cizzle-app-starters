import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Typography, Box, Breadcrumbs } from '@mui/material'
import { CustomLink } from '~/components/CustomLink'
import { PostErrorComponent } from '~/components/PostError'
import { postQueryOptions } from '~/utils/posts'

export const Route = createFileRoute('/posts_/$postId/deep')({
  loader: async ({ params: { postId }, context }) => {
    await context.queryClient.ensureQueryData(postQueryOptions(postId))
  },
  errorComponent: PostErrorComponent,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const { postId } = Route.useParams()
  const postQuery = useSuspenseQuery(postQueryOptions(postId))
  const post = postQuery.data

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <CustomLink to="/posts" color="inherit">
          Posts
        </CustomLink>
        <CustomLink to="/posts/$postId" params={{ postId }} color="inherit">
          Post
        </CustomLink>
        <Typography color="text.primary">Deep View</Typography>
      </Breadcrumbs>
      
      <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {post.title}
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ my: 3 }}>
          {post.body}
        </Typography>
        
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" display="block">
            Post ID: {post.id}
          </Typography>
          <Typography variant="caption" display="block">
            Word count: {post.body.split(' ').length}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
