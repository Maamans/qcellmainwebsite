"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Navigation from "@/components/nav"
import TypingEffect from "@/components/TypingEffect"

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Our Services - Qcell"
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)

  // Get scroll progress for the entire page
  const { scrollYProgress } = useScroll()

  // Create spring-based animations for smooth movement
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Subtle parallax - only opacity and very slight scale, no position change
  const backgroundOpacity = useTransform(smoothScrollYProgress, [0, 0.5], [1, 0.7])
  const backgroundScale = useTransform(smoothScrollYProgress, [0, 0.5], [1, 1.05])

  // Main title animations
  const mainTitleOpacity = useTransform(smoothScrollYProgress, [0, 0.2], [1, 0])
  const mainTitleScale = useTransform(smoothScrollYProgress, [0, 0.2], [1, 0.8])

  // Subtitle animations
  const subtitleOpacity = useTransform(smoothScrollYProgress, [0, 0.25], [1, 0])

  // Service data with enhanced styling
  const services = [
    {
      name: "CUG",
      description: "Closed User Group",
      detail: "Exclusive communication networks for businesses",
      color: "#FF6B35",
      bgColor: "rgba(255, 107, 53, 0.1)",
    },
    {
      name: "QFiber",
      description: "High-Speed Internet",
      detail: "Ultra-fast fiber optic connectivity",
      color: "#1A85FF",
      bgColor: "rgba(26, 133, 255, 0.1)",
    },
    {
      name: "VAS Offers",
      description: "Value Added Services",
      detail: "Premium mobile banking & entertainment",
      color: "#9747FF",
      bgColor: "rgba(151, 71, 255, 0.1)",
    },
    {
      name: "eSIM",
      description: "Digital SIM Cards",
      detail: "Modern connectivity without physical cards",
      color: "#00C896",
      bgColor: "rgba(0, 200, 150, 0.1)",
    },
    {
      name: "Instant Roaming",
      description: "Global Connectivity",
      detail: "Stay connected worldwide with competitive rates",
      color: "#FFB800",
      bgColor: "rgba(255, 184, 0, 0.1)",
    },
  ]

  // Service card animations - each slides in from different directions
  const service1Opacity = useTransform(smoothScrollYProgress, [0.15, 0.25, 0.4], [0, 1, 0])
  const service1X = useTransform(smoothScrollYProgress, [0.15, 0.25, 0.4], [-100, 0, 100])
  const service1Scale = useTransform(smoothScrollYProgress, [0.15, 0.25, 0.4], [0.8, 1, 0.8])

  const service2Opacity = useTransform(smoothScrollYProgress, [0.3, 0.4, 0.55], [0, 1, 0])
  const service2X = useTransform(smoothScrollYProgress, [0.3, 0.4, 0.55], [100, 0, -100])
  const service2Scale = useTransform(smoothScrollYProgress, [0.3, 0.4, 0.55], [0.8, 1, 0.8])

  const service3Opacity = useTransform(smoothScrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0])
  const service3Y = useTransform(smoothScrollYProgress, [0.45, 0.55, 0.7], [100, 0, -100])
  const service3Scale = useTransform(smoothScrollYProgress, [0.45, 0.55, 0.7], [0.8, 1, 0.8])

  const service4Opacity = useTransform(smoothScrollYProgress, [0.6, 0.7, 0.85], [0, 1, 0])
  const service4X = useTransform(smoothScrollYProgress, [0.6, 0.7, 0.85], [-100, 0, 100])
  const service4Scale = useTransform(smoothScrollYProgress, [0.6, 0.7, 0.85], [0.8, 1, 0.8])

  const service5Opacity = useTransform(smoothScrollYProgress, [0.75, 0.85, 1], [0, 1, 0])
  const service5Y = useTransform(smoothScrollYProgress, [0.75, 0.85, 1], [-100, 0, 100])
  const service5Scale = useTransform(smoothScrollYProgress, [0.75, 0.85, 1], [0.8, 1, 0.8])

  const serviceAnimations = [
    { opacity: service1Opacity, x: service1X, y: 0, scale: service1Scale },
    { opacity: service2Opacity, x: service2X, y: 0, scale: service2Scale },
    { opacity: service3Opacity, x: 0, y: service3Y, scale: service3Scale },
    { opacity: service4Opacity, x: service4X, y: 0, scale: service4Scale },
    { opacity: service5Opacity, x: 0, y: service5Y, scale: service5Scale },
  ]

  return (
    <>
      <div ref={containerRef} className="min-h-screen">
        <Navigation page="services" />

        {/* Hero Section with Scroll Animation */}
        <section className="relative h-[400vh] w-full overflow-hidden">
          {/* Fixed Background with Subtle Parallax */}
          <div className="fixed inset-0 w-full h-screen z-0">
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: backgroundOpacity,
                scale: backgroundScale,
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500"></div>

              {/* Mobile background */}
              <div className="sm:hidden absolute inset-0 bg-[url('/images/community-2.png')] bg-cover bg-center"></div>
              {/* Desktop background */}
              <div className="hidden sm:block absolute inset-0 bg-[url('/images/community-2.png')] bg-cover bg-center"></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#F98F1F] mix-blend-overlay opacity-40"></div>
            </motion.div>
          </div>

          {/* Fixed Content Container */}
          <div className="fixed inset-0 flex flex-col justify-center items-center z-20 px-6 md:px-12">
            {/* Main Title */}
            <motion.div
              className="text-center mb-8"
              style={{
                opacity: mainTitleOpacity,
                scale: mainTitleScale,
              }}
            >
              <h1 className="text-5xl text-white md:text-6xl lg:text-8xl font-bold drop-shadow-2xl mb-6">
                Your World, <br /> Our Services!
              </h1>

              <motion.p
                className="text-xl md:text-2xl max-w-2xl drop-shadow-lg text-white mx-auto"
                style={{ opacity: subtitleOpacity }}
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
            </motion.div>

            {/* Service Cards - Large and Highly Visible */}
            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: serviceAnimations[index].opacity,
                    x: serviceAnimations[index].x,
                    y: serviceAnimations[index].y,
                    scale: serviceAnimations[index].scale,
                  }}
                >
                  {/* Service Card */}
                  <div
                    className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 max-w-lg w-full mx-4"
                    style={{ borderColor: service.color }}
                  >
                    {/* Background accent */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-10"
                      style={{ backgroundColor: service.color }}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      {/* Service name */}
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4" style={{ color: service.color }}>
                        {service.name}
                      </h2>

                      {/* Service description */}
                      <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{service.description}</p>

                      {/* Service detail */}
                      <p className="text-lg text-gray-600 leading-relaxed">{service.detail}</p>

                      {/* Decorative line */}
                      <div
                        className="w-20 h-1 mx-auto mt-6 rounded-full"
                        style={{ backgroundColor: service.color }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Progress Indicator */}
            <motion.div
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm flex flex-col items-center z-30"
              style={{ opacity: mainTitleOpacity }}
            >
              <p className="mb-2 opacity-80">Scroll to explore services</p>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5L12 19M12 19L19 12M12 19L5 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 z-50 origin-left"
              style={{
                scaleX: smoothScrollYProgress,
                width: "100%",
              }}
            />
          </div>
        </section>

        {/* Content Section */}
        <div className="relative z-30 bg-white min-h-screen">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Choose from our comprehensive range of telecommunications services designed to keep you connected.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300"
                  style={{ borderColor: service.color }}
                >
                  <h3 className="text-2xl font-bold mb-3" style={{ color: service.color }}>
                    {service.name}
                  </h3>
                  <p className="text-gray-700 mb-2 font-semibold">{service.description}</p>
                  <p className="text-gray-600">{service.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
