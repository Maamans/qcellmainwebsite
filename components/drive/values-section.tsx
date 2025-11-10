"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"
import { Heart, Lightbulb, Shield, Wifi, TrendingUp } from "lucide-react"
import { ParallaxBackground } from "./parallax-background"

interface ValuesSectionProps {
  progress: MotionValue<number>
  isMobile: boolean
}

export function ValuesSection({ progress }: ValuesSectionProps) {
  // Transform progress to x position (slide in from right)
  const x = useTransform(progress, [0, 0.5], ["100%", "0%"])

  // Transform progress to opacity
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 1])

  // Background color transition
  const backgroundColor = useTransform(progress, [0, 1], ["rgba(15, 23, 42, 1)", "rgba(15, 23, 42, 1)"])

  const values = [
    { name: "Community", icon: Heart, color: "bg-pink-500/20", textColor: "text-pink-300" },
    { name: "Innovation", icon: Lightbulb, color: "bg-yellow-500/20", textColor: "text-yellow-300" },
    { name: "Integrity", icon: Shield, color: "bg-blue-500/20", textColor: "text-blue-300" },
    { name: "Reliability", icon: Wifi, color: "bg-green-500/20", textColor: "text-green-300" },
    { name: "Growth", icon: TrendingUp, color: "bg-purple-500/20", textColor: "text-purple-300" },
  ]

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ x, opacity, backgroundColor }}>
      <ParallaxBackground progress={progress} variant="values" />
      <div className="max-w-4xl w-full px-6 md:px-10">
        <motion.div className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Values
          </motion.h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {values.map((value, index) => {
              const Icon = value.icon

              return (
                <motion.div
                  key={value.name}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className={`${value.color} p-4 rounded-full mb-4`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                    }}
                  >
                    <Icon className={`w-6 h-6 ${value.textColor}`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.name}</h3>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
