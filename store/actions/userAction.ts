import { fetchUserData, updateUserData, User } from "@/apis/userApi"
import { createAsyncThunk } from "@reduxjs/toolkit"



export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const data = await fetchUserData()
        return data.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({userData }: {userData: Partial<User> }, { rejectWithValue }) => {
        try {
            const response = await updateUserData(userData)
            return response
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)