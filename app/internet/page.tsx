"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/nav" 
import Footer from "@/components/footer"
import InternetPlansSlider from "@/components/internet/internet-plans-slider"
import InternetBenefits from "@/components/internet/internet-benefits"

export default function InternetPage() {

  // set the document title
  useEffect(() => {
    document.title = 'Internet | Qcell'
  }, [])

  // (Plans slider content is now managed in InternetPlansSlider component)

  // Hero slides with per-slide imagery and content
  const heroSlides = [
    {
      image: "/images/qcell-network-two.png",
      title: "Speed. Freedom. Connection.",
      subtitle: "Unlock your world with powerful internet — anytime, anywhere.",
      cta: { text: "Explore Plans", href: "#plans" },
    },
    {
      image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1470&auto=format&fit=crop",
      title: "Ultra-fast 4G LTE",
      subtitle: "Stream, browse, and stay connected on the go with reliable speed.",
      cta: { text: "See 4G LTE", href: "#" },
    },
    {
      image: "https://images.unsplash.com/photo-1580584128409-44a1b8d59f86?q=80&w=1470&auto=format&fit=crop",
      title: "Fiber for Home & Business",
      subtitle: "Seamless connectivity for every device with QFiber and QFIBER.",
      cta: { text: "Discover Fiber", href: "#" },
    },
  ]
  const [currentHero, setCurrentHero] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [heroSlides.length])

  return (
    <div>
      {/* Navigation */}
      <Navigation page="internet"/>
      <header className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Hero Slider */}
        <div className="relative min-h-screen">
          {/* Slide Images */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentHero}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                src={heroSlides[currentHero].image}
                alt={heroSlides[currentHero].title}
                fill
                className="object-cover object-center"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#F98F1F]/30" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-20 md:px-12 lg:px-20">
            <div className="relative mx-auto w-full max-w-6xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight">
                    {heroSlides[currentHero].title}
                  </h1>
                  <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl lg:text-2xl leading-relaxed">
                    {heroSlides[currentHero].subtitle}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                    <motion.a
                      href={heroSlides[currentHero].cta.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full bg-[#F98F1F] text-white px-8 py-3.5 text-base md:text-lg font-semibold hover:bg-[#ff9c33] transition-all shadow-lg hover:shadow-xl"
                    >
                      {heroSlides[currentHero].cta.text}
                    </motion.a>
                    <motion.a
                      href="#plans"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border-2 border-white/80 text-white px-8 py-3.5 text-base md:text-lg font-semibold hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                    >
                      View Plans
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>          

          {/* Navigation Dots */}
          <div className="pointer-events-auto absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentHero === i ? 'w-12 bg-white shadow-lg' : 'w-3 bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentHero(i)}
              />
            ))}
          </div>
        </div>        
      </header>

      <main className="bg-white">
        <section id="plans" className="w-full py-12 md:py-16 px-0">
          <InternetPlansSlider />
        </section>
        <section className="w-full py-12 md:py-16">
          <InternetBenefits />
        </section>
      </main>

      <Footer />

      {typeof window !== "undefined" && (
      <div
        className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
        style={{ height: `${document.body.scrollHeight}px` }}
      ></div>
    )}
    </div>
  )
}