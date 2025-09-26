"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronLeft, Truck, Watch, CreditCard, Gift } from "lucide-react"
import { motion } from "framer-motion"

interface BenefitItem {
  id: string
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
}

export default function BenefitsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Update slider width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const benefits: BenefitItem[] = [
    {
      id: "delivery",
      icon: <Truck className="h-10 w-10 text-pink-500" />,
      title: (
        <>
          Enjoy <span className="text-pink-500">two-hour delivery</span> from any QCELL Store,{" "}
          <span className="text-pink-500">free delivery</span>, or <span className="text-pink-500">easy pickup.</span>
          <sup>2</sup>
        </>
      ),
      description: "",
    },
    {
      id: "watch",
      icon: <Watch className="h-10 w-10 text-orange-500" />,
      title: (
        <>
          <span className="text-orange-500">Lorem ipsum dolor sit amet..</span> Lorem, ipsum dolor.{" "}
          <span className="text-orange-500">Lorem, ipsum.</span>
        </>
      ),
      description: "",
    },
    {
      id: "payment",
      icon: <CreditCard className="h-10 w-10 text-orange-500" />,
      title: (
        <>
          Lorem ipsum dolor sit. <span className="text-orange-500">Lorem, ipsum dolor.</span> Lorem, ipsum.
        </>
      ),
      description: "",
    },
    {
      id: "gift",
      icon: <Gift className="h-10 w-10 text-pink-500" />,
      title: (
        <>
          Lorem, ipsum. <span className="text-pink-500">Lorem, ipsum.</span> Lorem.{" "}
          <span className="text-pink-500">Lorem, ipsum.</span>
        </>
      ),
      description: "",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === benefits.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? benefits.length - 1 : prevIndex - 1))
  }

  // Calculate how many items to show based on screen width
  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  const itemsToShow = getItemsToShow()
  const maxIndex = benefits.length - itemsToShow

  return (
    <div className="w-full bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-medium mb-8">
          <span className="text-red-500">The QCELL difference.</span> Even more reasons to shop with us.
        </h2>

        <div className="relative">
          <div ref={sliderRef} className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: -currentIndex * (sliderWidth / itemsToShow) }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {benefits.map((benefit) => (
                <div key={benefit.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2">
                  <div className="bg-white rounded-lg p-6 h-full shadow-sm">
                    <div className="mb-4">{benefit.icon}</div>
                    <p className="text-lg font-medium">{benefit.title}</p>
                    {benefit.description && <p className="mt-2 text-gray-600">{benefit.description}</p>}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Previous slide"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10"
            aria-label="Next slide"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
