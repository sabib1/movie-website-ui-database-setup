"use client"

import { Home, Flame, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      router.push(href)
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-white/5 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-6">
        <button
          onClick={() => handleNavigation("/")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/" ? "text-white" : "text-gray-400"}`}
        >
          <Home className="w-6 h-6" fill={pathname === "/" ? "white" : "none"} />
          {pathname === "/" && <div className="w-1 h-1 rounded-full bg-white" />}
        </button>
        
        <button
          onClick={() => handleNavigation("/trending")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/trending" ? "text-white" : "text-gray-400"}`}
        >
          <Flame className="w-6 h-6" fill={pathname === "/trending" ? "white" : "none"} />
          {pathname === "/trending" && <div className="w-1 h-1 rounded-full bg-white" />}
        </button>
        
        <button
          onClick={() => handleNavigation("/profile")}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${pathname === "/profile" ? "text-white" : "text-gray-400"}`}
        >
          <User className="w-6 h-6" fill={pathname === "/profile" ? "white" : "none"} />
          {pathname === "/profile" && <div className="w-1 h-1 rounded-full bg-white" />}
        </button>
      </div>
    </nav>
  )
}