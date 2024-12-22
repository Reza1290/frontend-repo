import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'

export const store = configureStore({
    reducer: {
        users: userReducer,
        auth: authReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
