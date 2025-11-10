"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Smartphone, Download, ArrowRight, Check } from "lucide-react"

export default function DownloadApp() {
  const [activeFeature, setActiveFeature] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const features = [
    "Check your balance instantly",
    "Buy data bundles with one tap",
    "Pay bills without leaving home",
    "Track your usage in real-time",
    "Exclusive in-app promotions",
  ]

  // Parallax effects
  const phoneY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [features.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const phoneVariants = {
    hidden: { x: 100, opacity: 0, rotateY: 10 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const featureVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const qrCodeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(249, 143, 31, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(249, 143, 31, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: { scale: 0.95 },
  }

  return (
    <motion.section
      id="download-app-section"
      ref={containerRef}
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 50%, #f5f5f5 100%)",
        opacity: opacitySection,
        scale,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F98F1F]/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#F98F1F]/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F98F1F]/3 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="container relative mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-block rounded-full bg-[#F98F1F]/10 px-4 py-1.5 text-sm font-medium text-[#F98F1F] mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Mobile Experience
              </motion.span>
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl">
                Download the Qcell mobile app today.
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-lg text-gray-700 md:text-xl">
                Everything you need at your fingertips. Manage your account, buy bundles, check balance, and enjoy
                exclusive offers with the Qcell app.
              </p>
            </motion.div>

            {/* Features list with animated indicator */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">App Features</h3>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className={`flex items-center rounded-lg px-3 py-2 transition-colors ${activeFeature === index ? "bg-[#F98F1F]/10" : "hover:bg-gray-100"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className={`mr-3 flex h-6 w-6 items-center justify-center rounded-full ${activeFeature === index ? "bg-[#F98F1F]" : "bg-gray-200"}`}
                      animate={{ scale: activeFeature === index ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className={`h-3.5 w-3.5 ${activeFeature === index ? "text-white" : "text-gray-500"}`} />
                    </motion.div>
                    <span
                      className={`text-sm ${activeFeature === index ? "font-medium text-[#F98F1F]" : "text-gray-700"}`}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-4">
              <motion.div
                className="flex flex-col items-center"
                variants={qrCodeVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                {/*<div className="mb-3 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="App Store QR Code"
                    width={120}
                    height={120}
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>*/}
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black/90"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.53 11.06c-.15-.12-.28-.25-.41-.41-.44-.44-.86-.89-1.27-1.34-.16-.18-.33-.35-.51-.51-.45-.41-.97-.63-1.58-.63-.49 0-.95.15-1.35.44-.55.4-1.09.82-1.64 1.23-.15.11-.3.22-.46.32-.32.21-.66.35-1.02.35-.59 0-1.14-.37-1.38-.93-.16-.37-.24-.77-.24-1.18 0-1.13.37-2.21 1.03-3.07.69-.91 1.64-1.51 2.69-1.71.31-.06.63-.09.94-.09.93 0 1.8.29 2.52.84.71.55 1.21 1.32 1.41 2.2.06.26.09.53.09.8 0 .29-.04.58-.11.86-.11.42-.29.82-.53 1.17.1.11.2.21.31.31.18.18.37.36.57.52.36.3.75.48 1.19.48.07 0 .15-.01.22-.02.5-.06.92-.35 1.19-.77.27-.42.36-.92.25-1.4-.05-.23-.13-.44-.23-.65-.09-.18-.16-.37-.16-.57 0-.15.05-.29.14-.42.09-.13.22-.23.37-.29.15-.06.32-.08.48-.06.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22.24-.37.31-.15.07-.32.1-.48.08-.16-.02-.32-.08-.45-.17-.13-.09-.24-.22-.31-.37-.07-.15-.1-.32-.08-.48.02-.16.08-.32.17-.45.09-.13.22-.24.37-.31.15-.07.32-.1.48-.08.16.02.32.08.45.17.13.09.24.22.31.37.07.15.1.32.08.48-.02.16-.08.32-.17.45-.09.13-.22-.24-.37-.31z" />
                    </svg>
                    Download on App Store
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center"
                variants={qrCodeVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                {/*<div className="mb-3 flex items-center justify-center overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="Google Play QR Code"
                    width={120}
                    height={120}
                    className="transition-transform duration-500 hover:scale-110"
                  />
                </div>*/}
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-full bg-[#F98F1F] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#F98F1F]/90"
                  >
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.435-.29.704 0 .269.109.523.29.704.181.181.435.29.704.29.269 0 .523-.109.704-.29L15.624 12 5.017 1.396c-.181-.181-.435-.29-.704-.29-.269 0-.523.109-.704.29-.181.181-.29.435-.29.704 0 .269.109.523.29.704z" />
                    </svg>
                    Get it on Google Play
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center pt-2">
              <div className="flex items-center justify-center rounded-full bg-[#F98F1F]/10 p-2">
                <Download className="h-5 w-5 text-[#F98F1F]" />
              </div>
              <p className="ml-2 text-sm text-gray-600">Over 500,000 downloads and counting</p>
            </motion.div>
          </div>

          <motion.div
            className="relative flex justify-center md:justify-end"
            style={{ y: phoneY }}
            variants={phoneVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative">
              {/* Animated glow effect */}
              <motion.div
                className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[#F98F1F] to-[#CD7F32] opacity-70 blur-sm"
                animate={{
                  opacity: [0.5, 0.7, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Phone frame */}
              <motion.div
                className="relative overflow-hidden rounded-3xl border-[6px] border-[#F98F1F] bg-white shadow-xl"
                whileHover={{
                  rotateY: 5,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 15 },
                }}
              >
                <Image
                  src="/qcell-mobile-app.png"
                  alt="Qcell Mobile App"
                  width={300}
                  height={600}
                  className="h-auto w-full max-w-[300px]"
                />

                {/* Animated overlay for screen interaction effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10"
                  animate={{
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F98F1F]"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 25px rgba(249, 143, 31, 0.3)",
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-white opacity-30"
                />
                <Smartphone className="h-6 w-6 text-white" />
              </motion.div>

              {/* Floating notification bubbles */}
              <motion.div
                className="absolute -left-6 top-1/4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  x: [20, 0, -20],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 1,
                  times: [0, 0.5, 1],
                }}
              >
                <span className="text-xs font-medium text-[#F98F1F]">+10GB</span>
              </motion.div>

              <motion.div
                className="absolute -left-4 bottom-1/4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg"
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  x: [20, 0, -20],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 3,
                  times: [0, 0.5, 1],
                }}
              >
                <span className="text-xs font-medium text-[#F98F1F]">50%</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated feature highlight */}
        <motion.div
          className="mt-16 rounded-2xl bg-gradient-to-r from-[#F98F1F]/5 to-[#F98F1F]/10 p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 md:text-2xl">
                Ready to experience the Qcell difference?
              </h3>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeFeature}
                  className="mt-2 text-gray-600"
                  variants={featureVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  {features[activeFeature]}
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-[#F98F1F] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#F98F1F]/90 hover:shadow-lg"
              >
                Download Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

