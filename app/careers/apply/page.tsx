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
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.title = 'Apply for Careers - QCell'
  }, [])

  // Load hero slide and page content from backend
  const loadPageData = useCallback(async () => {
    if (!mounted) return

    try {
      setLoading(true)
      
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
    } finally {
      setLoading(false)
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      loadPageData()
    }
  }, [mounted, loadPageData])

  // Helper to get section content
  const getSection = (sectionName: string): PageSection | undefined => {
    return pageContent.find(s => s.section === sectionName)
  }

  // Determine hero image URL (backend > fallback)
  const heroImageUrl = heroSlide?.image 
    ? getImageUrl(heroSlide.image)
    : '/images/bbb.png'
  
  // Determine hero title (page content > hero slide > fallback)
  const heroTitle = getSection('hero')?.title || heroSlide?.title || 'Join the QCell Family'
  
  // Determine hero description (page content > hero slide > fallback)
  const heroDescription = getSection('hero')?.content || heroSlide?.description || 
    'Explore exciting career opportunities and be part of Sierra Leone\'s leading telecommunications company'

  // Determine no vacancies content (page content > fallback)
  const noVacanciesTitle = getSection('no-vacancies')?.title || 'NO VACANCIES FOR NOW'
  const noVacanciesText = getSection('no-vacancies')?.content || 
    'We appreciate your interest in joining the QCell team. Currently, we don\'t have any open positions, but we\'re always looking for talented individuals to join our growing family.'

  if (!mounted || loading) {
    return (
      <>
        <Navigation page="careers" />
        <main className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-xl text-gray-600">Loading...</div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation page="careers" />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt={heroSlide?.title || "QCell Careers Application Background"}
            fill
            className="object-cover"
            priority
            unoptimized={heroImageUrl.startsWith('http') || heroImageUrl.includes('localhost:4000')}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              if (!target.src.includes('bbb.png')) {
                target.src = '/images/bbb.png'
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-[#F98F1F]/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            {/* Title with slide-in effect */}
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <motion.span 
                className="block mb-2"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {heroTitle.split(' ').slice(0, 2).join(' ')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="block bg-gradient-to-r from-[#F98F1F] via-[#ff9c33] to-[#F98F1F] bg-clip-text text-transparent"
              >
                {heroTitle.split(' ').slice(2).join(' ')}
              </motion.span>
            </motion.h1>

            {/* Decorative line with slide effect */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <motion.div 
                className="h-px w-12 bg-gradient-to-r from-transparent to-[#F98F1F]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              ></motion.div>
              <motion.div 
                className="w-1.5 h-1.5 bg-[#F98F1F] rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  delay: 1.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              ></motion.div>
              <motion.div 
                className="h-px w-12 bg-gradient-to-l from-transparent to-[#F98F1F]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: 1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              ></motion.div>
            </motion.div>

            {/* Description with slide-up effect */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light"
            >
              {heroDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* No Vacancies Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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

