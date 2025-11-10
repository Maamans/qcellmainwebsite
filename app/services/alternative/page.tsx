"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/nav"
import TypingEffect from "@/components/TypingEffect"

export default function AboutPage() {

  useEffect(() => {
    document.title = 'About Us'
  }, [])

  const [windowHeight, setWindowHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get scroll progress for the entire page
  //const { scrollYProgress } = useScroll()

  // Create spring-based animations for smooth movement
  //const smoothScrollYProgress = useSpring(scrollYProgress, {
  //  stiffness: 100,
  //  damping: 30,
  //  restDelta: 0.001,
  //})

  // Transform values based on smooth scroll
  //const yPosition = useTransform(smoothScrollYProgress, [0, 1], [windowHeight * 0.1, windowHeight * 1.5])

  //const scaleValue = useTransform(smoothScrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.8, 0.7])

  // Add subtle horizontal movement for realism
  //const xMovement = useTransform(smoothScrollYProgress, [0, 0.3, 0.7, 1], [0, -20, 10, -5])

  // Subtle continuous floating animation
  const floatY = useRef(0)
  const [floatOffset, setFloatOffset] = useState(0)

  // Update window height on mount and handle resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      console.log("Window height updated:", windowHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Create subtle floating animation
    const floatInterval = setInterval(() => {
      floatY.current = Math.sin(Date.now() / 1000) * 10
      setFloatOffset(floatY.current)
    }, 16) // ~60fps
    console.log(floatOffset)

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
      {/*<motion.div
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
        />
      </motion.div>*/}
    
      <Navigation page="about-us"/>
      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-b from-sky-300 to-sky-500">
        {/* Clouds Background */}

        {/** mobile */}
        {/*<div className="sm:hidden absolute inset-0 bg-[url('/images/clouds-and-baloon-bg.png')] bg-cover bg-center opacity-100"></div>
        {/** desktop 
        <div className="hidden sm:block absolute inset-0 bg-[url('/images/clouds-and-baloon-bg-desktop.png')] bg-cover bg-center opacity-100"></div>*/}

        {/** mobile */}
        <div className="sm:hidden absolute inset-0 bg-[url('/images/community-2.png')] bg-cover bg-center opacity-100"></div>
        {/** desktop */}
        <div className="hidden sm:block absolute inset-0 bg-[url('/images/community-2.png')] bg-cover bg-center opacity-100"></div>


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
        <div className="absolute inset-0 flex flex-col justify-center text-white mx-auto z-20 px-10 md:px-28 xl:px-48">
            <motion.h1
            className="text-5xl text-[#ffffff] md:text-6xl lg:text-8xl font-normal mb-4 drop-shadow-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            >
            {/*<TypingEffect
              texts={[
                "Your World, Our Services!",
                "Empowering Communities",
                "Connecting People",
                "Innovating Together",
                "Building Futures"
              ]}
              loop={true}
              deleteSpeed={70}
            />*/}
            Your World, <br /> Our Services!
            </motion.h1>

          <motion.p
            className="text-xl md:text-2xl max-w-xl drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <TypingEffect
              texts={[
                "From connectivity to innovation, QCell brings you the tools to stay ahead.",
                "Empowering communities with technology and connectivity.",
                "Connecting people, building futures.",
                "Innovating together for a brighter tomorrow.",
              ]}
              loop={true}
              deleteSpeed={30}
            />
          </motion.p>
        </div>

        {/*<div className="absolute inset-0 bg-[#F98F1F] opacity-25"></div>*/}
        <div className="absolute inset-0 bg-[#F98F1F] mix-blend-overlay"></div>
      </section>

    </div>
    {typeof window !== "undefined" && (
      <div
        className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
        style={{ height: `${document.body.scrollHeight}px` }}
      ></div>
    )}

    </>
  )
}
