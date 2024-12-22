import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loginUser } from "../actions/authAction"

interface AuthState {
    loading: boolean
    error: string | null
    success: boolean
}

const initialState: AuthState = {
    loading: false,
    error: null,
    success: false,
}

const userAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload.message || 'Failed to Login'
                state.success = false
            })
    },
}
)

export default userAuthSlice.reducer