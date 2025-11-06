"use client"

import Image from "next/image"
import { Settings } from "lucide-react"
import BottomNav from "@/components/BottomNav"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-semibold">Profile</h1>
          <button className="text-white">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden mb-4">
            <Image 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <h2 className="text-white text-xl font-semibold mb-1">Yunus</h2>
          <p className="text-gray-400 text-sm">yunus@example.com</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-2xl p-4 text-center">
            <p className="text-white text-2xl font-bold mb-1">24</p>
            <p className="text-gray-400 text-xs">Movies</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-4 text-center">
            <p className="text-white text-2xl font-bold mb-1">48</p>
            <p className="text-gray-400 text-xs">Hours</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl p-4 text-center">
            <p className="text-white text-2xl font-bold mb-1">12</p>
            <p className="text-gray-400 text-xs">Favorites</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <button className="w-full bg-[#1a1a1a] text-white rounded-2xl p-4 text-left hover:bg-[#252525] transition-colors">
            My Watchlist
          </button>
          <button className="w-full bg-[#1a1a1a] text-white rounded-2xl p-4 text-left hover:bg-[#252525] transition-colors">
            Favorites
          </button>
          <button className="w-full bg-[#1a1a1a] text-white rounded-2xl p-4 text-left hover:bg-[#252525] transition-colors">
            Settings
          </button>
          <button className="w-full bg-[#1a1a1a] text-white rounded-2xl p-4 text-left hover:bg-[#252525] transition-colors">
            Help & Support
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
