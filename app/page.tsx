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
              className="w-full px-0 pt-8 pb-4 sm:pt-10 sm:pb-4 md:pt-12 md:pb-4 lg:pt-14 lg:pb-4"
            >
              <EnhancedCoverageMap />
            </motion.div>
          </section>

          {/* Offerings slider */}
          <section className="pt-0 sm:pt-1 md:pt-1 lg:pt-1 pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-gray-50">
            <OfferingsSlider />
          </section>
          {/* Download app section */}
          <section className="bg-white pt-0 sm:pt-1 md:pt-2 lg:pt-2 pb-8 sm:pb-10 md:pb-12 lg:pb-14">
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