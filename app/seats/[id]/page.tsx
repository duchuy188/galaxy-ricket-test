"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Mock data
const movieData: { [key: string]: any } = {
  "1": {
    id: 1,
    title: "Avatar: The Way of Water",
    showtime: "7:30 PM",
    date: "Dec 25, 2024",
    theater: "Galaxy Cinema Downtown",
    format: "IMAX",
  },
}

const seatPrices = {
  regular: 12.99,
  premium: 15.99,
  vip: 18.99,
}

// Generate seat map
const generateSeatMap = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
  const seatsPerRow = 16
  const seatMap: any = {}

  rows.forEach((row, rowIndex) => {
    seatMap[row] = []
    for (let i = 1; i <= seatsPerRow; i++) {
      let type = "regular"
      if (rowIndex >= 7)
        type = "vip" // Last 3 rows are VIP
      else if (rowIndex >= 4) type = "premium" // Middle rows are premium

      // Some seats are occupied (mock data)
      const isOccupied = Math.random() < 0.15 // 15% chance of being occupied

      seatMap[row].push({
        id: `${row}${i}`,
        number: i,
        type,
        isOccupied,
        isSelected: false,
      })
    }
  })

  return seatMap
}

export default function SeatSelectionPage({ params }: { params: { id: string } }) {
  const [seatMap, setSeatMap] = useState(generateSeatMap())
  const [promoCode, setPromoCode] = useState("")
  const [promoMessage, setPromoMessage] = useState("")
  const [discount, setDiscount] = useState(0)

  const movie = movieData[params.id] || {
    title: "Movie Title",
    showtime: "7:30 PM",
    date: "Dec 25, 2024",
    theater: "Galaxy Cinema Downtown",
    format: "IMAX",
  }

  const selectedSeats = Object.values(seatMap)
    .flat()
    .filter((seat: any) => seat.isSelected)
  const totalPrice = selectedSeats.reduce(
    (sum: number, seat: any) => sum + seatPrices[seat.type as keyof typeof seatPrices],
    0,
  )
  const finalPrice = totalPrice - discount

  const toggleSeat = (rowLetter: string, seatIndex: number) => {
    setSeatMap((prev) => ({
      ...prev,
      [rowLetter]: prev[rowLetter].map((seat: any, index: number) =>
        index === seatIndex && !seat.isOccupied ? { ...seat, isSelected: !seat.isSelected } : seat,
      ),
    }))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "galaxy10") {
      setDiscount(totalPrice * 0.1)
      setPromoMessage("Promo code applied! 10% discount")
    } else if (promoCode.toLowerCase() === "student") {
      setDiscount(5)
      setPromoMessage("Student discount applied! $5 off")
    } else {
      setDiscount(0)
      setPromoMessage("Invalid promo code")
    }
  }

  const getSeatColor = (seat: any) => {
    if (seat.isOccupied) return "bg-gray-400 cursor-not-allowed"
    if (seat.isSelected) return "bg-red-600 text-white"

    switch (seat.type) {
      case "vip":
        return "bg-yellow-200 hover:bg-yellow-300 cursor-pointer"
      case "premium":
        return "bg-blue-200 hover:bg-blue-300 cursor-pointer"
      default:
        return "bg-green-200 hover:bg-green-300 cursor-pointer"
    }
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/movie/${params.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Movie Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-6">Select Your Seats</h1>

                {/* Movie Info */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h2 className="font-bold text-lg">{movie.title}</h2>
                  <p className="text-gray-600">
                    {movie.theater} • {movie.date} • {movie.showtime} • {movie.format}
                  </p>
                </div>

                {/* Screen */}
                <div className="text-center mb-8">
                  <div className="bg-gray-800 text-white py-2 px-8 rounded-t-full inline-block mb-2">SCREEN</div>
                  <p className="text-sm text-gray-600">All eyes this way please!</p>
                </div>

                {/* Seat Map */}
                <div className="space-y-2 mb-6">
                  {Object.entries(seatMap).map(([rowLetter, seats]) => (
                    <div key={rowLetter} className="flex items-center gap-2">
                      <div className="w-8 text-center font-medium">{rowLetter}</div>
                      <div className="flex gap-1">
                        {(seats as any[]).slice(0, 6).map((seat, index) => (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeat(rowLetter, index)}
                            className={`w-8 h-8 text-xs rounded ${getSeatColor(seat)}`}
                            disabled={seat.isOccupied}
                          >
                            {seat.number}
                          </button>
                        ))}
                        <div className="w-8"></div> {/* Aisle */}
                        {(seats as any[]).slice(6, 10).map((seat, index) => (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeat(rowLetter, index + 6)}
                            className={`w-8 h-8 text-xs rounded ${getSeatColor(seat)}`}
                            disabled={seat.isOccupied}
                          >
                            {seat.number}
                          </button>
                        ))}
                        <div className="w-8"></div> {/* Aisle */}
                        {(seats as any[]).slice(10).map((seat, index) => (
                          <button
                            key={seat.id}
                            onClick={() => toggleSeat(rowLetter, index + 10)}
                            className={`w-8 h-8 text-xs rounded ${getSeatColor(seat)}`}
                            disabled={seat.isOccupied}
                          >
                            {seat.number}
                          </button>
                        ))}
                      </div>
                      <div className="w-8 text-center font-medium">{rowLetter}</div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-6 justify-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span>Regular ($12.99)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-200 rounded"></div>
                    <span>Premium ($15.99)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                    <span>VIP ($18.99)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span>Occupied</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

                {/* Selected Seats */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Selected Seats</span>
                  </div>
                  {selectedSeats.length > 0 ? (
                    <div className="space-y-1">
                      {selectedSeats.map((seat: any) => (
                        <div key={seat.id} className="flex justify-between text-sm">
                          <span>
                            {seat.id} ({seat.type})
                          </span>
                          <span>${seatPrices[seat.type as keyof typeof seatPrices]}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No seats selected</p>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                  {promoMessage && (
                    <p className={`text-sm mt-1 ${discount > 0 ? "text-green-600" : "text-red-600"}`}>{promoMessage}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Continue Button */}
                <Link
                  href={selectedSeats.length > 0 ? `/checkout/${params.id}` : "#"}
                  className={selectedSeats.length > 0 ? "" : "pointer-events-none"}
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700" disabled={selectedSeats.length === 0}>
                    Continue to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
