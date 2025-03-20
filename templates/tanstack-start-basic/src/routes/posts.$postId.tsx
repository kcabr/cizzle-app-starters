import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Typography, Box, Button } from '@mui/material'
import { NotFound } from '~/components/NotFound'
import { PostErrorComponent } from '~/components/PostError'
import { CustomButtonLink } from '~/components/CustomButtonLink'
import { postQueryOptions } from '~/utils/posts'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params: { postId }, context }) => {
    await context.queryClient.ensureQueryData(postQueryOptions(postId))
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>
  },
})

function PostComponent() {
  const { postId } = Route.useParams()
  const postQuery = useSuspenseQuery(postQueryOptions(postId))
  const post = postQuery.data

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {post.title}
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ my: 3 }}>
        {post.body}
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <CustomButtonLink
          to="/posts/$postId/deep"
          params={{ postId: post.id }}
          variant="outlined"
          color="primary"
          size="small"
        >
          Deep View
        </CustomButtonLink>
      </Box>
    </Box>
  )
}
