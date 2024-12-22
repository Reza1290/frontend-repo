'use client'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter()
  return (
    <Box sx={{ display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', minHeight:'100vh'}}>
      <Typography variant="h1">Welcome to the Home Page</Typography>
      <Button variant="contained" color="primary" onClick={() => router.push('/login')}>
        Go to Login
      </Button>
    </Box>
  )
}

export default HomePage
