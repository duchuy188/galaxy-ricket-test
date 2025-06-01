"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock users database
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      password: "123",
      role: "admin",
      fullName: "Admin User",
      email: "admin@galaxy.com",
      phone: "+1234567890",
      isLocked: false,
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      username: "staff",
      password: "123",
      role: "staff",
      fullName: "Staff User",
      email: "staff@galaxy.com",
      phone: "+1234567891",
      isLocked: false,
      createdAt: "2024-01-01",
    },
    {
      id: 3,
      username: "john_doe",
      password: "password123",
      role: "user",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1234567892",
      isLocked: false,
      createdAt: "2024-01-15",
    },
    {
      id: 4,
      username: "jane_smith",
      password: "password123",
      role: "user",
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567893",
      isLocked: true,
      createdAt: "2024-01-20",
    },
  ])

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    const foundUser = users.find((u) => u.username === username && u.password === password)
    if (foundUser && !foundUser.isLocked) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      return { success: true }
    } else if (foundUser && foundUser.isLocked) {
      return { success: false, error: "Account is locked. Please contact administrator." }
    }
    return { success: false, error: "Invalid credentials" }
  }

  const register = (userData) => {
    // Check if username or email already exists
    const existingUser = users.find((u) => u.username === userData.username || u.email === userData.email)
    if (existingUser) {
      return { success: false, error: "Username or email already exists" }
    }

    const newUser = {
      id: users.length + 1,
      ...userData,
      role: "user",
      isLocked: false,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateUser = (userId, updatedData) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, ...updatedData } : u)))
  }

  const toggleUserLock = (userId) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, isLocked: !u.isLocked } : u)))
  }

  const value = {
    user,
    users,
    login,
    register,
    logout,
    updateUser,
    toggleUserLock,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
