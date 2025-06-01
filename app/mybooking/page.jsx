"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MyBookingRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.push("/bookings")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to My Bookings...</p>
    </div>
  )
}
