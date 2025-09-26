"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

export default function TariffsHeroAlternative() {
  const controls = useAnimation()
  const imageControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      // First animate the image with a slight delay
      imageControls.start("visible")
      // Then animate the card
      setTimeout(() => {
        controls.start("visible")
      }, 300)
    }
    sequence()
  }, [controls, imageControls])

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.6, 0.05, 0.01, 0.99],
      },
    },
  }

  const cardVariants = {
    hidden: { width: "0%", opacity: 1 },
    visible: {
      width: "55%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for a nice reveal
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
      },
    },
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Animation */}
      <motion.div className="absolute inset-0" initial="hidden" animate={imageControls} variants={imageVariants}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tarrifsthatfityourpocket-MI7taBkgFqtriM6G7DK6A44Or7D02W.png"
          alt="Woman making a phone call"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Slanted semi-transparent black card with text */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden">
        <motion.div
          className="relative h-full flex items-center justify-center overflow-visible"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
        >
          {/* Slanted overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-60 transform origin-top-left"
            style={{ transform: "skewX(-12deg)", marginLeft: "-5%" }}
          ></div>

          {/* Text content */}
          <motion.div
            className="relative z-10 px-8 md:px-12"
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Tariffs that fit your pocket
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <button className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
                Explore Options
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
