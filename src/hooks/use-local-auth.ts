import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export interface User {
    name: string
    email: string
    avatar?: string
    role?: 'student' | 'faculty' | 'admin'
}

/**
 * Hook to manage user authentication state from localStorage
 * This is a temporary solution until proper AuthContext is implemented
 */
export function useLocalAuth() {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error("Failed to parse user", e)
            }
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    const getInitials = (name: string) => {
        if (!name) return "U"
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2)
    }

    return {
        user,
        logout,
        getInitials,
        isAuthenticated: !!user
    }
}
