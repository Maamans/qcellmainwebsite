"use client"

import Image from "next/image"
import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/navigation-two" 
import Footer from "@/components/footer"
import InternetPlansSlider from "@/components/internet/internet-plans-slider"
import InternetBenefits from "@/components/internet/internet-benefits"
import { api, getImageUrl } from "@/lib/api"

interface HeroSlide {
  id?: number
  image: string
  title: string
  subtitle: string
  cta?: { text: string; href: string }
}

interface HeroSlideResponse {
  id: number
  title: string | null
  description: string | null
  image: string
  ctaText: string | null
  ctaLink: string | null
  order: number
  isActive: boolean
  createdAt?: string
}

export default function InternetPage() {
  // set the document title
  useEffect(() => {
    document.title = 'Internet | QCell'
  }, [])

  // Fallback slides if backend is unavailable
  const fallbackSlides: HeroSlide[] = useMemo(() => [
    {
      image: "/images/qcell-network-two.png",
      title: "Speed. Freedom. Connection.",
      subtitle: "Unlock your world with powerful internet — anytime, anywhere.",
      cta: { text: "Explore Plans", href: "#plans" },
    },
    {
      image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1470&auto=format&fit=crop",
      title: "Ultra-fast 4G LTE",
      subtitle: "Stream, browse, and stay connected on the go with reliable speed.",
      cta: { text: "See 4G LTE", href: "#" },
    },
    {
      image: "https://images.unsplash.com/photo-1580584128409-44a1b8d59f86?q=80&w=1470&auto=format&fit=crop",
      title: "Fiber for Home & Business",
      subtitle: "Seamless connectivity for every device with QFiber and QFIBER.",
      cta: { text: "Discover Fiber", href: "#" },
    }
  ], []) 

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackSlides)
  const [currentHero, setCurrentHero] = useState(0)
  const [bodyHeight, setBodyHeight] = useState<string>("100vh")
  const [loading, setLoading] = useState(true)

  // Fetch hero slides from backend API
  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true)
        const slides = (await api.getHeroSlides("/internet")) as HeroSlideResponse[]

        const activeSlides = Array.isArray(slides)
          ? slides
              .filter((slide) => slide.isActive)
              .sort((a, b) => {
                // Sort by order if available, otherwise by createdAt (newest first), otherwise by ID
                if (a.order !== undefined && b.order !== undefined) {
                  return a.order - b.order
                }
                if (a.createdAt && b.createdAt) {
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
                return (b.id ?? 0) - (a.id ?? 0)
              })
          : []

        // Build slides from backend data
        const backendSlides: HeroSlide[] = activeSlides
          .map((slide) => {
            const sanitizedTitle = (slide.title || "").trim()
            const sanitizedDescription = (slide.description || "").trim()
            const sanitizedCta = (slide.ctaText || "").trim()
            const imageUrl = getImageUrl(slide.image)

            return {
              id: slide.id,
              image: imageUrl || "",
              title: sanitizedTitle || "Internet Services",
              subtitle: sanitizedDescription || "Stay connected with QCell",
              cta: {
                text: sanitizedCta || "Explore Plans",
                href: slide.ctaLink || "#plans",
              },
            }
          })
          .filter((slide) => slide.image && slide.image.trim() !== "") // Filter out slides with no image
          .slice(0, 3) // Limit backend slides to max 3

        // Combine backend slides with fallback slides, max 3 total
        const maxSlides = 3
        let finalSlides: HeroSlide[] = []

        // Use backend slides first (up to 3)
        if (backendSlides.length > 0) {
          finalSlides = backendSlides.slice(0, maxSlides)
          
          // If we have less than 3 backend slides, fill remaining slots with fallback slides
          if (finalSlides.length < maxSlides) {
            const remainingSlots = maxSlides - finalSlides.length
            const fallbackToAdd = fallbackSlides.slice(0, remainingSlots)
            finalSlides = [...finalSlides, ...fallbackToAdd]
          }
        } else {
          // If no backend slides, use fallback slides (max 3)
          finalSlides = fallbackSlides.slice(0, maxSlides)
        }

        setHeroSlides(finalSlides)
      } catch (error) {
        console.warn("Failed to fetch hero slides from backend, using fallback:", error)
        setHeroSlides(fallbackSlides)
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [fallbackSlides])
  
  useEffect(() => {
    if (heroSlides.length > 0) {
      const id = setInterval(() => {
        setCurrentHero((prev) => (prev + 1) % heroSlides.length)
      }, 6000)
      return () => clearInterval(id)
    }
  }, [heroSlides.length])

  useEffect(() => {
    if (typeof window !== "undefined" && document.body) {
      setBodyHeight(`${document.body.scrollHeight}px`)
    }
  }, [])

  return (
    <div>
      {/* Navigation */}
      <Navigation />
      <header className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Hero Slider */}
        <div className="relative min-h-screen">
          {/* Loading State */}
          {loading && heroSlides.length === 0 && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/80">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00] mx-auto mb-4"></div>
                <p className="text-white/80">Loading slides...</p>
              </div>
            </div>
          )}
          
          {/* Slide Images */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentHero}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                src={heroSlides[currentHero].image}
                alt={heroSlides[currentHero].title}
                fill
                className="object-cover object-center"
                priority={currentHero === 0}
                unoptimized
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#F98F1F]/30" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-20 md:px-12 lg:px-20">
            <div className="relative mx-auto w-full max-w-6xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight">
                    {heroSlides[currentHero].title}
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl lg:text-2xl leading-relaxed">
                    {heroSlides[currentHero].subtitle}
                  </p>
                  {heroSlides[currentHero].cta && (
                    <motion.a
                      href={heroSlides[currentHero].cta!.href}
                      className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {heroSlides[currentHero].cta!.text}
                    </motion.a>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>          

          {/* Navigation Dots */}
          <div className="pointer-events-auto absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentHero === i ? 'w-12 bg-white shadow-lg' : 'w-3 bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentHero(i)}
              />
            ))}
          </div>
        </div>        
      </header>

      <main className="bg-white">
        <section id="plans" className="w-full py-12 md:py-16 px-0">
          <InternetPlansSlider />
        </section>
        <section className="w-full py-12 md:py-16">
          <InternetBenefits />
        </section>
      </main>

      <Footer />

      <div
        className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
        style={{ height: bodyHeight }}
      ></div>
    </div>
  )
}