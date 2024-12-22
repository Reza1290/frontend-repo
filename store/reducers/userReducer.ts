import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUsers, updateUser } from '../actions/userAction'
import { User } from '@/apis/userApi'

interface UserState {
    users: Array<User>
    loading: boolean
    error: string | null
    success: boolean
    message: string | null
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    success: false,
    message: null,
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false 
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false
                state.users = action.payload
                state.success = true 
                state.message = 'Users Successfully Fetched'
            })
            .addCase(fetchUsers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload || 'Failed to fetch users' 
                state.success = false 
            })

            
            .addCase(updateUser.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false 
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false
                state.success = true 
                state.message = 'Users Successfully Updated'
            })
            .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload || 'Failed to update user' 
                state.success = false
            })
    },
})

export default userSlice.reducer