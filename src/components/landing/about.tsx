"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Play } from "lucide-react"

export default function AboutOverlay() {
  const aboutOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      if (aboutOverlayRef.current) {
        gsap.fromTo(
          aboutOverlayRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" },
        )
      }
    }

    loadGSAP()
  }, [])

  return (



<div className="relative z-30 bg-gradient-to-b from-[#f0f8ff]/90 to-transparent backdrop-blur-sm">
  {/* Your content */}
  
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        {/* User Stats */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white"></div>
          </div>
          <span className="text-gray-600 font-medium">59,182 Happy Users</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your AI Health Coach</h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your wellness journey with personalized AI-powered guidance that adapts to your unique needs.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-transparent"
          >
            <Play className="w-5 h-5" />
            Download
          </Button>
        </div>
      </div>
    </div>
  )
}
