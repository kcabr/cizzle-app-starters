import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Button, Typography, Box, Stack } from '@mui/material'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

export const getCount = createServerFn({ method: 'GET' }).handler(() => {
  return readCount()
})

export const updateCount = createServerFn({ method: 'POST' })
  .validator((addBy: number) => addBy)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

interface CounterProps {
  initialCount: number
}

export function Counter({ initialCount }: CounterProps) {
  const [localCount, setLocalCount] = useState(initialCount || 0)
  const router = useRouter()
  
  const handleClick = async () => {
    // Update local state immediately for better UX
    setLocalCount(prev => prev + 1)
    
    // Persist the count on the server
    await updateCount({ data: 1 })
    
    // Invalidate the route to refresh data from the server
    router.invalidate()
  }

  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h4">
        Server-Persisted Counter: {localCount}
      </Typography>
      <Box>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleClick}
        >
          Add 1
        </Button>
      </Box>
    </Stack>
  )
}