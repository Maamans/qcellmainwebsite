"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Clock } from "lucide-react"
import Navigation from "@/components/nav"
import Footer from "@/components/footer"
import { api, getImageUrl } from "@/lib/api"

interface HeroSlide {
  id?: string | number
  image?: string
  title?: string
  description?: string
  isActive?: boolean
}

interface PageSection {
  id?: string | number
  section?: string
  title?: string
  content?: string
  order?: number
  isActive?: boolean
}

export default function CareersApplyPage() {
  const [heroSlide, setHeroSlide] = useState<HeroSlide | null>(null)
  const [pageContent, setPageContent] = useState<PageSection[]>([])

  // Load hero slide and page content from backend (non-blocking)
  const loadPageData = useCallback(async () => {
    try {
      // Fetch hero slide and page content in parallel
      const [heroSlides, content] = await Promise.all([
        api.getHeroSlides('/careers/apply'),
        api.getPageContent('/careers/apply')
      ])

      // Process hero slide (use first active slide)
      if (Array.isArray(heroSlides) && heroSlides.length > 0) {
        const activeSlide = heroSlides.find((slide: HeroSlide) => slide.isActive !== false) || heroSlides[0]
        setHeroSlide(activeSlide)
      }

      // Process page content
      if (Array.isArray(content) && content.length > 0) {
        const activeContent = content.filter((item: PageSection) => item.isActive !== false)
        setPageContent(activeContent)
      }
    } catch (error) {
      console.warn('Failed to load careers apply page data, using fallback:', error)
    }
  }, [])

  useEffect(() => {
    loadPageData()
  }, [loadPageData])

  // Helper to get section content
  const getSection = (sectionName: string): PageSection | undefined => {
    return pageContent.find(s => s.section === sectionName)
  }

  // Use static vacancies hero image for apply page
  const heroImageUrl = '/images/Vacancies.png'

  // Determine no vacancies content (page content > fallback)
  const noVacanciesTitle = getSection('no-vacancies')?.title || 'NO VACANCIES FOR NOW'
  const noVacanciesText = getSection('no-vacancies')?.content || 
    'We appreciate your interest in joining the QCell team. Currently, we don\'t have any open positions, but we\'re always looking for talented individuals to join our growing family.'

  return (
    <>
      <Navigation page="careers" />
      
      {/* Hero Section - static vacancies image, responsive across devices */}
      <section className="relative w-full overflow-hidden pt-4 md:pt-0 lg:pt-0">
        <div className="relative w-full h-[240px] sm:h-[340px] md:h-[480px] lg:h-[560px] bg-gray-100">
          <Image
            src={heroImageUrl}
            alt="QCell Careers Vacancies"
            fill
            sizes="100vw"
            className="object-cover object-[80%_center] md:object-center"
            priority
          />
        </div>
      </section>

      {/* No Vacancies Section */}
      <section className="relative pt-4 pb-8 md:pt-8 md:pb-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#F98F1F]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#077aca]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Icon Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#F98F1F] to-[#ff9c33] rounded-full mb-8 shadow-2xl"
            >
              <Clock className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </motion.div>

            {/* Main Message */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {noVacanciesTitle}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {noVacanciesText}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}

