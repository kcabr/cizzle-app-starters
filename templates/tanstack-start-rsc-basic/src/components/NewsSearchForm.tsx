import React, { useState } from 'react'
import { Box, TextField, Button, InputAdornment, Grid, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface NewsSearchFormProps {
  onSearch: (query: string) => void
  initialQuery?: string
  isLoading?: boolean
}

export function NewsSearchForm({ onSearch, initialQuery = '', isLoading = false }: NewsSearchFormProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <Paper 
      component="form" 
      elevation={2}
      onSubmit={handleSubmit}
      sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 2
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for news articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading || !query.trim()}
            sx={{ height: '56px' }}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}