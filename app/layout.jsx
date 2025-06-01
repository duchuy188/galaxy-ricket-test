import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Galaxy Cinema - Movie Booking",
  description: "Book your favorite movies at Galaxy Cinema",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
