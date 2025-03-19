import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material'
import { CustomLink } from './CustomLink'
import type { NewsArticle } from '~/utils/news'

interface ArticleCardProps {
  article: NewsArticle
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {article.urlToImage ? (
        <CardMedia
          component="img"
          height="200"
          image={article.urlToImage}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box 
          sx={{ 
            height: 200, 
            bgcolor: 'grey.200', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No image available
          </Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {article.source.name} • {formattedDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description || 'No description available'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary" 
          component="a" 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}