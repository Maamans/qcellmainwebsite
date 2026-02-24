"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation-two"
import Cursor from "@/components/cursor"
import OfferingsSlider from "@/components/offering-slider"

const EnhancedCoverageMap = dynamic(
  () => import("@/components/enhanced-coverage-map-two"),
  { ssr: false, loading: () => <div className="h-[700px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center"><span className="text-slate-400">Loading map...</span></div> }
)
import DownloadApp from "@/components/download-app"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen bg-white overflow-hidden">
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="main-content"
        >
          <Cursor />
          {/* Hero / Coverage Map */}
          <section className="relative w-full bg-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24"
            >
              <EnhancedCoverageMap />
            </motion.div>
          </section>

          {/* Offerings slider */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
            <OfferingsSlider />
          </section>
          {/* Download app section */}
          <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
            <DownloadApp />
          </section>
          {/* Footer */}
          <section className="bg-gray-50">
            <Footer />
          </section>
        </motion.div>

        <div className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all "></div>
      </main>
    </>
  )
}