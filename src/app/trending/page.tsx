  "use client"

import { useEffect, useState } from "react"
import { Search, Mic, Flame } from "lucide-react"
import TrendingMovieCard from "@/components/TrendingMovieCard"
import BottomNav from "@/components/BottomNav"

interface Movie {
  id: number
  title: string
  poster: string
  rating: number
  duration: string
  description: string
}

export default function TrendingPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies")
        const data = await response.json()
        setMovies(data)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search"
            className="w-full bg-[#1a1a1a] text-white rounded-full py-3.5 pl-12 pr-12 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Mic className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Trending Header */}
        <div className="flex items-center gap-2 mb-6">
          <Flame className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
          <h1 className="text-[#FFD700] text-lg font-semibold">Trending</h1>
        </div>

        {/* Trending Movies List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
                <div className="bg-gray-800 aspect-[16/9] animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="bg-gray-800 h-5 w-3/4 rounded animate-pulse" />
                  <div className="bg-gray-800 h-4 w-1/2 rounded animate-pulse" />
                  <div className="bg-gray-800 h-16 rounded animate-pulse" />
                  <div className="bg-gray-800 h-10 rounded-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {movies.map((movie) => (
              <TrendingMovieCard
                key={movie.id}
                title={movie.title}
                poster={movie.poster}
                rating={movie.rating}
                duration={movie.duration}
                description={movie.description}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
