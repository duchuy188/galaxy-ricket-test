"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Film, Eye, EyeOff } from "lucide-react"

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = login(formData.username, formData.password)

    if (result.success) {
      // Redirect based on role
      const user = JSON.parse(localStorage.getItem("user"))
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "staff") {
        router.push("/staff")
      } else {
        router.push("/")
      }
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const quickLogin = (username, password) => {
    setFormData({ username, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Film className="h-10 w-10 text-red-500" />
            <h1 className="text-3xl font-bold text-white">Galaxy Cinema</h1>
          </div>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="bg-red-900 border-red-700">
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="text-center text-gray-400 mb-4">Quick Login Options</div>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  onClick={() => quickLogin("admin", "123")}
                  className="bg-blue-900 border-blue-700 text-blue-200 hover:bg-blue-800"
                >
                  Admin Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => quickLogin("staff", "123")}
                  className="bg-green-900 border-green-700 text-green-200 hover:bg-green-800"
                >
                  Staff Login
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-red-400 hover:text-red-300">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
