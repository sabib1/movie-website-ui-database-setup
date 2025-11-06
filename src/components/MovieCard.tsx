"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface MovieCardProps {
  title: string
  poster: string
  rating: number
}

export default function MovieCard({ title, poster, rating }: MovieCardProps) {
  return (
    <div className="flex-shrink-0 w-[160px]">
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-2">
        <Image 
          src={poster} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-white text-sm font-medium mb-1 truncate">{title}</h3>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < rating ? "fill-[#FFD700] text-[#FFD700]" : "fill-gray-600 text-gray-600"}`}
          />
        ))}
      </div>
    </div>
  )
}
