"use client"

import { useEffect, useState } from "react"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export function useAuth(requireAuth = false) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      if (requireAuth && !user) {
        router.push("/admin/login")
      }
    })

    return () => unsubscribe()
  }, [requireAuth, router])

  return { user, loading }
}
