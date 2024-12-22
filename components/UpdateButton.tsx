import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, ListItem, Stack, Typography } from '@mui/material'
import { fetchUsers, updateUser } from '@/store/actions/userAction'
import { AppDispatch, RootState } from '@/store/store'
import UserStack from './UserStack'

const UpdateButton: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, success, error, users, message } = useSelector((state: RootState) => state.users)

    const handleFetch = () => {
        dispatch(fetchUsers())
    }
    
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', minHeight: '100vh', p:10 }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', maxWidth:'360px', width:'100%' }}>
                <Button variant="contained" onClick={handleFetch} disabled={loading}> Fetch Users </Button>
            </Container>
            <Container sx={{display: 'flex', alignItems:'center', flexDirection: 'column', p:6, maxWidth:'360px', width:'100%'}}>
                {loading && <Typography variant="body2">Loading...</Typography>}
                {success && <Typography variant="body2" color="success">{message}</Typography>}
                {error && <Typography variant="body2" color="error">{error}</Typography>} 
                <UserStack users={users}></UserStack>
            </Container>
        </Box>
    )
}

export default UpdateButton
