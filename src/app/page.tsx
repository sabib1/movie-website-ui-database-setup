"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Search, Mic, ChevronRight } from "lucide-react"
import MovieCard from "@/components/MovieCard"
import BottomNav from "@/components/BottomNav"

interface Movie {
  id: number
  title: string
  poster: string
  rating: number
  duration: string
  description: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white text-base mb-1">
              Hello Yunus <span className="inline-block">👋</span>
            </p>
            <h1 className="text-white text-2xl font-semibold leading-tight">
              What do you<br />want to watch<br />today?
            </h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
            <Image 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="Profile"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
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

        {/* Movie For You Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Movie For You</h2>
            <button className="text-white">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {loading ? (
            <div className="flex gap-4 overflow-x-auto custom-scrollbar">
              {[1, 2].map((i) => (
                <div key={i} className="flex-shrink-0 w-[160px]">
                  <div className="bg-gray-800 aspect-[2/3] rounded-2xl animate-pulse mb-2" />
                  <div className="bg-gray-800 h-4 rounded animate-pulse mb-1" />
                  <div className="bg-gray-800 h-3 w-20 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-4 overflow-x-auto custom-scrollbar pb-2 select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  poster={movie.poster}
                  rating={movie.rating}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}