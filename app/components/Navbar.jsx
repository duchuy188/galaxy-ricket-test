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
import { User, LogOut, BarChart3, Settings } from "lucide-react"

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

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-600">Galaxy Cinema</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-red-600">
              Trang chủ
            </Link>
            <Link href="/movies" className="text-gray-900 hover:text-red-600">
              Phim
            </Link>
            <Link href="/theaters" className="text-gray-900 hover:text-red-600">
              Rạp chiếu
            </Link>
            <Link href="/bookings" className="text-gray-900 hover:text-red-600">
              Vé của tôi
            </Link>
          </nav>

          {/* Sign In Button or User Menu */}
          <div>
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
                      {user.role === "admin" ? "Quản trị viên" : user.role === "staff" ? "Nhân viên" : "Vé của tôi"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/signin">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-900 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/movies"
                className="block px-3 py-2 text-gray-900 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Phim
              </Link>
              <Link
                href="/theaters"
                className="block px-3 py-2 text-gray-900 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Rạp chiếu
              </Link>
              <Link
                href="/bookings"
                className="block px-3 py-2 text-gray-900 hover:text-red-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Vé của tôi
              </Link>

              {!user && (
                <Link
                  href="/signin"
                  className="block px-3 py-2 text-red-600 hover:text-red-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}

              {user && (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="block px-3 py-2 text-gray-900 hover:text-red-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user.role === "admin" ? "Quản trị viên" : user.role === "staff" ? "Nhân viên" : "Vé của tôi"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Đăng xuất
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
