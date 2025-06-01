"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Phone, Clock, Star, Film, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock theater data
const theatersData: { [key: string]: any } = {
  "1": {
    id: 1,
    name: "Galaxy Cinema Downtown",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Our flagship location featuring IMAX, 4DX, and premium seating. Located in the heart of downtown with easy access to public transportation and nearby restaurants. The theater features 12 screens including our signature IMAX auditorium with laser projection and immersive sound system.",
    facilities: [
      "IMAX",
      "4DX",
      "Premium Seating",
      "Dolby Atmos",
      "Parking",
      "Food Court",
      "Wheelchair Accessible",
      "Hearing Assistance",
    ],
    openingHours: "10:00 AM - 12:00 AM",
    location: {
      lat: 40.7128,
      lng: -74.006,
    },
    screens: 12,
    area: "Downtown",
    amenities: {
      food: ["Popcorn", "Nachos", "Hot Dogs", "Candy", "Ice Cream"],
      beverages: ["Soft Drinks", "Coffee", "Tea", "Water", "Beer", "Wine"],
      special: ["VIP Lounge", "Birthday Packages", "Corporate Events"],
    },
    nowShowing: [
      {
        id: 1,
        title: "Avatar: The Way of Water",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
        format: "IMAX",
      },
      {
        id: 2,
        title: "Top Gun: Maverick",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
        format: "4DX",
      },
      {
        id: 3,
        title: "Black Panther: Wakanda Forever",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
        format: "2D",
      },
      {
        id: 9,
        title: "Dune: Part Two",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:30 PM"],
        format: "IMAX",
      },
    ],
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  "2": {
    id: 2,
    name: "Galaxy Cinema Mall",
    address: "456 Shopping Boulevard, Mall District",
    phone: "(555) 234-5678",
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Located in the city's largest shopping mall. Perfect for catching a movie after shopping. Features recliner seats and a dedicated kids' screen. Our mall location offers convenient access to shopping and dining options before or after your movie.",
    facilities: ["Recliner Seats", "Kids Screen", "Dolby Sound", "Parking", "Food Court", "Wheelchair Accessible"],
    openingHours: "9:00 AM - 11:00 PM",
    location: {
      lat: 40.7328,
      lng: -73.986,
    },
    screens: 8,
    area: "Mall District",
    amenities: {
      food: ["Popcorn", "Nachos", "Candy", "Pretzels"],
      beverages: ["Soft Drinks", "Coffee", "Tea", "Water"],
      special: ["Kids Combos", "Family Packages"],
    },
    nowShowing: [
      {
        id: 1,
        title: "Avatar: The Way of Water",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["10:30 AM", "2:00 PM", "5:30 PM", "9:00 PM"],
        format: "2D",
      },
      {
        id: 2,
        title: "Top Gun: Maverick",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["11:30 AM", "3:00 PM", "6:30 PM", "10:00 PM"],
        format: "2D",
      },
      {
        id: 12,
        title: "Barbie",
        image: "/placeholder.svg?height=150&width=100",
        showtimes: ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"],
        format: "2D",
      },
    ],
    gallery: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
}

export default function TheaterDetailPage({ params }: { params: { id: string } }) {
  const theater = theatersData[params.id]

  if (!theater) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Theater Not Found</h1>
          <Link href="/theaters">
            <Button>Back to Theaters</Button>
          </Link>
        </div>
      </div>
    )
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
              <Link href="/theaters" className="text-red-600 font-medium">
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
        <Link href="/theaters" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Theaters
        </Link>

        {/* Theater Hero */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image src={theater.image || "/placeholder.svg"} alt={theater.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
            <div className="p-6 md:p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{theater.name}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{theater.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{theater.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Film className="w-4 h-4" />
                  <span>{theater.screens} Screens</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theater Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="now-showing" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="now-showing">Now Showing</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              {/* Now Showing */}
              <TabsContent value="now-showing" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Movies Playing Today</h2>
                <div className="space-y-6">
                  {theater.nowShowing.map((movie: any) => (
                    <Card key={movie.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Image
                            src={movie.image || "/placeholder.svg"}
                            alt={movie.title}
                            width={100}
                            height={150}
                            className="rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">{movie.title}</h3>
                              <Badge>{movie.format}</Badge>
                            </div>
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-600 mb-2">Showtimes:</h4>
                              <div className="flex flex-wrap gap-2">
                                {movie.showtimes.map((time: string, index: number) => (
                                  <Link key={index} href={`/movie/${movie.id}`}>
                                    <Button variant="outline" size="sm">
                                      {time}
                                    </Button>
                                  </Link>
                                ))}
                              </div>
                            </div>
                            <Link href={`/movie/${movie.id}`}>
                              <Button className="bg-red-600 hover:bg-red-700">Book Tickets</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* About */}
              <TabsContent value="about" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {theater.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-gray-600">{theater.description}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {theater.facilities.map((facility: string) => (
                          <Badge key={facility} variant="outline">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Food</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {theater.amenities.food.map((item: string) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Beverages</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {theater.amenities.beverages.map((item: string) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Special Services</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {theater.amenities.special.map((item: string) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gallery */}
              <TabsContent value="gallery" className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Theater Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {theater.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${theater.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Theater Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Theater Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Opening Hours</h4>
                      <p className="text-gray-600">{theater.openingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Contact</h4>
                      <p className="text-gray-600">{theater.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">{theater.address}</p>
                      <Button variant="link" className="p-0 h-auto text-red-600">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Map would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Special Offers */}
              <Card className="bg-red-50 border border-red-100">
                <CardHeader>
                  <CardTitle className="text-red-800">Special Offers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 rounded-full p-1 mt-0.5">
                        <Star className="w-3 h-3 text-red-600" />
                      </div>
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Discount Tuesdays:</span> All tickets 30% off
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 rounded-full p-1 mt-0.5">
                        <Star className="w-3 h-3 text-red-600" />
                      </div>
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Student Discount:</span> 20% off with valid ID
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-red-100 rounded-full p-1 mt-0.5">
                        <Star className="w-3 h-3 text-red-600" />
                      </div>
                      <p className="text-sm text-red-800">
                        <span className="font-medium">Family Package:</span> 4 tickets + snacks combo for $45
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
