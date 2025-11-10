"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  const prevHero = () => setCurrentHero((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  const nextHero = () => setCurrentHero((prev) => (prev + 1) % heroSlides.length)

  return (
    <div>
      {/* Navigation */}
      <Navigation page="internet"/>
      <header className="min-h-screen bg-black text-white">
        {/* Hero Slider */}
        <div className="relative min-h-screen overflow-hidden">
          {/* Slide Images */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentHero}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={heroSlides[currentHero].image}
                alt={heroSlides[currentHero].title}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff8400]/80 to-[#ff8400]/60 mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col justify-center items-center px-6 py-24 md:px-12">
            <div className="relative flex flex-col items-center justify-center text-center md:mt-20 md:items-start md:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <h1 className="mb-3 text-5xl text-white text-center">
                    {heroSlides[currentHero].title}
                  </h1>
                  <p className="mb-8 mx-auto max-w-2xl text-lg text-white text-center md:text-xl">
                    {heroSlides[currentHero].subtitle}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={heroSlides[currentHero].cta.href}
                      className="rounded-full bg-white/90 text-[#F98F1F] px-6 py-2.5 text-sm md:text-base font-semibold hover:bg-white transition"
                    >
                      {heroSlides[currentHero].cta.text}
                    </a>
                    <a
                      href="#plans"
                      className="rounded-full border border-white/70 text-white px-6 py-2.5 text-sm md:text-base font-semibold hover:bg-white/10 transition"
                    >
                      View Plans
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-2 flex items-center gap-3">
                <button
                  aria-label="Previous"
                  onClick={prevHero}
                  className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${currentHero === i ? 'w-8 bg-white' : 'w-2 bg-white/70'}`}
                    onClick={() => setCurrentHero(i)}
                  />
                ))}
                <button
                  aria-label="Next"
                  onClick={nextHero}
                  className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            {/*<motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                onClick={openVideoModal}
                className="flex items-center justify-center mx-auto px-12 py-3 text-base font-medium text-white bg-[#F98F1F65] rounded-full hover:bg-[#F98F1F95] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F98F1F] transition-all">
                    View Plans
            </motion.button>*/}
            </div>
          </div>          
        </div>        
      </header>

      <main>
        <section className="w-full mt-6 mb-1 px-0">
          <InternetPlansSlider />
        </section>
        <InternetBenefits />
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