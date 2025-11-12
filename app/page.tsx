"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TypingAnimation } from "@/components/typing-animation"
import { ZoomTransition } from "@/components/zoom-transition"
import Navigation from "@/components/navigation-two"
import Cursor from "@/components/cursor"
import EnhancedCoverageMap from "@/components/enhanced-coverage-map-two"

import OfferingsSlider from "@/components/offering-slider"
import InfiniteSlider from "@/components/infinite-slider-two"

import DownloadApp from "@/components/download-app"
import Footer from "@/components/footer"

export default function Home() {
  const [stage, setStage] = useState<"typing" | "zooming" | "content">("typing")

  const handleTypingComplete = () => {
    setStage("zooming")
  }

  const handleZoomComplete = () => {
    setStage("content")
  }

  return (
    <>
    
    <main className="relative min-h-screen bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "typing" && (
          <motion.div
            key="typing"
            className="flex min-h-screen items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TypingAnimation text="QCELL" onComplete={handleTypingComplete} />
          </motion.div>
        )}
        {stage === "zooming" && (
          <motion.div
            key="zooming"
            className="flex min-h-screen items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ZoomTransition onZoomComplete={handleZoomComplete} />
          </motion.div>
        )}
        {stage === "content" && (
          <>
          <Navigation />
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="main-content"
          >
            
            <Cursor />
            <section className="relative w-full bg-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="w-full py-16 md:py-24"
              >
                <EnhancedCoverageMap />
              </motion.div>
            </section>

            <section className="py-16 md:py-24 bg-gray-50">
              <OfferingsSlider />
            </section>
            <section className="py-16 md:py-24 bg-white">
              <InfiniteSlider />
            </section>
            <section className="bg-white">
              <DownloadApp />
            </section>
            <section className="bg-gray-50">
              <Footer />
            </section>
          </motion.div>
          
          </>
        )}
      </AnimatePresence>

      
    <div className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all "></div>
    </main>
    </>
  )
}