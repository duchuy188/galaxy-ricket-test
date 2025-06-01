"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Clock, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const allMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    image: "/placeholder.svg?height=300&width=200",
    duration: "192 min",
    genre: "Action, Adventure, Sci-Fi",
    rating: 4.5,
    price: "$12.99",
    status: "now-showing",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=300&width=200",
    duration: "130 min",
    genre: "Action, Drama",
    rating: 4.8,
    price: "$11.99",
    status: "now-showing",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    image: "/placeholder.svg?height=300&width=200",
    duration: "161 min",
    genre: "Action, Adventure, Drama",
    rating: 4.3,
    price: "$12.99",
    status: "now-showing",
  },
  {
    id: 4,
    title: "The Batman",
    image: "/placeholder.svg?height=300&width=200",
    duration: "176 min",
    genre: "Action, Crime, Drama",
    rating: 4.6,
    price: "$11.99",
    status: "now-showing",
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    image: "/placeholder.svg?height=300&width=200",
    duration: "140 min",
    genre: "Animation, Action, Adventure",
    rating: 4.9,
    releaseDate: "June 2, 2024",
    status: "coming-soon",
  },
  {
    id: 6,
    title: "Guardians of the Galaxy Vol. 3",
    image: "/placeholder.svg?height=300&width=200",
    duration: "150 min",
    genre: "Action, Adventure, Comedy",
    rating: 4.7,
    releaseDate: "May 5, 2024",
    status: "coming-soon",
  },
  {
    id: 7,
    title: "Fast X",
    image: "/placeholder.svg?height=300&width=200",
    duration: "141 min",
    genre: "Action, Crime, Thriller",
    rating: 4.2,
    releaseDate: "May 19, 2024",
    status: "coming-soon",
  },
  {
    id: 8,
    title: "Indiana Jones 5",
    image: "/placeholder.svg?height=300&width=200",
    duration: "154 min",
    genre: "Action, Adventure",
    rating: 4.4,
    releaseDate: "June 30, 2024",
    status: "coming-soon",
  },
  {
    id: 9,
    title: "Dune: Part Two",
    image: "/placeholder.svg?height=300&width=200",
    duration: "165 min",
    genre: "Sci-Fi, Adventure, Drama",
    rating: 4.8,
    price: "$13.99",
    status: "now-showing",
  },
  {
    id: 10,
    title: "The Marvels",
    image: "/placeholder.svg?height=300&width=200",
    duration: "135 min",
    genre: "Action, Adventure, Fantasy",
    rating: 4.1,
    releaseDate: "July 15, 2024",
    status: "coming-soon",
  },
  {
    id: 11,
    title: "Oppenheimer",
    image: "/placeholder.svg?height=300&width=200",
    duration: "180 min",
    genre: "Biography, Drama, History",
    rating: 4.9,
    price: "$12.99",
    status: "now-showing",
  },
  {
    id: 12,
    title: "Barbie",
    image: "/placeholder.svg?height=300&width=200",
    duration: "114 min",
    genre: "Adventure, Comedy, Fantasy",
    rating: 4.7,
    price: "$11.99",
    status: "now-showing",
  },
]

const genres = [
  "All Genres",
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "History",
  "Sci-Fi",
  "Thriller",
]

function MovieCard({ movie, isComingSoon = false }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={movie.image || "/placeholder.svg"}
          alt={movie.title}
          width={200}
          height={300}
          className="w-full h-80 object-cover"
        />
        {isComingSoon && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">Coming Soon</div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Clock className="w-4 h-4" />
          <span>{movie.duration}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{movie.genre}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{movie.rating}</span>
          </div>
          {isComingSoon ? (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>{movie.releaseDate}</span>
            </div>
          ) : (
            <span className="font-bold text-red-600">{movie.price}</span>
          )}
        </div>
        <Link href={`/movie/${movie.id}`}>
          <Button className="w-full mt-3 bg-red-600 hover:bg-red-700">
            {isComingSoon ? "View Details" : "Book Tickets"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function MoviesPage() {
  const [activeTab, setActiveTab] = useState("now-showing")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All Genres")
  const [sortBy, setSortBy] = useState("rating")

  // Filter and sort movies
  const filteredMovies = allMovies.filter((movie) => {
    // Filter by tab
    if (movie.status !== activeTab) return false

    // Filter by search query
    if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Filter by genre
    if (selectedGenre !== "All Genres" && !movie.genre.includes(selectedGenre)) return false

    return true
  })

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    } else if (sortBy === "duration") {
      return Number.parseInt(b.duration) - Number.parseInt(a.duration)
    }
    return 0
  })

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
              <Link href="/movies" className="text-red-600 font-medium">
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
        <h1 className="text-3xl font-bold mb-8">Movies</h1>

        {/* Tabs */}
        <Tabs defaultValue="now-showing" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="now-showing">Now Showing</TabsTrigger>
            <TabsTrigger value="coming-soon">Coming Soon</TabsTrigger>
          </TabsList>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search movies..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-40">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="title">Alphabetical</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedGenre !== "All Genres") && (
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="text-sm text-gray-500 flex items-center">
                <Filter className="w-4 h-4 mr-1" /> Filters:
              </div>
              {searchQuery && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedGenre !== "All Genres" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Genre: {selectedGenre}
                  <button
                    onClick={() => setSelectedGenre("All Genres")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Movie Grid */}
          <TabsContent value="now-showing">
            {sortedMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No movies found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedGenre("All Genres")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="coming-soon">
            {sortedMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} isComingSoon />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No upcoming movies found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedGenre("All Genres")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Galaxy Cinema</h3>
              <p className="text-gray-400">
                Your premier destination for the latest movies and unforgettable cinema experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="hover:text-white">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="/theaters" className="hover:text-white">
                    Theaters
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-white">
                    My Bookings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Galaxy Cinema. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
