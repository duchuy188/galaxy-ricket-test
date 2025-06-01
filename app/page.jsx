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
    title: "Avatar: Dòng Chảy Của Nước",
    image: "/placeholder.svg?height=400&width=800",
    description: "Trải nghiệm phép màu của Pandora như chưa từng có",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=400&width=800",
    description: "Cảm nhận tốc độ trong định dạng IMAX",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Bất Diệt",
    image: "/placeholder.svg?height=400&width=800",
    description: "Tôn vinh di sản trong các định dạng cao cấp",
  },
]

const nowShowingMovies = [
  {
    id: 1,
    title: "Avatar: Dòng Chảy Của Nước",
    image: "/placeholder.svg?height=300&width=200",
    duration: "192 phút",
    genre: "Hành động, Phiêu lưu, Khoa học viễn tưởng",
    rating: 4.5,
    price: "120.000đ",
  },
  {
    id: 2,
    title: "Top Gun: Maverick",
    image: "/placeholder.svg?height=300&width=200",
    duration: "130 phút",
    genre: "Hành động, Chính kịch",
    rating: 4.8,
    price: "110.000đ",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Bất Diệt",
    image: "/placeholder.svg?height=300&width=200",
    duration: "161 phút",
    genre: "Hành động, Phiêu lưu, Chính kịch",
    rating: 4.3,
    price: "120.000đ",
  },
  {
    id: 4,
    title: "The Batman",
    image: "/placeholder.svg?height=300&width=200",
    duration: "176 phút",
    genre: "Hành động, Tội phạm, Chính kịch",
    rating: 4.6,
    price: "110.000đ",
  },
]

const comingSoonMovies = [
  {
    id: 5,
    title: "Spider-Man: Vũ Trụ Nhện",
    image: "/placeholder.svg?height=300&width=200",
    duration: "140 phút",
    genre: "Hoạt hình, Hành động, Phiêu lưu",
    rating: 4.9,
    releaseDate: "2 tháng 6, 2024",
  },
  {
    id: 6,
    title: "Vệ Binh Dải Ngân Hà 3",
    image: "/placeholder.svg?height=300&width=200",
    duration: "150 phút",
    genre: "Hành động, Phiêu lưu, Hài",
    rating: 4.7,
    releaseDate: "5 tháng 5, 2024",
  },
  {
    id: 7,
    title: "Fast X",
    image: "/placeholder.svg?height=300&width=200",
    duration: "141 phút",
    genre: "Hành động, Tội phạm, Ly kỳ",
    rating: 4.2,
    releaseDate: "19 tháng 5, 2024",
  },
  {
    id: 8,
    title: "Indiana Jones 5",
    image: "/placeholder.svg?height=300&width=200",
    duration: "154 phút",
    genre: "Hành động, Phiêu lưu",
    rating: 4.4,
    releaseDate: "30 tháng 6, 2024",
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
                Đặt vé ngay
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
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">Sắp chiếu</div>
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
            {isComingSoon ? "Xem chi tiết" : "Đặt vé"}
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
          <h2 className="text-3xl font-bold mb-8">Đang chiếu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nowShowingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Sắp chiếu</h2>
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
                Điểm đến hàng đầu cho những bộ phim mới nhất và trải nghiệm điện ảnh khó quên.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liên kết nhanh</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/movies" className="hover:text-white">
                    Phim
                  </Link>
                </li>
                <li>
                  <Link href="/theaters" className="hover:text-white">
                    Rạp chiếu
                  </Link>
                </li>
                <li>
                  <Link href="/bookings" className="hover:text-white">
                    Vé của tôi
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Điều khoản dịch vụ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kết nối</h4>
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
            <p>&copy; 2024 Galaxy Cinema. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
