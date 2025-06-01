"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StaffDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  // Mock data states
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Avatar 3",
      poster: "/placeholder.svg?height=300&width=200",
      trailer: "https://youtube.com/watch?v=example1",
      description: "The epic conclusion to the Avatar trilogy.",
      genre: "Sci-Fi",
      duration: 180,
      rating: "PG-13",
    },
    {
      id: 2,
      title: "Spider-Man 4",
      poster: "/placeholder.svg?height=300&width=200",
      trailer: "https://youtube.com/watch?v=example2",
      description: "The web-slinger returns for another adventure.",
      genre: "Action",
      duration: 150,
      rating: "PG-13",
    },
  ])

  const [screenings, setScreenings] = useState([
    {
      id: 1,
      movieId: 1,
      movieTitle: "Avatar 3",
      theater: "Theater 1",
      date: "2024-01-20",
      time: "14:00",
      price: 25,
      status: "active",
    },
    {
      id: 2,
      movieId: 1,
      movieTitle: "Avatar 3",
      theater: "Theater 2",
      date: "2024-01-20",
      time: "18:00",
      price: 30,
      status: "active",
    },
    {
      id: 3,
      movieId: 2,
      movieTitle: "Spider-Man 4",
      theater: "Theater 1",
      date: "2024-01-21",
      time: "16:00",
      price: 25,
      status: "cancelled",
    },
  ])

  const [seatLayouts, setSeatLayouts] = useState({
    1: Array(10)
      .fill()
      .map((_, row) =>
        Array(12)
          .fill()
          .map((_, seat) => ({
            id: `${row}-${seat}`,
            row: String.fromCharCode(65 + row),
            number: seat + 1,
            status: Math.random() > 0.7 ? "occupied" : "available",
          })),
      ),
  })

  const [paymentErrors, setPaymentErrors] = useState([
    {
      id: 1,
      orderId: "ORD001",
      customer: "John Doe",
      amount: 50,
      error: "Payment timeout",
      timestamp: "2024-01-15 14:30",
      status: "pending",
    },
    {
      id: 2,
      orderId: "ORD002",
      customer: "Jane Smith",
      amount: 75,
      error: "Insufficient funds",
      timestamp: "2024-01-15 15:45",
      status: "resolved",
    },
  ])

  const [editingMovie, setEditingMovie] = useState(null)
  const [editingScreening, setEditingScreening] = useState(null)
  const [selectedScreeningForSeats, setSelectedScreeningForSeats] = useState(null)

  useEffect(() => {
    if (!user || user.role !== "staff") {
      router.push("/signin")
    }
  }, [user, router])

  if (!user || user.role !== "staff") {
    return null
  }

  // Movie management functions
  const handleAddMovie = (movieData) => {
    const newMovie = {
      id: movies.length + 1,
      ...movieData,
    }
    setMovies([...movies, newMovie])
  }

  const handleEditMovie = (movieId, movieData) => {
    setMovies(movies.map((m) => (m.id === movieId ? { ...m, ...movieData } : m)))
    setEditingMovie(null)
  }

  const handleDeleteMovie = (movieId) => {
    setMovies(movies.filter((m) => m.id !== movieId))
  }

  // Screening management functions
  const handleAddScreening = (screeningData) => {
    const movie = movies.find((m) => m.id === Number.parseInt(screeningData.movieId))
    const newScreening = {
      id: screenings.length + 1,
      ...screeningData,
      movieTitle: movie?.title || "Unknown Movie",
      status: "active",
    }
    setScreenings([...screenings, newScreening])
  }

  const handleEditScreening = (screeningId, screeningData) => {
    setScreenings(screenings.map((s) => (s.id === screeningId ? { ...s, ...screeningData } : s)))
    setEditingScreening(null)
  }

  const handleCancelScreening = (screeningId) => {
    setScreenings(screenings.map((s) => (s.id === screeningId ? { ...s, status: "cancelled" } : s)))
  }

  // Seat management functions
  const handleSeatStatusChange = (screeningId, rowIndex, seatIndex, newStatus) => {
    setSeatLayouts((prev) => ({
      ...prev,
      [screeningId]: prev[screeningId].map((row, rIdx) =>
        rIdx === rowIndex ? row.map((seat, sIdx) => (sIdx === seatIndex ? { ...seat, status: newStatus } : seat)) : row,
      ),
    }))
  }

  // Payment error handling
  const handleResolvePaymentError = (errorId) => {
    setPaymentErrors((errors) =>
      errors.map((error) => (error.id === errorId ? { ...error, status: "resolved" } : error)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.fullName}</p>
        </div>

        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="screenings">Screenings</TabsTrigger>
            <TabsTrigger value="seats">Seat Layout</TabsTrigger>
            <TabsTrigger value="payments">Payment Issues</TabsTrigger>
          </TabsList>

          {/* Movies Tab */}
          <TabsContent value="movies" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Movie Management</CardTitle>
                  <CardDescription>Add, edit, and manage movies in the system</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Movie</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Movie</DialogTitle>
                      <DialogDescription>Enter movie details</DialogDescription>
                    </DialogHeader>
                    <MovieForm onSubmit={handleAddMovie} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movies.map((movie) => (
                      <TableRow key={movie.id}>
                        <TableCell className="font-medium">{movie.title}</TableCell>
                        <TableCell>{movie.genre}</TableCell>
                        <TableCell>{movie.duration} min</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{movie.rating}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setEditingMovie(movie)}>
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Edit Movie</DialogTitle>
                                  <DialogDescription>Update movie details</DialogDescription>
                                </DialogHeader>
                                <MovieForm movie={editingMovie} onSubmit={(data) => handleEditMovie(movie.id, data)} />
                              </DialogContent>
                            </Dialog>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteMovie(movie.id)}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Screenings Tab */}
          <TabsContent value="screenings" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Screening Management</CardTitle>
                  <CardDescription>Manage movie showtimes and schedules</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Add Screening</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Screening</DialogTitle>
                      <DialogDescription>Schedule a new movie screening</DialogDescription>
                    </DialogHeader>
                    <ScreeningForm movies={movies} onSubmit={handleAddScreening} />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Movie</TableHead>
                      <TableHead>Theater</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {screenings.map((screening) => (
                      <TableRow key={screening.id}>
                        <TableCell className="font-medium">{screening.movieTitle}</TableCell>
                        <TableCell>{screening.theater}</TableCell>
                        <TableCell>{screening.date}</TableCell>
                        <TableCell>{screening.time}</TableCell>
                        <TableCell>${screening.price}</TableCell>
                        <TableCell>
                          <Badge variant={screening.status === "active" ? "default" : "destructive"}>
                            {screening.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setEditingScreening(screening)}>
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Screening</DialogTitle>
                                  <DialogDescription>Update screening details</DialogDescription>
                                </DialogHeader>
                                <ScreeningForm
                                  movies={movies}
                                  screening={editingScreening}
                                  onSubmit={(data) => handleEditScreening(screening.id, data)}
                                />
                              </DialogContent>
                            </Dialog>
                            {screening.status === "active" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelScreening(screening.id)}
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seat Layout Tab */}
          <TabsContent value="seats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seat Layout Editor</CardTitle>
                <CardDescription>Manage seat availability for screenings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="screening-select">Select Screening</Label>
                  <Select onValueChange={(value) => setSelectedScreeningForSeats(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a screening" />
                    </SelectTrigger>
                    <SelectContent>
                      {screenings
                        .filter((s) => s.status === "active")
                        .map((screening) => (
                          <SelectItem key={screening.id} value={screening.id.toString()}>
                            {screening.movieTitle} - {screening.date} {screening.time} ({screening.theater})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedScreeningForSeats && seatLayouts[selectedScreeningForSeats] && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-gray-800 text-white py-2 px-4 rounded mb-4">SCREEN</div>
                    </div>
                    <div className="grid gap-2">
                      {seatLayouts[selectedScreeningForSeats].map((row, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-2">
                          <div className="w-8 text-center font-medium">{String.fromCharCode(65 + rowIndex)}</div>
                          <div className="flex gap-1">
                            {row.map((seat, seatIndex) => (
                              <button
                                key={`${rowIndex}-${seatIndex}`}
                                className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                                  seat.status === "available"
                                    ? "bg-green-200 hover:bg-green-300 text-green-800"
                                    : seat.status === "occupied"
                                      ? "bg-red-200 text-red-800"
                                      : "bg-yellow-200 text-yellow-800"
                                }`}
                                onClick={() => {
                                  const newStatus = seat.status === "available" ? "occupied" : "available"
                                  handleSeatStatusChange(selectedScreeningForSeats, rowIndex, seatIndex, newStatus)
                                }}
                              >
                                {seat.number}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-200 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-200 rounded"></div>
                        <span>Occupied</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Issues Tab */}
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VNPay Payment Error Handler</CardTitle>
                <CardDescription>Manage and resolve payment processing issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentErrors.map((error) => (
                      <TableRow key={error.id}>
                        <TableCell className="font-medium">{error.orderId}</TableCell>
                        <TableCell>{error.customer}</TableCell>
                        <TableCell>${error.amount}</TableCell>
                        <TableCell>{error.error}</TableCell>
                        <TableCell>{error.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant={error.status === "resolved" ? "default" : "destructive"}>
                            {error.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {error.status === "pending" && (
                            <Button size="sm" onClick={() => handleResolvePaymentError(error.id)}>
                              Resolve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Movie Form Component
function MovieForm({ movie, onSubmit }) {
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    poster: movie?.poster || "",
    trailer: movie?.trailer || "",
    description: movie?.description || "",
    genre: movie?.genre || "",
    duration: movie?.duration || "",
    rating: movie?.rating || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    if (!movie) {
      setFormData({
        title: "",
        poster: "",
        trailer: "",
        description: "",
        genre: "",
        duration: "",
        rating: "",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="poster">Poster URL</Label>
        <Input
          id="poster"
          value={formData.poster}
          onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
          placeholder="https://example.com/poster.jpg"
        />
      </div>
      <div>
        <Label htmlFor="trailer">Trailer Link</Label>
        <Input
          id="trailer"
          value={formData.trailer}
          onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="genre">Genre</Label>
          <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Action">Action</SelectItem>
              <SelectItem value="Comedy">Comedy</SelectItem>
              <SelectItem value="Drama">Drama</SelectItem>
              <SelectItem value="Horror">Horror</SelectItem>
              <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
              <SelectItem value="Romance">Romance</SelectItem>
              <SelectItem value="Thriller">Thriller</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="G">G</SelectItem>
              <SelectItem value="PG">PG</SelectItem>
              <SelectItem value="PG-13">PG-13</SelectItem>
              <SelectItem value="R">R</SelectItem>
              <SelectItem value="NC-17">NC-17</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button\
