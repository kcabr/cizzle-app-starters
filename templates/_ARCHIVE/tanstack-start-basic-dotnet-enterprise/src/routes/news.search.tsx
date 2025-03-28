import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { 
  Typography, 
  Box, 
  Grid, 
  Pagination, 
  Paper, 
  Alert, 
  Divider,
  CircularProgress
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { NewsSearchForm } from '~/components/NewsSearchForm'
import { ArticleCard } from '~/components/ArticleCard'
import { searchNews } from '~/utils/news'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { CustomButtonLink } from '~/components/CustomButtonLink'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/news/search')({
  component: NewsSearchPage,
  head: () => ({
    title: 'Search News Articles',
    meta: [
      ...seo({
        title: 'Search News Articles | TanStack Start Demo',
        description: 'Search for news articles from around the world',
      }),
    ],
  }),
})

function NewsSearchPage() {
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    pageSize: 9
  })
  
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['newsSearch', searchParams],
    queryFn: () => searchNews({ data: searchParams }),
    enabled: !!searchParams.query,
    keepPreviousData: true
  })

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({ ...prev, query, page: 1 }))
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <CustomButtonLink 
          to="/news/" 
          startIcon={<KeyboardBackspaceIcon />}
          variant="text"
          color="primary"
          sx={{ mb: 2 }}
        >
          Back to headlines
        </CustomButtonLink>
        
        <Typography variant="h4" component="h2" gutterBottom>
          Search News Articles
        </Typography>
        
        <NewsSearchForm 
          onSearch={handleSearch} 
          initialQuery={searchParams.query}
          isLoading={isFetching}
        />

        {isLoading && searchParams.query ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            Error: {error?.message || 'Failed to load articles'}
          </Alert>
        ) : data && searchParams.query ? (
          <>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="div">
                Found {data.totalResults} results for "{searchParams.query}"
              </Typography>
              {isFetching && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Box>
            
            <Divider sx={{ mb: 4 }} />

            {data.articles.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {data.articles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`${article.url}-${index}`}>
                      <ArticleCard article={article} />
                    </Grid>
                  ))}
                </Grid>

                {data.totalResults > searchParams.pageSize && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                      count={Math.ceil(data.totalResults / searchParams.pageSize)}
                      page={searchParams.page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6">No articles found</Typography>
                <Typography variant="body2" color="text.secondary">
                  Try a different search term
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: 'grey.100' }}>
            <Typography variant="h6" gutterBottom>
              Search for news articles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter a search term above to find articles from around the world
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  )
}