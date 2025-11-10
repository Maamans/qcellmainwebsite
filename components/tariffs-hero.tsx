"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

export default function TariffsHero() {
  const controls = useAnimation()
  const imageControls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      // First animate the image
      await imageControls.start("visible")
      // Then animate the card and text
      await controls.start("visible")
    }
    sequence()
  }, [controls, imageControls])

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.8,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
      },
    },
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image with Animation */}
      <motion.div className="absolute inset-0" initial="hidden" animate={imageControls} variants={imageVariants}>
        <Image
          src="/images/voice-tariffs.jpg"
          alt="Woman making a phone call"
          fill
          className="object-cover object-left sm:object-center"
          priority
        />
      </motion.div>

      {/* Slanted semi-transparent black card with text */}
      <div className="absolute inset-0 flex items-center justify-end">
        <motion.div
          className="relative w-full md:w-[55%] lg:w-[45%] h-full flex items-center justify-center overflow-hidden"
          initial="hidden"
          animate={controls}
          variants={cardVariants}
        >
          {/* Slanted overlay */}
          
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-60 transform origin-left -skew-y-12"
            initial={{ skewY: 0, height: "0" }}
            animate={{ skewY: -12, height: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut",}}
            variants={{
              hidden: { skewY: -12, height: "100%" },
              visible: { skewY: 0, height: "100%" },
            }}
          ></motion.div>

          {/* Text content */}
          <motion.div
            className="relative z-10 px-8 md:px-12"
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            <h1 className="text-white text-6xl md:text-7xl lg:text-6xl font-bold leading-tight">
              Tariffs that fit your pocket
            </h1>
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

        