"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Mock data
const banners = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    image: "/placeholder.svg?height=400&width=800",
    description: "Experience the magic of Pandora like never before",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=400&width=800",
    description: "Feel the need for speed in IMAX",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    image: "/placeholder.svg?height=400&width=800",
    description: "Honor the legacy in premium formats",
  },
]

const nowShowingMovies = [
  {
    id: 1,
    title: "Avatar: The Way of Water",
    image: "/placeholder.svg?height=300&width=200",
    duration: "192 min",
    genre: "Action, Adventure, Sci-Fi",
    rating: 4.5,
    price: "$12.99",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=300&width=200",
    duration: "130 min",
    genre: "Action, Drama",
    rating: 4.8,
    price: "$11.99",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    image: "/placeholder.svg?height=300&width=200",
    duration: "161 min",
    genre: "Action, Adventure, Drama",
    rating: 4.3,
    price: "$12.99",
  },
  {
    id: 4,
    title: "The Batman",
    image: "/placeholder.svg?height=300&width=200",
    duration: "176 min",
    genre: "Action, Crime, Drama",
    rating: 4.6,
    price: "$11.99",
  },
]

const comingSoonMovies = [
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    image: "/placeholder.svg?height=300&width=200",
    duration: "140 min",
    genre: "Animation, Action, Adventure",
    rating: 4.9,
    releaseDate: "June 2, 2024",
  },
  {
    id: 6,
    title: "Guardians of the Galaxy Vol. 3",
    image: "/placeholder.svg?height=300&width=200",
    duration: "150 min",
    genre: "Action, Adventure, Comedy",
    rating: 4.7,
    releaseDate: "May 5, 2024",
  },
  {
    id: 7,
    title: "Fast X",
    image: "/placeholder.svg?height=300&width=200",
    duration: "141 min",
    genre: "Action, Crime, Thriller",
    rating: 4.2,
    releaseDate: "May 19, 2024",
  },
  {
    id: 8,
    title: "Indiana Jones 5",
    image: "/placeholder.svg?height=300&width=200",
    duration: "154 min",
    genre: "Action, Adventure",
    rating: 4.4,
    releaseDate: "June 30, 2024",
  },
]

function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
              <p className="text-lg md:text-xl mb-6">{banner.description}</p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"}`}
          />
        ))}
      </div>
    </div>
  )
}

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
              <Calendar className="w-4 h-4" />
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Slider */}
        <section className="mb-12">
          <BannerSlider />
        </section>

        {/* Now Showing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Now Showing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nowShowingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Coming Soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comingSoonMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} isComingSoon />
            ))}
          </div>
        </section>
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
