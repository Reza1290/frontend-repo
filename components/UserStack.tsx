import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Grid2 } from '@mui/material';
import { User } from '@/apis/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { updateUser } from '@/store/actions/userAction';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface UserStackProps {
  users: User[];
}

const UserStack: React.FC<UserStackProps> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, success, error,} = useSelector((state: RootState) => state.users)

  const handleUpdate = (user: User) => {
    let updated = user.name.split('update')
    let name = updated[0]
    dispatch(updateUser({userData: {id: user.id, name: name +' update ' + Date(), email: user.email }}))
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {users.map((user) => (
          <Grid2 container spacing={2} key={user.id}>
            <Grid2 size={6}>
              <Item>{user.name}</Item>
            </Grid2>
            <Grid2 size={4}>
              <Button  variant="contained" onClick={() => handleUpdate(user)} disabled={loading}> Update </Button>
            </Grid2>
          </Grid2>
        ))}
      </Stack>
    </Box>
  );
}

export default UserStack;
