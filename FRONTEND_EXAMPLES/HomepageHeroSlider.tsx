"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import { api, getImageUrl } from "@/lib/api"

type SlideCTA = {
  text: string
  href: string
}

type SlideData = {
  id?: string | number
  backgroundImage: string
  title: string
  description: string
  cta: {
    primary: SlideCTA
    secondary: SlideCTA
  }
}

type HeroSlideResponse = {
  id: number
  title: string | null
  description: string | null
  image: string
  ctaText: string | null
  ctaLink: string | null
  order?: number | null
  isActive: boolean
  createdAt?: string
}

const fallbackSlides: SlideData[] = [
  {
    backgroundImage: "/images/expand your world 1.jpg",
    title: "Expand Your World with Seamless Connectivity",
    description:
      "Experience the fastest, cheapest, and most reliable network in Sierra Leone. Empowering your digital journey, one connection at a time.",
    cta: {
      primary: { text: "Explore Plans", href: "#" },
      secondary: { text: "Learn more about us", href: "#" },
    },
  },
  {
    backgroundImage: "/images/hero-bg-2.jpg",
    title: "Unleash the Power of 4G",
    description: "Surf, stream, and connect at lightning speeds with our cutting-edge 4G network.",
    cta: {
      primary: { text: "Get 4G Now", href: "#" },
      secondary: { text: "Compare Plans", href: "#" },
    },
  },
  {
    backgroundImage: "/images/hero-bg-3.jpg",
    title: "Join the Qcell Family",
    description: "Be part of Sierra Leone's fastest-growing network and enjoy unparalleled services and support.",
    cta: {
      primary: { text: "Sign Up Today", href: "#" },
      secondary: { text: "See Our Offers", href: "#" },
    },
  },
]

const MAX_SLIDES = 3

export default function HomepageHeroSlider() {
  const [slides, setSlides] = useState<SlideData[]>(fallbackSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true)
        const response = (await api.getHeroSlides("/")) as HeroSlideResponse[]
        const activeSlides =
          Array.isArray(response) && response.length
            ? response
                .filter((slide) => slide.isActive)
                .sort((a, b) => {
                  const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
                  const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
                  if (dateA && dateB) return dateB - dateA
                  return (b.id ?? 0) - (a.id ?? 0)
                })
            : []

        const normalizedSlides: SlideData[] = activeSlides.map((slide) => {
          const title = (slide.title ?? "").trim()
          const hideTitle = title.toLowerCase() === "homepage slide"
          const description = (slide.description ?? "").trim()
          const primaryText = (slide.ctaText ?? "").trim() || "Explore Plans"

          return {
            id: slide.id,
            backgroundImage: getImageUrl(slide.image) || "",
            title: hideTitle ? "" : title,
            description,
            cta: {
              primary: { text: primaryText, href: slide.ctaLink || "#" },
              secondary: { text: "Learn more about us", href: "#" },
            },
          }
        })

        const mergedSlides =
          normalizedSlides.length > 0
            ? [...normalizedSlides, ...fallbackSlides].slice(0, MAX_SLIDES)
            : fallbackSlides.slice(0, MAX_SLIDES)

        setSlides(mergedSlides)
      } catch (error) {
        console.error("Failed to load hero slides:", error)
        setSlides(fallbackSlides)
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    if (currentSlide >= slides.length && slides.length > 0) {
      setCurrentSlide(0)
    }
  }, [currentSlide, slides.length])

  const slidesToRender = useMemo(() => (slides.length ? slides : fallbackSlides), [slides])

  if (loading && slidesToRender.length === 0) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-black">
        <p className="text-white/80 text-lg">Loading hero content...</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen">
      <AnimatePresence initial={false}>
        <motion.div
          key={slidesToRender[currentSlide]?.id ?? currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={slidesToRender[currentSlide]?.backgroundImage || "/placeholder.svg"}
            alt={slidesToRender[currentSlide]?.title || "Hero slide"}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slidesToRender[currentSlide]?.title}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {slidesToRender[currentSlide]?.description}
          </motion.p>
          <motion.div
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href={slidesToRender[currentSlide]?.cta.primary.href || "#"}
              className="rounded-md bg-[#F98F1F] px-6 py-3 font-medium text-white transition-colors hover:bg-[#CD7F32]/90"
            >
              {slidesToRender[currentSlide]?.cta.primary.text}
            </Link>
            <Link
              href={slidesToRender[currentSlide]?.cta.secondary.href || "#"}
              className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              {slidesToRender[currentSlide]?.cta.secondary.text}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex space-x-2">
        {slidesToRender.map((slide, index) => (
          <button
            key={slide.id ?? index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


