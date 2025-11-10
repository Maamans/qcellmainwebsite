"use client"

import { useState, useEffect } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { Pause, Play } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    title: "Balance Poses",
    service: "QFitness+",
    image: "/images/one.jpg",
  },
  {
    id: 2,
    title: "Alpha",
    service: "QMusic",
    image: "/images/two.jpg",
  },
  {
    id: 3,
    title: "NBA 2K25 Arcade Edition",
    service: "QGaming",
    image: "/images/one.jpg",
  },
  {
    id: 4,
    title: "Strength with Greg",
    service: "QFitness+",
    image: "/images/two.jpg" //"/placeholder.svg?height=400&width=600",
  },
  // Duplicate items for infinite scroll effect
  {
    id: 5,
    title: "Balance Poses",
    service: "QFitness+",
    image: "/images/one.jpg",
  },
  {
    id: 6,
    title: "Alpha",
    service: "QMusic",
    image: "/images/two.jpg",
  },
  {
    id: 7,
    title: "NBA 2K25 Arcade Edition",
    service: "QGaming",
    image: "/images/one.jpg",
  },
  {
    id: 8,
    title: "Strength with Greg",
    service: "QFitness+",
    image: "/images/two.jpg",
  },
]

export default function InfiniteSlider() {
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()

  const baseTransition = {
    duration: 30,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "loop" as const,
  }

  const getTransition = () => ({
    x: {
      ...baseTransition,
      duration: isHovered ? 40 : 40,
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
  }, [isPaused, isHovered, startAnimation]) // Added startAnimation to dependencies

  return (
    <div className="relative h-[380px] pt-5 w-screen overflow-hidden bg-orange-200 bg-white/90 shadow-lg backdrop-blur-sm"> {/*bg-white/90 bg-orange-200 */}
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
            className="relative aspect-video w-[600px]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image src={item.image} alt={item.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.service}</p>
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