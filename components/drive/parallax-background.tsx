"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"

interface ParallaxBackgroundProps {
  progress: MotionValue<number>
  variant: "mission" | "vision" | "values"
}

export function ParallaxBackground({ progress, variant }: ParallaxBackgroundProps) {
  // Different transform rates for parallax effect
  const slowTransform = useTransform(progress, [0, 1], [0, -30])
  const mediumTransform = useTransform(progress, [0, 1], [0, -60])
  const fastTransform = useTransform(progress, [0, 1], [0, -100])

  // Different rotation rates
  const slowRotate = useTransform(progress, [0, 1], [0, 10])
  const mediumRotate = useTransform(progress, [0, 1], [0, 25])
  const fastRotate = useTransform(progress, [0, 1], [0, 45])

  // Different scale rates
  const slowScale = useTransform(progress, [0, 1], [1, 1.1])
  const fastScale = useTransform(progress, [0, 1], [1, 1.2])

  // Set colors based on variant
  const getColors = () => {
    switch (variant) {
      case "mission":
        return {
          primary: "rgba(168, 85, 247, 0.15)",
          secondary: "rgba(139, 92, 246, 0.1)",
          accent: "rgba(216, 180, 254, 0.08)",
        }
      case "vision":
        return {
          primary: "rgba(45, 212, 191, 0.15)",
          secondary: "rgba(20, 184, 166, 0.1)",
          accent: "rgba(153, 246, 228, 0.08)",
        }
      case "values":
        return {
          primary: "rgba(99, 102, 241, 0.15)",
          secondary: "rgba(79, 70, 229, 0.1)",
          accent: "rgba(165, 180, 252, 0.08)",
        }
    }
  }

  const colors = getColors()

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large circle - slow movement */}
      <motion.div
        className="absolute rounded-full opacity-30"
        style={{
          width: "60vmin",
          height: "60vmin",
          top: "15%",
          right: "-10%",
          backgroundColor: colors.primary,
          y: slowTransform,
          rotate: slowRotate,
          scale: slowScale,
        }}
      />

      {/* Medium circle - medium movement */}
      <motion.div
        className="absolute rounded-full opacity-20"
        style={{
          width: "40vmin",
          height: "40vmin",
          bottom: "10%",
          left: "-5%",
          backgroundColor: colors.secondary,
          y: mediumTransform,
          rotate: mediumRotate,
          scale: fastScale,
        }}
      />

      {/* Small circles - fast movement */}
      <motion.div
        className="absolute rounded-full opacity-15"
        style={{
          width: "15vmin",
          height: "15vmin",
          top: "60%",
          right: "20%",
          backgroundColor: colors.accent,
          y: fastTransform,
          rotate: fastRotate,
        }}
      />

      {/* Dots pattern */}
      <motion.div
        className="absolute opacity-10"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `radial-gradient(${colors.primary} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          y: mediumTransform,
        }}
      />

      {/* Additional decorative elements based on variant */}
      {variant === "mission" && (
        <motion.div
          className="absolute w-40 h-40 md:w-64 md:h-64 opacity-10 border-2 border-purple-300"
          style={{
            top: "30%",
            left: "10%",
            y: fastTransform,
            rotate: mediumRotate,
          }}
        />
      )}

      {variant === "vision" && (
        <motion.div
          className="absolute w-40 h-40 md:w-64 md:h-64 opacity-10"
          style={{
            bottom: "20%",
            right: "15%",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            border: "2px solid rgba(45, 212, 191, 0.3)",
            y: mediumTransform,
            rotate: slowRotate,
          }}
        />
      )}

      {variant === "values" && (
        <>
          <motion.div
            className="absolute opacity-10"
            style={{
              width: "20vmin",
              height: "20vmin",
              top: "20%",
              left: "20%",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(165, 180, 252, 0.1) 100%)",
              y: slowTransform,
              rotate: fastRotate,
            }}
          />
          <motion.div
            className="absolute opacity-10"
            style={{
              width: "15vmin",
              height: "15vmin",
              bottom: "30%",
              right: "30%",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              border: "2px solid rgba(99, 102, 241, 0.3)",
              y: fastTransform,
              rotate: mediumRotate,
            }}
          />
        </>
      )}
    </div>
  )
}
