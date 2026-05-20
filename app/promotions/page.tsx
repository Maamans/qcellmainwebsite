
"use client";
import { useState, useEffect } from 'react';
import Navigation from "@/components/navigation-two"
import Footer from '@/components/footer'
import dynamic from 'next/dynamic'
import MobileAppSection from '@/components/promotions/MobileAppSection'

// Dynamically import components to avoid hydration issues
const PromotionsHeroSlider = dynamic(
  () => import('@/components/promotions/PromotionsHeroSlider'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-gray-500">Loading promotions hero...</div>
      </div>
    )
  }
)

const PromotionsCarousel = dynamic(
  () => import('@/components/promotions/PromotionsCarousel'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-500">Loading promotions...</div>
      </div>
    )
  }
)
import { motion } from 'framer-motion';
import { promotionsOfferings } from '@/types/promotions-offerings'
import { api } from '@/lib/api'

// Transform hardcoded offerings to match backend format
const transformHardcodedOfferings = () => {
  return promotionsOfferings.map(offering => ({
    id: offering.id,
    title: offering.title,
    image: offering.image || offering.details?.image,
    order: promotionsOfferings.indexOf(offering),
    isActive: true,
  }))
}

type PromotionOffering = {
  id: string | number
  title?: string
  image?: string
  order?: number
  isActive?: boolean
  startDate?: string
  endDate?: string
}

export default function Promotions() {
  const [backendPromotions, setBackendPromotions] = useState<PromotionOffering[]>([])
  const hardcodedPromotions = transformHardcodedOfferings()

  // Fetch promotions from backend (client-side only)
  useEffect(() => {
    let isMounted = true
    
    const fetchPromotions = async () => {
      try {
        const data = await api.getPromotionsOfferings()
        
        if (!isMounted) return
        
        // Handle both array and object responses
        const promotions: PromotionOffering[] = Array.isArray(data) 
          ? data 
          : ((data as { promotions?: PromotionOffering[]; offerings?: PromotionOffering[] })?.promotions || 
             (data as { promotions?: PromotionOffering[]; offerings?: PromotionOffering[] })?.offerings || 
             [])
        
        // Only set if we have valid promotions
        if (Array.isArray(promotions) && promotions.length > 0) {
          setBackendPromotions(promotions)
        }
        // If no promotions, component will use fallback automatically
      } catch {
        // Silently fail - will use fallback
        // Error is already handled in api.getPromotionsOfferings()
      }
    }

    fetchPromotions()
    
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <motion.header className='w-full relative'>
        <Navigation />
        {/* Hero Slider with video and image support */}
        <PromotionsHeroSlider />
      </motion.header>

      {/* Promotions Slider Section */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-20 bg-white">
        <div className="mb-12 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-left mb-6">
            Explore Our Latest Promotions
          </h2>
          <p className="text-gray-700 text-lg md:text-xl text-left max-w-3xl">
            Check out the newest offers and special deals just for you!
          </p>
        </div>
        <PromotionsCarousel 
          promotions={backendPromotions}
          fallbackPromotions={hardcodedPromotions}
        />
      </section>

      {/* Mobile App Section */}
      <MobileAppSection />

      <Footer />
    </>
  )
}