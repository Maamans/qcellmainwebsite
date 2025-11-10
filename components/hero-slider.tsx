"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import AnimatedHeroText from "./animated-hero-text"

interface SlideData {
  backgroundImage: string
  title: string
  description: string
  cta: {
    primary: { text: string; href: string }
    secondary: { text: string; href: string }
  }
}

const slides: SlideData[] = [
  {
    backgroundImage: "/images/hero-bg-1.jpg",
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

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={slides[currentSlide].backgroundImage || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <AnimatedHeroText text={slides[currentSlide].title} />
          <motion.p
            className="mt-4 max-w-xl text-lg text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {slides[currentSlide].description}
          </motion.p>
          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href={slides[currentSlide].cta.primary.href}
              className="rounded-md bg-[#F98F1F] px-6 py-3 font-medium text-white transition-colors hover:bg-[#CD7F32]/90"
            >
              {slides[currentSlide].cta.primary.text}
            </Link>
            <Link
              href={slides[currentSlide].cta.secondary.href}
              className="rounded-md border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              {slides[currentSlide].cta.secondary.text}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}