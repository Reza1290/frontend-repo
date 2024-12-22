'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import ButtonAppBar from "@/components/ButtonAppBar"
import UpdateButton from "@/components/UpdateButton"

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  return (
    <div>
      <ButtonAppBar />
      <UpdateButton/>
    </div>
  )
}

export default DashboardPage
