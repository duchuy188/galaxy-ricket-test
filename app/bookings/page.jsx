"use client"

import Link from "next/link"
import { Calendar, MapPin, Clock, Users, Download, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock booking history data
const bookingHistory = [
  {
    id: "GC-2024-001234",
    movie: "Avatar: The Way of Water",
    theater: "Galaxy Cinema Downtown",
    date: "Dec 25, 2024",
    showtime: "7:30 PM",
    format: "IMAX",
    seats: ["H8", "H9"],
    total: 34.18,
    status: "confirmed",
    poster: "/placeholder.svg?height=120&width=80",
  },
  {
    id: "GC-2024-001233",
    movie: "Top Gun: Maverick",
    theater: "Galaxy Cinema Mall",
    date: "Dec 20, 2024",
    showtime: "4:00 PM",
    format: "2D",
    seats: ["F5", "F6"],
    total: 23.98,
    status: "completed",
    poster: "/placeholder.svg?height=120&width=80",
  },
  {
    id: "GC-2024-001232",
    movie: "Black Panther: Wakanda Forever",
    theater: "Galaxy Cinema North",
    date: "Dec 15, 2024",
    showtime: "8:00 PM",
    format: "3D",
    seats: ["G10"],
    total: 15.99,
    status: "completed",
    poster: "/placeholder.svg?height=120&width=80",
  },
]

function BookingCard({ booking }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const isUpcoming = booking.status === "confirmed"

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <img
            src={booking.poster || "/placeholder.svg"}
            alt={booking.movie}
            className="w-20 h-30 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg truncate">{booking.movie}</h3>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{booking.theater}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {booking.showtime} • {booking.format}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Seats: {booking.seats.join(", ")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-green-600">${booking.total.toFixed(2)}</div>
              <div className="flex gap-2">
                {isUpcoming && (
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                )}
                {booking.status === "completed" && (
                  <Button size="sm" variant="outline">
                    <Star className="w-4 h-4 mr-1" />
                    Rate Movie
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BookingsPage() {
  const upcomingBookings = bookingHistory.filter((booking) => booking.status === "confirmed")
  const pastBookings = bookingHistory.filter((booking) => booking.status === "completed")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Movies</h2>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Past Movies</h2>
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {bookingHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start by booking your first movie ticket!</p>
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700">Browse Movies</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
