"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, BarChart3, Film } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin"
    if (user?.role === "staff") return "/staff"
    return "/mybooking"
  }

  const getDashboardLabel = () => {
    if (user?.role === "admin") return "Admin Dashboard"
    if (user?.role === "staff") return "Staff Dashboard"
    return "My Bookings"
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-red-500" />
              <span className="font-bold text-xl">Galaxy Cinema</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-red-400 transition-colors">
              Home
            </Link>
            <Link href="/movies" className="hover:text-red-400 transition-colors">
              Movies
            </Link>
            <Link href="/theaters" className="hover:text-red-400 transition-colors">
              Theaters
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.fullName || user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="flex items-center">
                      {user.role === "admin" ? (
                        <BarChart3 className="mr-2 h-4 w-4" />
                      ) : user.role === "staff" ? (
                        <Settings className="mr-2 h-4 w-4" />
                      ) : (
                        <User className="mr-2 h-4 w-4" />
                      )}
                      {getDashboardLabel()}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-red-600 hover:bg-red-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-red-400">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 text-white hover:text-red-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="block px-3 py-2 text-white hover:text-red-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                href="/theaters"
                className="block px-3 py-2 text-white hover:text-red-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Theaters
              </Link>

              {user ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="block px-3 py-2 text-white hover:text-red-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getDashboardLabel()}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="block px-3 py-2 text-white hover:text-red-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-3 py-2 text-white hover:text-red-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
