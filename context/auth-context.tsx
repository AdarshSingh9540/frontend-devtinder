"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { login as apiLogin } from "@/lib/api"

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const token = document.cookie.includes("token=")
    if (token) {
      setIsAuthenticated(true)
      // We could fetch user data here if needed
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const data = await apiLogin({ email, password })

    // Set cookie (in a real app, this would be handled by the server)
    document.cookie = `token=${data.token}; path=/; max-age=2592000` // 30 days

    setIsAuthenticated(true)
    setUser(data.user)

    return data
  }

  const logout = () => {
    // Clear cookie
    document.cookie = "token=; path=/; max-age=0"

    setIsAuthenticated(false)
    setUser(null)

    router.push("/login")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}

