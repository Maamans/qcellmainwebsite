"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Navigation from "@/components/nav"
import Timeline from "@/components/timeline/timeline"
import QCellAboutSection from "@/components/qcell-about-section"
import Footer from "@/components/footer"

export default function AboutPage() {

  useEffect(() => {
    document.title = 'About Us'
  }, [])

  const [windowHeight, setWindowHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get scroll progress for the entire page
  const { scrollYProgress } = useScroll()

  // Create spring-based animations for smooth movement
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform values based on smooth scroll (shorter travel for balloon)
  const yPosition = useTransform(smoothScrollYProgress, [0, 1], [windowHeight * 0.1, windowHeight * 0.9])

  const scaleValue = useTransform(smoothScrollYProgress, [0, 0.3, 0.7, 1], [1, 0.95, 0.9, 0.9])

  // Add subtle horizontal movement for realism
  const xMovement = useTransform(smoothScrollYProgress, [0, 0.3, 0.7, 1], [0, -20, 10, -5])

  // Subtle continuous floating animation
  const floatY = useRef(0)
  const [floatOffset, setFloatOffset] = useState(0)

  // Update window height on mount and handle resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Create subtle floating animation
    const floatInterval = setInterval(() => {
      floatY.current = Math.sin(Date.now() / 1000) * 10
      setFloatOffset(floatY.current)
    }, 16) // ~60fps

    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(floatInterval)
    }
  }, [])

  return (
    <>
    <div ref={containerRef} className="min-h-screen">
      {/* Header */}
    
      {/* Floating Balloon - Fixed position to follow scroll */}
      <motion.div
        className="fixed left-1/2 z-10 w-[80%] max-w-md pointer-events-none"
        style={{
          x: xMovement,
          y: yPosition,
          scale: scaleValue,
          translateX: "-50%",
          translateY: floatOffset,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 30,
          mass: 1,
        }}
      >
        <Image
          src="/images/balloon.png"
          alt="QCell Balloon"
          width={800}
          height={2000}
          className="w-full h-auto"
          priority
          unoptimized
        />
      </motion.div>
    
      <Navigation page="about-us"/>
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-br from-white via-blue-50 to-sky-100">
        {/* Clean, bright background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-sky-50/50 to-white/80"></div>
        
        {/* Subtle cloud background with reduced opacity */}
        <div className="absolute inset-0 bg-[url('/images/clouds-bg.png')] bg-cover bg-center opacity-20"></div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 px-4">
          <motion.h1
            className="text-5xl text-gray-900 md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Salone Pride
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl max-w-3xl text-gray-700 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Rooted in our people, our culture, and our future
          </motion.p>
        </div>
      </section>

  {/* Hero Section End */}

  {/* QCell About Section */}
  <QCellAboutSection />

  {/* Timeline Section */}
  <Timeline />

    {/*<VerticalAccordion />*/}
    {/*<WhatDrivesUs />*/}
    </div>
    {typeof window !== "undefined" && (
      <div
        className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
        style={{ height: `${document.body.scrollHeight}px` }}
      ></div>
    )}

    {/* Footer */}
    <Footer />

    </>
  )
}
