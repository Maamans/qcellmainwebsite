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
      <section className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-b from-sky-300 to-sky-500">
        {/* Clouds Background */}

        {/** mobile */}
        {/*<div className="sm:hidden absolute inset-0 bg-[url('/images/clouds-and-baloon-bg.png')] bg-cover bg-center opacity-100"></div>
        {/** desktop 
        <div className="hidden sm:block absolute inset-0 bg-[url('/images/clouds-and-baloon-bg-desktop.png')] bg-cover bg-center opacity-100"></div>*/}

        {/** mobile */}
        <div className="sm:hidden absolute inset-0 bg-[url('/images/clouds-bg.png')] bg-cover bg-center opacity-100"></div>
        {/** desktop */}
        <div className="hidden sm:block absolute inset-0 bg-[url('/images/clouds-bg.png')] bg-cover bg-center opacity-100"></div>


        {/*<div className="absolute inset-0 z-0">
          <video
            className="h-full w-full object-contain"
            poster="/images/clouds-and-baloon-bg.png"
            loop
            muted
            playsInline
            autoPlay
          >
            <source src="/videos/balloon-video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay
          <div className="absolute inset-0 bg-[#ff8400] opacity-25"></div>
        </div>*/}

        {/* Text Overlay */}
        <div className="absolute inset-0 top-36 flex flex-col justify-center items-center text-white text-center z-20 px-4">
          <motion.h1
            className="text-4xl text-[#d9d9d9] md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Salone Pride
          </motion.h1>
            {/**We&apos;re More than a telecom provider */}
          {/*<motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            We&apos;re More than a telecom provider<br/>
            We&apos;re a technology company
          </motion.h2>*/}

          <motion.p
            className="text-xl md:text-2xl max-w-3xl drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Rooted in our people, our culture, and our future
          </motion.p>
        </div>

        <div className="absolute inset-0 bg-[#F98F1F] opacity-25"></div>
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
