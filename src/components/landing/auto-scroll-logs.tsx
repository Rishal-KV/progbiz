"use client"

import Marquee from "react-fast-marquee"

export default function AutoScrollLogos() {
  const logos = [
    { name: "Logoipsum", icon: "🏢" },
    { name: "Logoipsum", icon: "⭐" },
    { name: "Logoipsum", icon: "🚀" },
    { name: "Logoipsum", icon: "💎" },
    { name: "Logoipsum", icon: "🎯" },
    { name: "Logoipsum", icon: "🔥" },
    { name: "Logoipsum", icon: "⚡" },
    { name: "Logoipsum", icon: "🌟" },
  ]

  return (
    <div className="w-full bg-muted/30 py-8 px-10 mx-auto mt-10">
      <Marquee gradient={false} speed={50}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 mx-8 text-muted-foreground"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">
              {logo.icon}
            </div>
            <span className="text-lg font-medium whitespace-nowrap">{logo.name}</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
