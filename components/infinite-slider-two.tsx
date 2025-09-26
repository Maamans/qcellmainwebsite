"use client"

import { useState, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { Pause, Play } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Samuel Bindi",
    tagline: "Connected Everywhere",
    service: "Instant Roaming",
    testimonial: "Instant Roaming by QCell SL keeps me connected on all my travels—no matter where I go, I'm always in touch.",
    image: "/images/one.jpg",
  },
  {
    id: 2,
    name: "Khalil Bah",
    tagline: "Global Connectivity Made Easy",
    service: "List of Roaming Partners",
    testimonial: "The extensive list of roaming partners ensures I never lose signal when I'm abroad. It's perfect for a frequent traveler like me.",
    image: "/images/two.jpg",
  },
  {
    id: 3,
    name: "Paul M. K. Mansaray",
    tagline: "Community First",
    service: "CUG (Closed User Group)",
    testimonial: "With QCell SL's CUG, I can call my family and neighbors at affordable rates, keeping our community closely connected.",
    image: "/images/one.jpg",
  },
  {
    id: 4,
    name: "Kunmi",
    tagline: "Speed for Life",
    service: "QFiber",
    testimonial: "QFiber has transformed my home internet experience with its blazing-fast speeds, making work and online learning effortless.",
    image: "/images/two.jpg",
  },
  {
    id: 5,
    name: "Amara Conteh",
    tagline: "Value in Every Connection",
    service: "VAS Offers",
    testimonial: "QCell SL's VAS offers add extra value to my everyday use—every call and data session comes with bonus benefits.",
    image: "/images/one.jpg",
  },
  {
    id: 6,
    name: "Fatmata Koroma",
    tagline: "Future Ready",
    service: "ESIM",
    testimonial: "Switching to the ESIM was seamless. It's flexible, modern, and fits perfectly with my dynamic mobile lifestyle.",
    image: "/images/two.jpg",
  },
  {
    id: 7,
    name: "Alhassan Kamara",
    tagline: "Bundle Up for More",
    service: "TOK BOKU BOKU BUNDLE",
    testimonial: "The TOK BOKU BOKU BUNDLE offers me unbeatable data deals and simplicity. It's my go-to for everyday browsing and streaming.",
    image: "/images/one.jpg",
  },
  {
    id: 8,
    name: "Mariama Sesay",
    tagline: "Data That Delivers",
    service: "Data Bundle",
    testimonial: "QCell SL's Data Bundle is both affordable and reliable, making it easy to manage my online activities without surprises.",
    image: "/images/two.jpg",
  },
  {
    id: 9,
    name: "Sorie Jalloh",
    tagline: "Credit When You Need It",
    service: "Tros Mi Topup",
    testimonial: "Tros Mi Topup has been a lifesaver—allowing me to borrow credit for calls or data instantly, all without any interest.",
    image: "/images/one.jpg",
  },
  {
    id: 10,
    name: "Abdul Sesay",
    tagline: "Fresh Start, Every Time",
    service: "New Sim Pack",
    testimonial: "The New Sim Pack offers a hassle-free activation process and instant connectivity, ensuring I'm always ready to connect.",
    image: "/images/two.jpg",
  },
  {
    id: 11,
    name: "Ibrahim Mansaray",
    tagline: "Small Business, Big Impact",
    service: "SMB",
    testimonial: "QCell SL's SMB services empower my business with reliable connectivity and innovative digital solutions, driving my growth every day.",
    image: "/images/one.jpg",
  },
  {
    id: 12,
    name: "Aminata Turay",
    tagline: "Empower Your Day",
    service: "QPower",
    testimonial: "With QPower, I experience uninterrupted service that keeps all my devices charged and my day running smoothly.",
    image: "/images/two.jpg",
  },
  // Duplicate items for infinite scroll effect
  {
    id: 13,
    name: "Samuel Bindi",
    tagline: "Connected Everywhere",
    service: "Instant Roaming",
    testimonial: "Instant Roaming by QCell SL keeps me connected on all my travels—no matter where I go, I'm always in touch.",
    image: "/images/one.jpg",
  },
  {
    id: 14,
    name: "Khalil Bah",
    tagline: "Global Connectivity Made Easy",
    service: "List of Roaming Partners",
    testimonial: "The extensive list of roaming partners ensures I never lose signal when I'm abroad. It's perfect for a frequent traveler like me.",
    image: "/images/two.jpg",
  },
  {
    id: 15,
    name: "Paul M. K. Mansaray",
    tagline: "Community First",
    service: "CUG (Closed User Group)",
    testimonial: "With QCell SL's CUG, I can call my family and neighbors at affordable rates, keeping our community closely connected.",
    image: "/images/one.jpg",
  },
  {
    id: 16,
    name: "Kunmi",
    tagline: "Speed for Life",
    service: "QFiber",
    testimonial: "QFiber has transformed my home internet experience with its blazing-fast speeds, making work and online learning effortless.",
    image: "/images/two.jpg",
  },
]

export default function InfiniteSlider() {
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()

  const baseTransition = {
    duration: 60, // Increased duration for more items
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "loop" as const,
  }

  const getTransition = () => ({
    x: {
      ...baseTransition,
      duration: isHovered ? 80 : 60, // Adjusted hover duration
    },
  })

  const startAnimation = () => {
    controls.start({ x: "-50%" })
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (isPaused) {
      startAnimation()
    } else {
      controls.stop()
    }
  }

  useEffect(() => {
    if (!isPaused) {
      startAnimation()
    }
  }, [isPaused, isHovered])

  return (
    <div className="relative h-[380px] pt-5 w-screen overflow-hidden bg-white/90 shadow-lg backdrop-blur-sm">
      <motion.div
        className="flex gap-4"
        style={{
          width: "fit-content",
        }}
        animate={controls}
        initial={{
          x: "0%",
        }}
        transition={getTransition()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            className="relative aspect-video w-[600px] flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image src={item.image} alt={item.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">{item.name} - {item.tagline}</h3>
              {/*<p className="text-sm font-medium text-white/90">{item.tagline}</p>*/}
              <p className="mt-1 text-sm font-medium text-white">{item.service}</p>
              <p className="mt-2 text-sm text-white/80 italic">&quot;{item.testimonial}&quot;</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute bottom-8 right-8">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePause}
          className="h-10 w-10 rounded-full border-white/20 bg-black/30 text-white backdrop-blur-sm hover:bg-black/40 hover:text-white"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          <span className="sr-only">{isPaused ? "Play" : "Pause"} slideshow</span>
        </Button>
      </div>
    </div>
  )
}