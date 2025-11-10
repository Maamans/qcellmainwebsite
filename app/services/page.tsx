"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Navigation from "@/components/nav"
import TypingEffect from "@/components/TypingEffect"
import Footer from "@/components/footer"

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Our Services - Qcell"
  }, [])

  const [windowHeight, setWindowHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Get scroll progress for the entire page
  const { scrollYProgress } = useScroll()

  // Create spring-based animations for smooth movement
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Background parallax effect (subtle)
  const backgroundY = useTransform(smoothScrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundYTwo = useTransform(smoothScrollYProgress, [0, 1], ["30%", "0%"])
  //const backgroundOpacity = useTransform(smoothScrollYProgress, [0, 0.5], [1, 0.7])
   
  // Main title animations - fade out earlier
  const mainTitleOpacity = useTransform(smoothScrollYProgress, [0, 0.1], [1, 0])
  const mainTitleY = useTransform(smoothScrollYProgress, [0, 0.1], [0, -50])

  // Subtitle animations - fade out earlier
  const subtitleOpacity = useTransform(smoothScrollYProgress, [0, 0.15], [1, 0])
  const subtitleY = useTransform(smoothScrollYProgress, [0, 0.15], [0, -30])

  // Service data
  const services = [
    { name: "CUG", description: "Closed User Group", longDescription: "Enjoy unlimited calls within your organization or group at a fixed monthly rate. Perfect for businesses and teams who need seamless, cost-effective communication.", color: "#FF6B35" },
    { name: "QFiber", description: "High-Speed Internet", longDescription: "Experience ultra-fast, reliable internet connectivity for your home or business. QFiber delivers high-speed broadband to keep you connected and productive.", color: "#1A85FF" },
    { name: "VAS Offers", description: "Value Added Services", longDescription: "Enhance your mobile experience with our Value Added Services, including caller tunes, SMS bundles, mobile entertainment, and more.", color: "#9747FF" },
    { name: "eSIM", description: "Digital SIM Cards", longDescription: "Go digital with eSIM technology—activate your mobile plan instantly without a physical SIM card. Convenient, secure, and perfect for modern devices.", color: "#00C896" },
    { name: "Instant Roaming", description: "Global Connectivity", longDescription: "Stay connected wherever you travel. Our Instant Roaming service ensures you have voice, SMS, and data access worldwide with ease.", color: "#FFB800" },
    { name: "Tros-Mi-Topup", description: "No Credit. No Wahala!", longDescription: "Never run out of credit again! With Tros-Mi-Topup, you can instantly borrow airtime when you need it most. Stay connected even when your balance is low—no stress, no interest, no hassle.", color: "#FFB800" },
    { name: "Q-Power", description: "Buy EDSA using Topup", longDescription: "Easily purchase EDSA electricity tokens directly from your QCell credit balance. Q-Power makes it simple and convenient to keep your home or business powered up, anytime and anywhere.", color: "#FFB800" },
  ]

  // Service animations - simplified and more visible ranges
  const service1Opacity = useTransform(smoothScrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0])
  const service1Y = useTransform(smoothScrollYProgress, [0.1, 0.2, 0.3], [30, 0, -30])
  const service1Scale = useTransform(smoothScrollYProgress, [0.1, 0.2, 0.3], [0.9, 1, 0.9])

  const service2Opacity = useTransform(smoothScrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0])
  const service2Y = useTransform(smoothScrollYProgress, [0.25, 0.35, 0.45], [30, 0, -30])
  const service2Scale = useTransform(smoothScrollYProgress, [0.25, 0.35, 0.45], [0.9, 1, 0.9])

  const service3Opacity = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0])
  const service3Y = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.6], [30, 0, -30])
  const service3Scale = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.6], [0.9, 1, 0.9])

  const service4Opacity = useTransform(smoothScrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0])
  const service4Y = useTransform(smoothScrollYProgress, [0.55, 0.65, 0.75], [30, 0, -30])
  const service4Scale = useTransform(smoothScrollYProgress, [0.55, 0.65, 0.75], [0.9, 1, 0.9])

  const service5Opacity = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0])
  const service5Y = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], [30, 0, -30])
  const service5Scale = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], [0.9, 1, 0.9])

  const service6Opacity = useTransform(smoothScrollYProgress, [0.8, 0.9, 1], [0, 1, 0])
  const service6Y = useTransform(smoothScrollYProgress, [0.85, 0.95, 1.5], [30, 0, -30])
  const service6Scale = useTransform(smoothScrollYProgress, [0.85, 0.95, 1.5], [0.9, 1, 0.9])

  const service7Opacity = useTransform(smoothScrollYProgress, [0.8, 0.9, 1], [0, 1, 0])
  const service7Y = useTransform(smoothScrollYProgress, [0.95, 0.95, 2], [30, 0, -30])
  const service7Scale = useTransform(smoothScrollYProgress, [0.95, 0.95, 2], [0.9, 1, 0.9])

  // Line animations
  const line1Width = useTransform(smoothScrollYProgress, [0.1, 0.2, 0.3], ["0%", "100%", "0%"])
  const line2Width = useTransform(smoothScrollYProgress, [0.25, 0.35, 0.45], ["0%", "100%", "0%"])
  const line3Width = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.6], ["0%", "100%", "0%"])
  const line4Width = useTransform(smoothScrollYProgress, [0.55, 0.65, 0.75], ["0%", "100%", "0%"])
  const line5Width = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], ["0%", "100%", "0%"])
  const line6Width = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], ["0%", "100%", "0%"])
  const line7Width = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], ["0%", "100%", "0%"])

  // Line widths as numbers (for use as px if needed)
  const line1WidthPx = useTransform(smoothScrollYProgress, [0.1, 0.2, 0.3], [0, 100, 0])
  const line2WidthPx = useTransform(smoothScrollYProgress, [0.25, 0.35, 0.45], [0, 100, 0])
  const line3WidthPx = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.6], [0, 100, 0])
  const line4WidthPx = useTransform(smoothScrollYProgress, [0.55, 0.65, 0.75], [0, 100, 0])
  const line5WidthPx = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], [0, 100, 0])
  const line6WidthPx = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], [0, 100, 0])
  const line7WidthPx = useTransform(smoothScrollYProgress, [0.7, 0.8, 0.9], [0, 100, 0])
  
  const serviceAnimations = [
    { opacity: service1Opacity, y: service1Y, scale: service1Scale, lineWidth: line1Width, lineHeight: line1WidthPx },
    { opacity: service2Opacity, y: service2Y, scale: service2Scale, lineWidth: line2Width, lineHeight: line2WidthPx },
    { opacity: service3Opacity, y: service3Y, scale: service3Scale, lineWidth: line3Width, lineHeight: line3WidthPx },
    { opacity: service4Opacity, y: service4Y, scale: service4Scale, lineWidth: line4Width, lineHeight: line4WidthPx },
    { opacity: service5Opacity, y: service5Y, scale: service5Scale, lineWidth: line5Width, lineHeight: line5WidthPx },
    { opacity: service6Opacity, y: service6Y, scale: service6Scale, lineWidth: line6Width, lineHeight: line6WidthPx },
    { opacity: service7Opacity, y: service7Y, scale: service7Scale, lineWidth: line7Width, lineHeight: line7WidthPx },
  ]

  // Update window height on mount and handle resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      console.log("Window height updated:", windowHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="min-h-screen">
        <Navigation page="services" />

        {/* Hero Section with Scroll Animation */}
        <motion.section
          ref={heroRef}
          className="relative h-[800vh] w-full overflow-hidden bg-gradient-to-b from-sky-300 to-sky-500">
          {/* Parallax Background - Fixed */}
          <div className="fixed inset-0 w-[full] h-[250vh]">
            <motion.div className="absolute inset-0" >
              {/* Mobile background */}
              <motion.div className="sm:hidden absolute inset-0 w-[135vw] h-[200vh] -left-[35%] -top-[35%] bg-[url('/images/community-2.png')] bg-cover bg-top opacity-100" style={{ x: backgroundY, y: backgroundYTwo }}></motion.div>
              {/* Desktop background */}
              <motion.div className="hidden sm:block absolute inset-0 w-[135vw] h-[200vh] -left-[35%] -top-[35%] bg-[url('/images/community-2.png')] bg-cover bg-top opacity-100" style={{ x: backgroundY, y: backgroundYTwo }}></motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#F98F1F] mix-blend-overlay"></div>
            </motion.div>
          </div>

          {/* Content Container - Fixed */}
          <div className="fixed inset-0 flex flex-col justify-center items-start mx-auto z-20 px-10 md:px-28 xl:px-48">
            
            {/* Main Title - Fades out on scroll */}
            <motion.div
              className="relative mb-4 mt-36 md:mt-50"
              style={{
                opacity: mainTitleOpacity,
                y: mainTitleY,
              }}
            >
              <h1 className="text-5xl text-white md:text-6xl lg:text-8xl font-normal drop-shadow-lg max-w-2xl">
                Your World, <br /> Our Services!
              </h1>
            </motion.div>

            {/* Subtitle - Fades out on scroll */}
            <motion.div
              className="relative mb-16"
              style={{
                opacity: subtitleOpacity,
                y: subtitleY,
              }}
            >
              <p className="text-xl md:text-2xl max-w-xl drop-shadow-lg text-white">
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
              </p>
            </motion.div>

            {/* Service Titles - Fade in/out sequence on scroll */}
            <div className="relative h-[200px] w-full max-w-4xl z-[200] -mt-40">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  className="absolute left-0 top-0 flex items-center"
                  style={{
                    opacity: serviceAnimations[index].opacity,
                    y: serviceAnimations[index].y,
                    scale: serviceAnimations[index].scale,
                  }}
                >
                  {/* Service dot */}
                  <motion.div
                    className="w-6 h-6 rounded-full mr-6 flex-shrink-0"
                    style={{
                      backgroundColor: service.color,
                      opacity: serviceAnimations[index].opacity,
                    }}
                  ></motion.div>

                  {/* Service connector line */}
                  <motion.div
                    className="w-[3px] mr-6 flex-shrink-0"
                    style={{
                      height: serviceAnimations[index].lineHeight,
                      backgroundColor: service.color,
                      opacity: serviceAnimations[index].opacity,
                    }}
                  ></motion.div>

                  {/* Service content */}
                  <div className="flex flex-col">
                    <h2
                      className="text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg mb-2"
                      style={{ color: service.color }}
                    >
                      {service.name}
                    </h2>
                    <p className="text-lg md:text-xl text-white drop-shadow-md opacity-90">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="mx-auto absolute bottom-3 left-[37%] md:left-[45%] text-white text-sm flex flex-col items-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              style={{ opacity: mainTitleOpacity }}
            >
              <p className="mb-2 opacity-70">Scroll to explore</p>
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
          </div>
        </motion.section>

        {/* Content after hero section */}
        <div className="relative z-30 bg-white p-10 md:p-28 xl:p-48 min-h-screen">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Services</h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore our offerings below to find the perfect service for your needs. Whether you need seamless communication, high-speed internet, or advanced digital services, QCell delivers reliable options tailored for individuals, families, and businesses. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.name} className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-2" style={{ color: service.color }}>
                  {service.name}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <Footer />

      {typeof window !== "undefined" && (
        <div
            className="hidden backdrop-filter z-[40] bg-black/40 absolute inset-0 transition-all"
            style={{ height: `${document.body.scrollHeight}px` }}
        ></div>
      )}
    </>
  )
}