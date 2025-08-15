"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axiosInstance from "@/lib/axios"

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const subtitleRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const ctaRefs = useRef<(HTMLButtonElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      // Initial load animation
      if (containerRef.current && !isLoaded) {
        gsap.set(containerRef.current, { opacity: 0 })
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })

        // Animate first slide content
        animateSlideContent(0, gsap)
        setIsLoaded(true)
      }
    }

    loadGSAP()
  }, [isLoaded])

  const animateSlideContent = async (slideIndex: number, gsap?: any) => {
    if (!gsap) {
      const { gsap: importedGsap } = await import("gsap")
      gsap = importedGsap
    }

    const title = titleRefs.current[slideIndex]
    const subtitle = subtitleRefs.current[slideIndex]
    const cta = ctaRefs.current[slideIndex]
    const image = imageRefs.current[slideIndex]

    if (title && subtitle && cta && image) {
      // Reset positions
      gsap.set([title, subtitle, cta], {
        opacity: 0,
        y: 50,
        scale: 0.9,
      })
      gsap.set(image, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
      })

      // Create timeline for smooth sequential animation
      const tl = gsap.timeline()

      // Image animation
      tl.to(image, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      })

      // Text animations with stagger
      tl.to(
        title,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      )

      tl.to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      )

      tl.to(
        cta,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2",
      )
    }
  }

  const nextSlide = async () => {
    const newSlide = (currentSlide + 1) % banners.length

    // Animate out current slide
    const { gsap } = await import("gsap")
    const currentTitle = titleRefs.current[currentSlide]
    const currentSubtitle = subtitleRefs.current[currentSlide]
    const currentCta = ctaRefs.current[currentSlide]

    if (currentTitle && currentSubtitle && currentCta) {
      await gsap.to([currentTitle, currentSubtitle, currentCta], {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.in",
      })
    }

    setCurrentSlide(newSlide)

    // Animate in new slide
    setTimeout(() => {
      animateSlideContent(newSlide, gsap)
    }, 100)
  }

  const prevSlide = async () => {
    const newSlide = currentSlide === 0 ? banners.length - 1 : currentSlide - 1

    // Animate out current slide
    const { gsap } = await import("gsap")
    const currentTitle = titleRefs.current[currentSlide]
    const currentSubtitle = subtitleRefs.current[currentSlide]
    const currentCta = ctaRefs.current[currentSlide]

    if (currentTitle && currentSubtitle && currentCta) {
      await gsap.to([currentTitle, currentSubtitle, currentCta], {
        opacity: 0,
        x: 30,
        duration: 0.3,
        ease: "power2.in",
      })
    }

    setCurrentSlide(newSlide)

    // Animate in new slide
    setTimeout(() => {
      animateSlideContent(newSlide, gsap)
    }, 100)
  }

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index)
      setTimeout(() => {
        animateSlideContent(index)
      }, 100)
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])
  

  const [banners, setBanners] = useState([]);
  useEffect(() => {
    axiosInstance.get('/heros')
    .then(response => {
      console.log(response,"okkk");
      setBanners(response.data.data.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  console.log(banners,"banners");
  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides */}
      {banners.map((banner: any, index: number) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            ref={(el) => (imageRefs.current[index] = el) as any }
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${banner.image.secure_url})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

         
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
