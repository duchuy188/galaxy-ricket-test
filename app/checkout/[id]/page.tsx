"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock booking data
const bookingData = {
  movie: "Avatar: The Way of Water",
  theater: "Galaxy Cinema Downtown",
  date: "Dec 25, 2024",
  showtime: "7:30 PM",
  format: "IMAX",
  seats: ["H8", "H9"],
  subtotal: 37.98,
  discount: 3.8,
  total: 34.18,
}

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      window.location.href = `/confirmation/${params.id}`
    }, 2000)
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "") && agreeTerms

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
          href={`/seats/${params.id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Seat Selection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange("cardName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-red-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-red-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
                disabled={!isFormValid || isProcessing}
              >
                {isProcessing ? "Processing Payment..." : `Pay $${bookingData.total.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Movie Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">{bookingData.movie}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{bookingData.theater}</p>
                    <p>
                      {bookingData.date} • {bookingData.showtime}
                    </p>
                    <p>{bookingData.format}</p>
                  </div>
                </div>

                {/* Seats */}
                <div>
                  <h4 className="font-medium mb-2">Selected Seats</h4>
                  <div className="flex gap-2">
                    {bookingData.seats.map((seat) => (
                      <span key={seat} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${bookingData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${bookingData.discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${bookingData.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 p-3 rounded-lg text-sm">
                  <p className="text-blue-800">🔒 Your payment information is secure and encrypted.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
