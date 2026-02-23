"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { api, getImageUrl, getVideoUrl } from "@/lib/api"

type SlideCTA = {
  text: string
  href: string
}

type SlideData = {
  id?: string | number
  backgroundImage: string
  video?: string
  title: string
  description: string
  cta: {
    primary: SlideCTA
    secondary?: SlideCTA
  }
}

type HeroSlideResponse = {
  id: number
  title: string | null
  description: string | null
  image: string
  video?: string | null
  ctaText: string | null
  ctaLink: string | null
  order?: number | null
  isActive: boolean
  createdAt?: string
}

// Hardcoded hero slides for promotions page
const hardcodedSlides: SlideData[] = [
  {
    id: "promo-hardcoded-1",
    backgroundImage: "/images/tokenbrowse.jpg",
    video: "/videos/promotion1.mp4",
    title: "Unbeatable Offers Just for You!",
    description: "Big offers. Bigger wins. Only from QCell.",
    cta: {
      primary: { text: "Explore Promotions", href: "#promotions" },
      secondary: { text: "Learn More", href: "/promotions" },
    },
  },
  {
    id: "promo-hardcoded-2",
    backgroundImage: "/images/databunya.jpg",
    video: "/videos/promotion2.mp4",
    title: "Recharge and Win Big!",
    description: "Every top-up brings you closer to amazing rewards.",
    cta: {
      primary: { text: "Recharge Now", href: "#promotions" },
      secondary: { text: "See Offers", href: "/promotions" },
    },
  },
  {
    id: "promo-hardcoded-3",
    backgroundImage: "/images/qnite.jpg",
    title: "Browse All Night for Less!",
    description: "Nighttime data at unbeatable prices—only on Qnite.",
    cta: {
      primary: { text: "Get QNite", href: "#promotions" },
      secondary: { text: "View Plans", href: "/promotions" },
    },
  },
]

const AUTO_ROTATE_INTERVAL = 5000 // 5 seconds

/**
 * Merge backend slides with hardcoded slides
 * Ensures BOTH backend and hardcoded slides are shown together
 * Backend slides are shown first, then hardcoded slides
 */
const mergeSlides = (backend: SlideData[], hardcoded: SlideData[]): SlideData[] => {
  // Start with backend slides first (if they exist)
  const merged: SlideData[] = []
  
  // Add all backend slides
  backend.forEach(slide => {
    if (slide && slide.id) {
      merged.push(slide)
    }
  })
  
  // Then add all hardcoded slides (maintaining both sets)
  hardcoded.forEach(slide => {
    if (slide && slide.id) {
      merged.push(slide)
    }
  })
  
  return merged
}

export default function PromotionsHeroSlider() {
  const [slides, setSlides] = useState<SlideData[]>(hardcodedSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const videoRefs = useRef<{ [key: string | number]: HTMLVideoElement | null }>({})

  // Fetch hero slides from backend for promotions page
  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true)
        const response = (await api.getHeroSlides("/promotions")) as HeroSlideResponse[]
        
        const activeSlides =
          Array.isArray(response) && response.length
            ? response
                .filter((slide) => slide.isActive)
                .sort((a, b) => {
                  // Sort by order if available, then by createdAt (newest first), then by ID
                  if (typeof a.order === 'number' && typeof b.order === 'number' && a.order !== b.order) {
                    return a.order - b.order
                  }
                  const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
                  const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
                  if (dateA && dateB) return dateB - dateA
                  return (b.id ?? 0) - (a.id ?? 0)
                })
            : []

        // Normalize backend slides
        const backendSlides: SlideData[] = activeSlides.map((slide) => {
          const title = (slide.title ?? "").trim()
          const hideTitle = title.toLowerCase() === "promotions slide" || title.toLowerCase() === "promotion slide"
          const description = (slide.description ?? "").trim()
          const primaryText = (slide.ctaText ?? "").trim() || "Explore Promotions"
          const videoUrl = slide.video ? getVideoUrl(slide.video) : undefined

          return {
            id: slide.id,
            backgroundImage: getImageUrl(slide.image) || "",
            video: videoUrl || undefined,
            title: hideTitle ? "" : title,
            description,
            cta: {
              primary: { text: primaryText, href: slide.ctaLink || "#promotions" },
              secondary: { text: "Learn More", href: "/promotions" },
            },
          }
        })

        // Merge backend and hardcoded slides (both are maintained)
        const merged = mergeSlides(backendSlides, hardcodedSlides)
        setSlides(merged)
      } catch (error) {
        console.error("Failed to load hero slides:", error)
        // Use hardcoded slides on error
        setSlides(hardcodedSlides)
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [])

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, AUTO_ROTATE_INTERVAL)

    return () => clearInterval(timer)
  }, [slides.length])

  // Handle video playback when slide changes
  useEffect(() => {
    // Pause all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause()
      }
    })

    // Play current slide's video if it exists
    const currentSlideData = slides[currentSlide]
    if (currentSlideData?.video && currentSlideData.id) {
      const video = videoRefs.current[currentSlideData.id]
      if (video) {
        video.currentTime = 0
        video.play().catch((error) => {
          console.warn("Failed to autoplay video:", error)
        })
      }
    }
  }, [currentSlide, slides])

  // Reset current slide if it's out of bounds
  useEffect(() => {
    if (currentSlide >= slides.length && slides.length > 0) {
      setCurrentSlide(0)
    }
  }, [currentSlide, slides.length])

  const slidesToRender = useMemo(() => (slides.length ? slides : hardcodedSlides), [slides])

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slidesToRender.length) {
      setCurrentSlide(index)
    }
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesToRender.length) % slidesToRender.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesToRender.length)
  }

  if (loading && slidesToRender.length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-black">
        <p className="text-white/80 text-lg">Loading promotions...</p>
      </div>
    )
  }

  const currentSlideData = slidesToRender[currentSlide]

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentSlideData?.id ?? currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background: Video or Image */}
          {currentSlideData?.video ? (
            <video
              ref={(el) => {
                if (currentSlideData.id) {
                  videoRefs.current[currentSlideData.id] = el
                }
              }}
              className="absolute inset-0 w-full h-full object-cover"
              poster={currentSlideData.backgroundImage}
              loop
              muted
              playsInline
              autoPlay
            >
              <source src={currentSlideData.video} type="video/mp4" />
              <source src={currentSlideData.video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={currentSlideData?.backgroundImage || "/placeholder.svg"}
              alt={currentSlideData?.title || "Promotion slide"}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              unoptimized
              sizes="100vw"
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          {currentSlideData?.title && (
            <motion.h1
              key={`title-${currentSlide}`}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {currentSlideData.title}
            </motion.h1>
          )}
          {currentSlideData?.description && (
            <motion.p
              key={`desc-${currentSlide}`}
              className="mt-4 max-w-2xl text-lg md:text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentSlideData.description}
            </motion.p>
          )}
          <motion.div
            key={`cta-${currentSlide}`}
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentSlideData?.cta?.primary && (
              <Link
                href={currentSlideData.cta.primary.href || "#"}
                className="rounded-md bg-[#F98F1F] px-6 py-3 font-medium text-white transition-colors hover:bg-[#CD7F32]/90"
              >
                {currentSlideData.cta.primary.text}
              </Link>
            )}
            {currentSlideData?.cta?.secondary && (
              <Link
                href={currentSlideData.cta.secondary.href || "#"}
                className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                {currentSlideData.cta.secondary.text}
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slidesToRender.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slidesToRender.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slidesToRender.map((slide, index) => (
            <button
              key={slide.id ?? index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

