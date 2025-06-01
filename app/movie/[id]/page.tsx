"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock movie data
const movieData: { [key: string]: any } = {
  "1": {
    id: 1,
    title: "Avatar: The Way of Water",
    image: "/placeholder.svg?height=600&width=400",
    duration: "192 min",
    genre: "Action, Adventure, Sci-Fi",
    rating: 4.5,
    price: "$12.99",
    description:
      "Set more than a decade after the events of the first film, Avatar: The Way of Water begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"],
    trailerUrl: "https://www.youtube.com/embed/d9MyW72ELq0",
  },
  "2": {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=600&width=400",
    duration: "130 min",
    genre: "Action, Drama",
    rating: 4.8,
    price: "$11.99",
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"],
    trailerUrl: "https://www.youtube.com/embed/qSqVVswa420",
  },
}

const showtimes = [
  { time: "10:00 AM", format: "2D", price: 12.99 },
  { time: "1:30 PM", format: "3D", price: 15.99 },
  { time: "4:00 PM", format: "2D", price: 12.99 },
  { time: "7:30 PM", format: "IMAX", price: 18.99 },
  { time: "10:00 PM", format: "2D", price: 12.99 },
]

const theaters = [
  { id: 1, name: "Galaxy Cinema Downtown", address: "123 Main St, Downtown" },
  { id: 2, name: "Galaxy Cinema Mall", address: "456 Shopping Blvd, Mall District" },
  { id: 3, name: "Galaxy Cinema North", address: "789 North Ave, Uptown" },
]

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTheater, setSelectedTheater] = useState("")
  const [selectedShowtime, setSelectedShowtime] = useState("")

  const movie = movieData[params.id]

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      })
    }
    return dates
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
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Movies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span>{movie.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{movie.genre}</p>
                  <p className="text-gray-800 mb-6">{movie.description}</p>
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Director:</span> {movie.director}
                    </p>
                    <p>
                      <span className="font-semibold">Cast:</span> {movie.cast.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trailer */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Play className="w-6 h-6" />
                Trailer
              </h2>
              <div className="aspect-video">
                <iframe
                  src={movie.trailerUrl}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Book Tickets</h2>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateDates().map((date) => (
                        <SelectItem key={date.value} value={date.value}>
                          {date.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Theater Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Theater</label>
                  <Select value={selectedTheater} onValueChange={setSelectedTheater}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a theater" />
                    </SelectTrigger>
                    <SelectContent>
                      {theaters.map((theater) => (
                        <SelectItem key={theater.id} value={theater.id.toString()}>
                          <div>
                            <div className="font-medium">{theater.name}</div>
                            <div className="text-sm text-gray-500">{theater.address}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Showtime Selection */}
                {selectedDate && selectedTheater && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Showtime</label>
                    <div className="grid grid-cols-1 gap-2">
                      {showtimes.map((showtime, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedShowtime(`${showtime.time}-${showtime.format}`)}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            selectedShowtime === `${showtime.time}-${showtime.format}`
                              ? "border-red-600 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{showtime.time}</div>
                              <div className="text-sm text-gray-600">{showtime.format}</div>
                            </div>
                            <div className="font-bold text-red-600">${showtime.price}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Link
                  href={selectedDate && selectedTheater && selectedShowtime ? `/seats/${movie.id}` : "#"}
                  className={selectedDate && selectedTheater && selectedShowtime ? "" : "pointer-events-none"}
                >
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={!selectedDate || !selectedTheater || !selectedShowtime}
                  >
                    Select Seats
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
