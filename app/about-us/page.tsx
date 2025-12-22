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
      <section className="relative w-full overflow-hidden">
        {/* Top section with white background */}
        <div className="relative bg-white">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
            {/* Main Headline - Full Width */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block">ABOUT </span>
              <span className="inline-block bg-gradient-to-r from-[#FF8C00] to-[#FFA500] bg-clip-text text-transparent italic">
                QCEL
              </span>
            </motion.h1>
          </div>
        </div>

        {/* Light blue section starting from description */}
        <div className="relative bg-gradient-to-b from-blue-50 via-sky-50 to-blue-100">
          <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Section - Content */}
              <motion.div
                className="flex flex-col justify-center space-y-6 z-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >

              {/* Description Box */}
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-200/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed font-light">
                  We are Sierra Leone&apos;s only African-owned telecom company, pioneering mobile and internet services nationwide. Rooted in our people, our culture, and our future. 24-hour support is always happy to answer all your questions.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  Learn More About Us
                </motion.button>
              </motion.div>

              {/* App Availability */}
              <motion.div
                className="flex flex-col space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <p className="text-sm md:text-base text-gray-600 font-medium">
                  The mobile app is available now
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <div className="bg-black rounded-xl px-6 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-1.88-.78-2.97-1.23-3.24-2.26-.23-.95.17-1.95.93-2.67.95-.9 2.24-1.36 3.8-1.36.36 0 .72.03 1.08.1.36.07.72.18 1.08.33.36.15.7.33 1.02.55.32.22.6.48.84.78.24.3.44.64.6 1.02.16.38.28.78.36 1.2.08.42.12.86.12 1.32 0 .46-.04.9-.12 1.32-.08.42-.2.82-.36 1.2-.16.38-.36.72-.6 1.02-.24.3-.52.56-.84.78-.32.22-.66.4-1.02.55-.36.15-.72.26-1.08.33-.36.07-.72.1-1.08.1-.46 0-.9-.04-1.32-.12-.42-.08-.82-.2-1.2-.36-.38-.16-.72-.36-1.02-.6-.3-.24-.56-.52-.78-.84-.22-.32-.4-.66-.55-1.02-.15-.36-.26-.72-.33-1.08-.07-.36-.1-.72-.1-1.08 0-1.56.46-2.85 1.36-3.8.72-.76 1.72-1.16 2.67-.93 1.03.27 1.48 1.36 2.26 3.24.48 1.16.94 2.15 1.44 3.24.48 1.03.55 2.1-.4 3.08z"/>
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">Download on the</span>
                        <span className="text-sm font-semibold text-white">App Store</span>
                      </div>
                    </div>
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <div className="bg-black rounded-xl px-6 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.12L14.54,12.85L17.19,10.81L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400">GET IT ON</span>
                        <span className="text-sm font-semibold text-white">Google Play</span>
                      </div>
                    </div>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Phone Mockup */}
            <motion.div
              className="flex justify-center items-center lg:justify-end relative z-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Phone Frame */}
                <div className="relative w-[280px] md:w-[320px] lg:w-[360px] aspect-[9/19] bg-black rounded-[3rem] p-2 shadow-2xl">
                  {/* Phone Screen */}
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFA500] h-12 flex items-center justify-between px-6 text-white text-sm font-medium">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* App Content - Using appscreen1.png */}
                    <div className="relative w-full h-[calc(100%-3rem)] overflow-hidden">
                      <Image
                        src="/images/appscreen1.png"
                        alt="QCell App Screen"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 360px"
                        unoptimized
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C00]/20 to-[#FFA500]/20 rounded-[3rem] blur-2xl -z-10"></div>
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

  {/* Hero Section End */}

  {/* QCell About Section */}
  <QCellAboutSection />

  {/* Salone Pride Section */}
  <section className="relative py-24 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-white to-sky-50 overflow-hidden">
    {/* Subtle background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
    </div>
    
    <div className="container mx-auto max-w-6xl relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side - Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <motion.p
            className="text-[#FF8C00] font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Our Philosophy
          </motion.p>

          {/* Main Title */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-900">Salone</span>
            <br />
            <span className="text-[#FF8C00] italic">Pride</span>
          </motion.h2>

          {/* Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-orange-200/50 shadow-lg">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                Salone pride is the QCell philosophy meaning &apos;ours&apos; in Krio language. We believe that QCell is of Sierra Leoneans, for Sierra Leoneans and by Sierra Leoneans. Salone Pride is Sierra Leoneans uniting our nation and supporting each other&apos;s growth.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-[#FF8C00] mb-2">Of</div>
                <div className="text-sm text-gray-700">Sierra Leoneans</div>
              </motion.div>
              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl font-bold text-[#FF8C00] mb-2">For</div>
                <div className="text-sm text-gray-700">Sierra Leoneans</div>
              </motion.div>
              <motion.div
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-200/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-3xl font-bold text-[#FF8C00] mb-2">By</div>
                <div className="text-sm text-gray-700">Sierra Leoneans</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Visual Element */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Circular badge design */}
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Outer circle */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00] via-[#FFA500] to-[#FFB347] rounded-full shadow-2xl flex items-center justify-center">
              {/* Middle circle */}
              <div className="w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center shadow-inner">
                {/* Inner circle */}
                <div className="w-[70%] h-[70%] bg-gradient-to-br from-orange-50 to-amber-50 rounded-full flex flex-col items-center justify-center p-8 border-4 border-orange-200">
                  <motion.div
                    className="text-6xl md:text-7xl font-bold text-[#FF8C00] mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    SP
                  </motion.div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Salone</div>
                    <div className="text-xl md:text-2xl font-bold text-[#FF8C00] italic">Pride</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FF8C00] rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#FFA500] rounded-full opacity-50 blur-xl"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-[#FFB347] rounded-full opacity-40 blur-lg"></div>
            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-[#FF8C00] rounded-full opacity-40 blur-lg"></div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>

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
