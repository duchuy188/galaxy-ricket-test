"use client"

import Link from "next/link"
import { CheckCircle, Download, Calendar, MapPin, Clock, Users, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock booking confirmation data
const confirmationData = {
  bookingId: "GC-2024-001234",
  movie: "Avatar: The Way of Water",
  theater: "Galaxy Cinema Downtown",
  address: "123 Main St, Downtown",
  date: "Dec 25, 2024",
  showtime: "7:30 PM",
  format: "IMAX",
  seats: ["H8", "H9"],
  total: 34.18,
  customerName: "John Doe",
  customerEmail: "john.doe@email.com",
  qrCode: "/placeholder.svg?height=150&width=150",
}

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert("Ticket download feature would be implemented here")
  }

  const handleAddToCalendar = () => {
    // In a real app, this would create a calendar event
    alert("Add to calendar feature would be implemented here")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-red-600">Galaxy Cinema</div>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-red-600">
                Home
              </Link>
              <Link href="/movies" className="text-gray-900 hover:text-red-600">
                Movies
              </Link>
              <Link href="/theaters" className="text-gray-900 hover:text-red-600">
                Theaters
              </Link>
              <Link href="/bookings" className="text-gray-900 hover:text-red-600">
                My Bookings
              </Link>
            </nav>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Thank you for choosing Galaxy Cinema. Your tickets are ready!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Ticket Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Booking ID */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-mono text-lg font-bold">{confirmationData.bookingId}</p>
                </div>

                {/* Movie Information */}
                <div>
                  <h3 className="font-bold text-xl mb-4">{confirmationData.movie}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{confirmationData.theater}</p>
                        <p className="text-sm text-gray-600">{confirmationData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{confirmationData.date}</p>
                        <p className="text-sm text-gray-600">
                          {confirmationData.showtime} • {confirmationData.format}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Your Seats</span>
                  </div>
                  <div className="flex gap-2">
                    {confirmationData.seats.map((seat) => (
                      <span key={seat} className="bg-red-100 text-red-800 px-3 py-2 rounded-lg font-medium">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customer Information */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span> {confirmationData.customerName}
                    </p>
                    <p>
                      <span className="text-gray-600">Email:</span> {confirmationData.customerEmail}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Paid</span>
                    <span className="text-2xl font-bold text-green-600">${confirmationData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button onClick={handleDownloadTicket} className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
                <Download className="w-4 h-4" />
                Download Ticket
              </Button>
              <Button onClick={handleAddToCalendar} variant="outline" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Add to Calendar
              </Button>
              <Link href="/bookings">
                <Button variant="outline" className="w-full sm:w-auto">
                  View All Bookings
                </Button>
              </Link>
            </div>
          </div>

          {/* QR Code and Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Mobile Ticket
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                  <img
                    src={confirmationData.qrCode || "/placeholder.svg"}
                    alt="QR Code"
                    className="w-32 h-32 mx-auto mb-2"
                  />
                  <p className="text-sm text-gray-600">Show this QR code at the theater</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <h4 className="font-medium text-blue-900 mb-2">Important Reminders</h4>
                  <ul className="text-blue-800 space-y-1 text-left">
                    <li>• Arrive 30 minutes before showtime</li>
                    <li>• Bring a valid ID for verification</li>
                    <li>• No outside food or drinks allowed</li>
                    <li>• Mobile phones must be silenced</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-sm">
                  <h4 className="font-medium text-yellow-900 mb-2">Cancellation Policy</h4>
                  <p className="text-yellow-800 text-left">
                    Free cancellation up to 2 hours before showtime.
                    <Link href="/cancellation-policy" className="underline ml-1">
                      Learn more
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="font-medium mb-2">Arrive Early</h4>
                <p className="text-sm text-gray-600">
                  Get to the theater 30 minutes before your showtime for the best experience.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-medium mb-2">Show Your Ticket</h4>
                <p className="text-sm text-gray-600">
                  Present your QR code or booking ID at the entrance for quick entry.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium mb-2">Enjoy the Show</h4>
                <p className="text-sm text-gray-600">
                  Sit back, relax, and enjoy your movie experience at Galaxy Cinema!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Browsing */}
        <div className="text-center mt-8">
          <h3 className="text-lg font-medium mb-4">Want to book another movie?</h3>
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Browse More Movies
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
