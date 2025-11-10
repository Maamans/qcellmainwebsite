"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"
import { Eye } from "lucide-react"
import { ParallaxBackground } from "./parallax-background"

interface VisionSectionProps {
  progress: MotionValue<number>
  isMobile: boolean
}

export function VisionSection({ progress }: VisionSectionProps) {
  // Transform progress to x position (slide in from right, out to left)
  const x = useTransform(progress, [0, 0.5, 1], ["100%", "0%", "-100%"])

  // Transform progress to opacity
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  // Background color transition
  const backgroundColor = useTransform(progress, [0, 1], ["rgba(30, 41, 59, 1)", "rgba(15, 23, 42, 1)"])

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ x, opacity, backgroundColor }}>
      <ParallaxBackground progress={progress} variant="vision" />
      <div className="max-w-4xl w-full px-6 md:px-10">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-teal-500/20 p-5 rounded-full mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Eye className="w-10 h-10 text-teal-300" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Vision
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A Gambia where everyone — everywhere — can access fast, reliable communication.
          </motion.p>

          <motion.div
            className="mt-12 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-16 h-1 bg-teal-400 rounded-full mr-4" />
            <p className="text-teal-300 text-sm uppercase tracking-wider font-medium">Keep scrolling</p>
            <div className="w-16 h-1 bg-teal-400 rounded-full ml-4" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
