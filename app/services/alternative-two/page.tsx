"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Navigation from "@/components/nav"
import TypingEffect from "@/components/TypingEffect"
import { Phone, Wifi, Globe, Smartphone, Zap, Users, Shield, Headphones } from "lucide-react"

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Our Services - QCell"
  }, [])

  const [windowHeight, setWindowHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  // Get scroll progress for the entire page
  const { scrollYProgress } = useScroll()
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" })

  // Create spring-based animations for smooth movement
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Parallax effects
  const yPosition = useTransform(smoothScrollYProgress, [0, 1], [0, -200])
  const scaleValue = useTransform(smoothScrollYProgress, [0, 0.5], [1, 1.1])
  const opacity = useTransform(smoothScrollYProgress, [0, 0.3], [1, 0.8])

  // Floating particles animation
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>(
    [],
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      console.log("Window height updated:", windowHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const services = [
    {
      icon: Phone,
      title: "CUG",
      subtitle: "Closed User Group",
      description: "Exclusive communication networks for businesses and organizations with special rates and features.",
      color: "from-orange-400 to-red-500",
      delay: 0.1,
    },
    {
      icon: Wifi,
      title: "QFiber",
      subtitle: "High-Speed Internet",
      description: "Ultra-fast fiber optic internet connectivity for homes and businesses across Sierra Leone.",
      color: "from-blue-400 to-cyan-500",
      delay: 0.2,
    },
    {
      icon: Globe,
      title: "VAS Offers",
      subtitle: "Value Added Services",
      description: "Premium services including mobile banking, entertainment, and productivity tools.",
      color: "from-purple-400 to-pink-500",
      delay: 0.3,
    },
    {
      icon: Smartphone,
      title: "eSIM",
      subtitle: "Digital SIM Cards",
      description: "Modern eSIM technology for seamless connectivity without physical SIM cards.",
      color: "from-green-400 to-emerald-500",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Instant Roaming",
      subtitle: "Global Connectivity",
      description: "Stay connected worldwide with our instant roaming services and competitive rates.",
      color: "from-yellow-400 to-orange-500",
      delay: 0.5,
    },
    {
      icon: Users,
      title: "Enterprise Solutions",
      subtitle: "Business Packages",
      description: "Comprehensive communication solutions tailored for businesses of all sizes.",
      color: "from-indigo-400 to-purple-500",
      delay: 0.6,
    },
  ]

  return (
    <>
      <div ref={containerRef} className="min-h-screen">
        <Navigation page="services" />

        {/* Hero Section */}
        <section className="relative h-[100vh] w-full overflow-hidden">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-sky-400 via-orange-300 to-orange-500"
            style={{ scale: scaleValue, opacity }}
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute bg-white/20 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Background Image with Parallax */}
          <motion.div className="absolute inset-0" style={{ y: yPosition }}>
            <div className="sm:hidden absolute inset-0 bg-[url('/images/community-2.png')] bg-cover bg-center opacity-60"></div>
            <div className="hidden sm:block absolute inset-0 bg-[url('/images/community-2.png')] bg-cover bg-center opacity-60"></div>
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 via-transparent to-orange-600/40"></div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-center text-white mx-auto z-20 px-10 md:px-28 xl:px-48">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl text-white md:text-6xl lg:text-8xl font-bold mb-6 drop-shadow-2xl max-w-4xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Your World, <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Our Services!
                </span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl max-w-2xl drop-shadow-lg leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <TypingEffect
                  texts={[
                    "From connectivity to innovation, QCell brings you the tools to stay ahead.",
                    "Empowering communities with cutting-edge technology.",
                    "Connecting people, building digital futures.",
                    "Your trusted partner in telecommunications excellence.",
                  ]}
                  loop={true}
                  deleteSpeed={30}
                />
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <button className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Services
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105">
                  Contact Us
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of telecommunications services designed to keep you connected and
                empowered.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <motion.div
                  key={service.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isServicesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: service.delay,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-orange-500 font-semibold mb-4 text-sm uppercase tracking-wide">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>

                    {/* Learn More Button */}
                    <motion.button
                      className="mt-6 text-orange-500 font-semibold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join millions of satisfied customers and experience the QCell difference today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-5 h-5 inline mr-2" />
                  Get Started Now
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Headphones className="w-5 h-5 inline mr-2" />
                  Contact Support
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
