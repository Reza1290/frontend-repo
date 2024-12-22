import { auth } from "@/app/firebase/firebaseConfig"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"

interface AuthUser {
    email: string
    password: string
}

interface AuthUserResponse {
    uid: string
    email: string | null
}

export const loginUser = createAsyncThunk<AuthUserResponse, { userData: Partial<AuthUser> }>(
  'login',
  async ({ userData }, { rejectWithValue }) => {
    try {
      await setPersistence(auth, browserSessionPersistence)
      const userCredential = await signInWithEmailAndPassword(auth, userData.email ?? '', userData.password ?? '')
      const user = userCredential.user

      return { uid: user.uid, email: user.email }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)
