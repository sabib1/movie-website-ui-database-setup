"use client"

import Image from "next/image"
import { Star, Clock } from "lucide-react"

interface TrendingMovieCardProps {
  title: string
  poster: string
  rating: number
  duration: string
  description: string
}

export default function TrendingMovieCard({ 
  title, 
  poster, 
  rating, 
  duration, 
  description 
}: TrendingMovieCardProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden mb-4">
      <div className="relative aspect-[16/9] w-full">
        <Image 
          src={poster} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-[#FFD700] text-[#FFD700]" : "fill-gray-600 text-gray-600"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>Duration {duration}</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <button className="w-full bg-[#FFD700] text-black font-semibold py-2.5 rounded-full hover:bg-[#FFC700] transition-colors">
          Watch Now
        </button>
      </div>
    </div>
  )
}
