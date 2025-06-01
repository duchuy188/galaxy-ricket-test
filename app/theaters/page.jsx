"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock theater data
const theaters = [
  {
    id: 1,
    name: "Galaxy Cinema Downtown",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=400",
    description:
      "Our flagship location featuring IMAX, 4DX, and premium seating. Located in the heart of downtown with easy access to public transportation and nearby restaurants.",
    facilities: ["IMAX", "4DX", "Premium Seating", "Dolby Atmos", "Parking", "Food Court"],
    openingHours: "10:00 AM - 12:00 AM",
    location: {
      lat: 40.7128,
      lng: -74.006,
    },
    screens: 12,
    area: "Downtown",
  },
  {
    id: 2,
    name: "Galaxy Cinema Mall",
    address: "456 Shopping Boulevard, Mall District",
    phone: "(555) 234-5678",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=400",
    description:
      "Located in the city's largest shopping mall. Perfect for catching a movie after shopping. Features recliner seats and a dedicated kids' screen.",
    facilities: ["Recliner Seats", "Kids Screen", "Dolby Sound", "Parking", "Food Court"],
    openingHours: "9:00 AM - 11:00 PM",
    location: {
      lat: 40.7328,
      lng: -73.986,
    },
    screens: 8,
    area: "Mall District",
  },
  {
    id: 3,
    name: "Galaxy Cinema North",
    address: "789 North Avenue, Uptown",
    phone: "(555) 345-6789",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=400",
    description:
      "Our newest location with state-of-the-art projection and sound systems. Features a VIP lounge and in-theater dining options.",
    facilities: ["VIP Lounge", "In-theater Dining", "Ultra HD", "Parking", "Bar"],
    openingHours: "11:00 AM - 1:00 AM",
    location: {
      lat: 40.7528,
      lng: -73.976,
    },
    screens: 10,
    area: "Uptown",
  },
  {
    id: 4,
    name: "Galaxy Cinema East",
    address: "101 East Road, Eastside",
    phone: "(555) 456-7890",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=400",
    description:
      "A cozy theater with a focus on independent and foreign films. Features a café with artisanal snacks and beverages.",
    facilities: ["Art Films", "Café", "Intimate Screens", "Street Parking"],
    openingHours: "12:00 PM - 11:00 PM",
    location: {
      lat: 40.7228,
      lng: -73.956,
    },
    screens: 6,
    area: "Eastside",
  },
  {
    id: 5,
    name: "Galaxy Cinema West",
    address: "202 West Boulevard, Westside",
    phone: "(555) 567-8901",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=400",
    description:
      "Our luxury location featuring all-premium seating, a full-service restaurant, and a bar. The ultimate movie-going experience.",
    facilities: ["Premium Seating", "Restaurant", "Bar", "Valet Parking", "IMAX"],
    openingHours: "10:00 AM - 12:00 AM",
    location: {
      lat: 40.7028,
      lng: -74.026,
    },
    screens: 8,
    area: "Westside",
  },
  {
    id: 6,
    name: "Galaxy Cinema South",
    address: "303 South Street, Southside",
    phone: "(555) 678-9012",
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=400",
    description:
      "A family-friendly theater with special facilities for children and families. Features a play area and family seating options.",
    facilities: ["Play Area", "Family Seating", "Parking", "Kids Concessions"],
    openingHours: "9:00 AM - 10:00 PM",
    location: {
      lat: 40.6928,
      lng: -74.016,
    },
    screens: 8,
    area: "Southside",
  },
]

// Areas for filtering
const areas = ["All Areas", "Downtown", "Mall District", "Uptown", "Eastside", "Westside", "Southside"]

// Facilities for filtering
const allFacilities = [
  "IMAX",
  "4DX",
  "Premium Seating",
  "Dolby Atmos",
  "Parking",
  "Food Court",
  "Recliner Seats",
  "Kids Screen",
  "VIP Lounge",
  "In-theater Dining",
  "Bar",
  "Café",
  "Restaurant",
  "Valet Parking",
  "Play Area",
  "Family Seating",
]

function TheaterCard({ theater }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image src={theater.image || "/placeholder.svg"} alt={theater.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{theater.name}</span>
          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span>{theater.rating}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-1" />
            <span className="text-gray-600">{theater.address}</span>
          </div>
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-gray-500 mt-1" />
            <span className="text-gray-600">{theater.phone}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-500 mt-1" />
            <span className="text-gray-600">{theater.openingHours}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Facilities</h4>
          <div className="flex flex-wrap gap-2">
            {theater.facilities.slice(0, 4).map((facility) => (
              <Badge key={facility} variant="outline">
                {facility}
              </Badge>
            ))}
            {theater.facilities.length > 4 && <Badge variant="outline">+{theater.facilities.length - 4} more</Badge>}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-sm text-gray-600">{theater.screens} Screens</div>
          <Link href={`/theaters/${theater.id}`}>
            <Button className="bg-red-600 hover:bg-red-700">View Theater</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TheatersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState("All Areas")
  const [selectedFacilities, setSelectedFacilities] = useState([])

  // Filter theaters
  const filteredTheaters = theaters.filter((theater) => {
    // Filter by search query
    if (
      searchQuery &&
      !theater.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !theater.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    // Filter by area
    if (selectedArea !== "All Areas" && theater.area !== selectedArea) return false

    // Filter by facilities
    if (selectedFacilities.length > 0 && !selectedFacilities.every((facility) => theater.facilities.includes(facility)))
      return false

    return true
  })

  const toggleFacility = (facility) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility],
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
        <h1 className="text-3xl font-bold mb-8">Our Theaters</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search theaters..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Area Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Area</label>
                  <div className="space-y-2">
                    {areas.map((area) => (
                      <div key={area} className="flex items-center">
                        <input
                          type="radio"
                          id={area}
                          name="area"
                          checked={selectedArea === area}
                          onChange={() => setSelectedArea(area)}
                          className="mr-2"
                        />
                        <label htmlFor={area} className="text-sm">
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Facilities Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Facilities</label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {allFacilities.map((facility) => (
                      <div key={facility} className="flex items-center">
                        <input
                          type="checkbox"
                          id={facility}
                          checked={selectedFacilities.includes(facility)}
                          onChange={() => toggleFacility(facility)}
                          className="mr-2"
                        />
                        <label htmlFor={facility} className="text-sm">
                          {facility}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedArea("All Areas")
                    setSelectedFacilities([])
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Theater List */}
          <div className="lg:col-span-3">
            {filteredTheaters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTheaters.map((theater) => (
                  <TheaterCard key={theater.id} theater={theater} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No theaters found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find theaters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedArea("All Areas")
                    setSelectedFacilities([])
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
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
