const API_BASE_URL = 'http://localhost:5000/api'

export interface User {
  id?: string
  name: string
  email: string
  password: string
}


interface ResponseData {
  status: boolean
  message: string
  data : Array<User>
}

const getFirebaseToken = async (): Promise<string> => {
  const { getAuth } = await import('firebase/auth')
  const user = getAuth().currentUser

  if (!user) {
    throw new Error('User is not authenticated')
  }

  return user.getIdToken()
}

export const fetchUserData = async (): Promise<ResponseData> => {
  const token = await getFirebaseToken()

  const response = await fetch(`${API_BASE_URL}/fetch-user-data`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Error fetching user data: ${response.statusText}`)
  }

  return response.json()
}

export const updateUserData = async (
  userData: Partial<User>
): Promise<ResponseData> => {
  const token = await getFirebaseToken()

  const response = await fetch(`${API_BASE_URL}/update-user-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    throw new Error(`Error updating user data: ${response.statusText}`)
  }

  return response.json()
}
