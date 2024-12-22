'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextField, Typography } from '@mui/material'
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { AppDispatch, RootState, store } from '../../store/store'
import { auth } from '../firebase/firebaseConfig'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/store/actions/authAction'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, success } = useSelector((state: RootState) => state.auth)
  const router = useRouter()


  const validateForm = (): boolean => {
    let isValid = true

    if (!email) {
      setEmailError('Email is required')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid')
      isValid = false
    } else {
      setEmailError('')
    }

    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    } else {
      setPasswordError('')
    }

    return isValid
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    try {

      dispatch(loginUser({ userData: { email: email, password: password } }))

      setEmailError('')
      setPasswordError('')
      router.push('/dashboard')

    } catch (err: any) {
      const errorMessage = err.message || 'Failed to log in'

    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          style={{ marginTop: 16 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {error && (
          <Typography color="error" style={{ marginTop: 16 }}>
            {error}
          </Typography>
        )}
      </form>
    </Box>
  )
}

export default Login
