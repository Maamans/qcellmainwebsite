"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import Navigation from "@/components/nav"
import Footer from "@/components/footer"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { api, getImageUrl } from "@/lib/api"

// Service interface matching backend API response
interface Service {
  id: number
  name: string
  description: string
  longDescription: string
  image: string
  imageUrl: string | null
  order: number
  isActive: boolean
  category?: string
  createdAt?: string
  updatedAt?: string
}

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Our Services - Qcell"
    // Ensure body and html allow scrolling
    const html = document.documentElement
    const body = document.body
    
    html.style.margin = '0'
    html.style.padding = '0'
    html.style.overflowX = 'hidden'
    html.style.overflowY = 'auto'
    
    body.style.margin = '0'
    body.style.padding = '0'
    body.style.overflowX = 'hidden'
    body.style.overflowY = 'auto'
    
    // Move navbar up slightly on mobile
    const moveNavbarUp = () => {
      if (window.innerWidth <= 640) {
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
          const navElements = document.querySelectorAll('header > div[class*="fixed"], nav.fixed, .nav.fixed')
          navElements.forEach((nav) => {
            const element = nav as HTMLElement
            if (element && element.style) {
              // Only adjust margin-top, keep top visible
              const currentMarginTop = parseInt(element.style.marginTop) || parseInt(window.getComputedStyle(element).marginTop) || 50
              if (currentMarginTop >= 40) {
                element.style.marginTop = '15px'
              }
            }
          })
        }, 300)
      }
    }
    
    // Run on mount and resize
    moveNavbarUp()
    window.addEventListener('resize', moveNavbarUp)
    
    return () => {
      // Cleanup on unmount
      html.style.margin = ''
      html.style.padding = ''
      html.style.overflowX = ''
      html.style.overflowY = ''
      body.style.margin = ''
      body.style.padding = ''
      body.style.overflowX = ''
      body.style.overflowY = ''
      window.removeEventListener('resize', moveNavbarUp)
    }
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [heroSlides, setHeroSlides] = useState<Array<{ id: number; image: string; imageUrl?: string | null }>>([])
  const [isMobile, setIsMobile] = useState(false)
  const [autoPlayProgress, setAutoPlayProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Detect mobile/tablet devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Auto-play functionality - cycles through images automatically
  useEffect(() => {
    if (isScrolling) return // Pause auto-play when scrolling
    
    const interval = setInterval(() => {
      setAutoPlayProgress((prev) => {
        const next = prev + 0.005 // Increment by 0.5% each interval (slower)
        return next >= 1 ? 0 : next // Loop back to 0 when reaching 1
      })
    }, 200) // Update every 200ms for smoother, slower animation (40 seconds for full cycle)
    
    return () => clearInterval(interval)
  }, [isScrolling])
  
  // Detect scrolling to pause auto-play
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 1500) // Resume auto-play 1.5 seconds after scrolling stops
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])
  
  // Get scroll progress for hero section scroll (all screen sizes)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Create spring-based animations for smooth movement (all screen sizes)
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  })
  
  // Create combined progress value that blends scroll and auto-play
  const combinedProgress = useMotionValue(0)
  
  // Update combined progress based on scroll and auto-play
  useEffect(() => {
    const unsubscribeScroll = smoothScrollYProgress.on('change', (latest) => {
      if (isScrolling) {
        combinedProgress.set(latest)
      }
    })
    
    return () => unsubscribeScroll()
  }, [isScrolling, smoothScrollYProgress, combinedProgress])
  
  // Update combined progress with auto-play when not scrolling
  useEffect(() => {
    if (!isScrolling) {
      combinedProgress.set(autoPlayProgress)
    }
  }, [autoPlayProgress, isScrolling, combinedProgress])
  
  // Create spring-based combined progress for smooth animations
  const smoothCombinedProgress = useSpring(combinedProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  })

  // Mobile/Tablet animations - better spread across scroll progress for visibility
  // Each image gets ~11% of scroll progress (0.11) for better visibility
  // Use combined progress (scroll + auto-play)
  const mobileService1Opacity = useTransform(smoothCombinedProgress, [0, 0.05, 0.08, 0.11], [1, 1, 1, 0])
  const mobileService1Y = useTransform(smoothCombinedProgress, [0, 0.05, 0.08, 0.11], [0, 0, 0, -20])
  const mobileService1Scale = useTransform(smoothCombinedProgress, [0, 0.05, 0.08, 0.11], [1, 1, 1, 0.95])

  const mobileService2Opacity = useTransform(smoothCombinedProgress, [0.08, 0.11, 0.19, 0.22], [0, 1, 1, 0])
  const mobileService2Y = useTransform(smoothCombinedProgress, [0.08, 0.11, 0.19, 0.22], [20, 0, 0, -20])
  const mobileService2Scale = useTransform(smoothCombinedProgress, [0.08, 0.11, 0.19, 0.22], [0.95, 1, 1, 0.95])

  const mobileService3Opacity = useTransform(smoothCombinedProgress, [0.19, 0.22, 0.30, 0.33], [0, 1, 1, 0])
  const mobileService3Y = useTransform(smoothCombinedProgress, [0.19, 0.22, 0.30, 0.33], [20, 0, 0, -20])
  const mobileService3Scale = useTransform(smoothCombinedProgress, [0.19, 0.22, 0.30, 0.33], [0.95, 1, 1, 0.95])

  const mobileService4Opacity = useTransform(smoothCombinedProgress, [0.30, 0.33, 0.41, 0.44], [0, 1, 1, 0])
  const mobileService4Y = useTransform(smoothCombinedProgress, [0.30, 0.33, 0.41, 0.44], [20, 0, 0, -20])
  const mobileService4Scale = useTransform(smoothCombinedProgress, [0.30, 0.33, 0.41, 0.44], [0.95, 1, 1, 0.95])

  const mobileService5Opacity = useTransform(smoothCombinedProgress, [0.41, 0.44, 0.52, 0.55], [0, 1, 1, 0])
  const mobileService5Y = useTransform(smoothCombinedProgress, [0.41, 0.44, 0.52, 0.55], [20, 0, 0, -20])
  const mobileService5Scale = useTransform(smoothCombinedProgress, [0.41, 0.44, 0.52, 0.55], [0.95, 1, 1, 0.95])

  const mobileService6Opacity = useTransform(smoothCombinedProgress, [0.52, 0.55, 0.63, 0.66], [0, 1, 1, 0])
  const mobileService6Y = useTransform(smoothCombinedProgress, [0.52, 0.55, 0.63, 0.66], [20, 0, 0, -20])
  const mobileService6Scale = useTransform(smoothCombinedProgress, [0.52, 0.55, 0.63, 0.66], [0.95, 1, 1, 0.95])

  const mobileService7Opacity = useTransform(smoothCombinedProgress, [0.63, 0.66, 0.74, 0.77], [0, 1, 1, 0])
  const mobileService7Y = useTransform(smoothCombinedProgress, [0.63, 0.66, 0.74, 0.77], [20, 0, 0, -20])
  const mobileService7Scale = useTransform(smoothCombinedProgress, [0.63, 0.66, 0.74, 0.77], [0.95, 1, 1, 0.95])

  const mobileService8Opacity = useTransform(smoothCombinedProgress, [0.74, 0.77, 0.85, 0.88], [0, 1, 1, 0])
  const mobileService8Y = useTransform(smoothCombinedProgress, [0.74, 0.77, 0.85, 0.88], [20, 0, 0, -20])
  const mobileService8Scale = useTransform(smoothCombinedProgress, [0.74, 0.77, 0.85, 0.88], [0.95, 1, 1, 0.95])

  const mobileService9Opacity = useTransform(smoothCombinedProgress, [0.85, 0.88, 0.95, 1], [0, 1, 1, 1])
  const mobileService9Y = useTransform(smoothCombinedProgress, [0.85, 0.88, 0.95, 1], [20, 0, 0, 0])
  const mobileService9Scale = useTransform(smoothCombinedProgress, [0.85, 0.88, 0.95, 1], [0.95, 1, 1, 1])

  // Desktop animations - original ranges
  // Use combined progress (scroll + auto-play)
  const desktopService1Opacity = useTransform(smoothCombinedProgress, [0, 0.02, 0.04, 0.06], [1, 1, 1, 0])
  const desktopService1Y = useTransform(smoothCombinedProgress, [0, 0.02, 0.04, 0.06], [0, 0, 0, -20])
  const desktopService1Scale = useTransform(smoothCombinedProgress, [0, 0.02, 0.04, 0.06], [1, 1, 1, 0.95])

  const desktopService2Opacity = useTransform(smoothCombinedProgress, [0.02, 0.04, 0.10, 0.12], [0, 1, 1, 0])
  const desktopService2Y = useTransform(smoothCombinedProgress, [0.02, 0.04, 0.10, 0.12], [20, 0, 0, -20])
  const desktopService2Scale = useTransform(smoothCombinedProgress, [0.02, 0.04, 0.10, 0.12], [0.95, 1, 1, 0.95])

  const desktopService3Opacity = useTransform(smoothCombinedProgress, [0.08, 0.10, 0.16, 0.18], [0, 1, 1, 0])
  const desktopService3Y = useTransform(smoothCombinedProgress, [0.08, 0.10, 0.16, 0.18], [20, 0, 0, -20])
  const desktopService3Scale = useTransform(smoothCombinedProgress, [0.08, 0.10, 0.16, 0.18], [0.95, 1, 1, 0.95])

  const desktopService4Opacity = useTransform(smoothCombinedProgress, [0.14, 0.16, 0.22, 0.24], [0, 1, 1, 0])
  const desktopService4Y = useTransform(smoothCombinedProgress, [0.14, 0.16, 0.22, 0.24], [20, 0, 0, -20])
  const desktopService4Scale = useTransform(smoothCombinedProgress, [0.14, 0.16, 0.22, 0.24], [0.95, 1, 1, 0.95])

  const desktopService5Opacity = useTransform(smoothCombinedProgress, [0.20, 0.22, 0.28, 0.30], [0, 1, 1, 0])
  const desktopService5Y = useTransform(smoothCombinedProgress, [0.20, 0.22, 0.28, 0.30], [20, 0, 0, -20])
  const desktopService5Scale = useTransform(smoothCombinedProgress, [0.20, 0.22, 0.28, 0.30], [0.95, 1, 1, 0.95])

  const desktopService6Opacity = useTransform(smoothCombinedProgress, [0.26, 0.28, 0.34, 0.36], [0, 1, 1, 0])
  const desktopService6Y = useTransform(smoothCombinedProgress, [0.26, 0.28, 0.34, 0.36], [20, 0, 0, -20])
  const desktopService6Scale = useTransform(smoothCombinedProgress, [0.26, 0.28, 0.34, 0.36], [0.95, 1, 1, 0.95])

  const desktopService7Opacity = useTransform(smoothCombinedProgress, [0.32, 0.34, 0.40, 0.42], [0, 1, 1, 0])
  const desktopService7Y = useTransform(smoothCombinedProgress, [0.32, 0.34, 0.40, 0.42], [20, 0, 0, -20])
  const desktopService7Scale = useTransform(smoothCombinedProgress, [0.32, 0.34, 0.40, 0.42], [0.95, 1, 1, 0.95])

  const desktopService8Opacity = useTransform(smoothCombinedProgress, [0.38, 0.40, 0.46, 0.48], [0, 1, 1, 0])
  const desktopService8Y = useTransform(smoothCombinedProgress, [0.38, 0.40, 0.46, 0.48], [20, 0, 0, -20])
  const desktopService8Scale = useTransform(smoothCombinedProgress, [0.38, 0.40, 0.46, 0.48], [0.95, 1, 1, 0.95])

  const desktopService9Opacity = useTransform(smoothCombinedProgress, [0.44, 0.46, 0.55, 1], [0, 1, 1, 1])
  const desktopService9Y = useTransform(smoothCombinedProgress, [0.44, 0.46, 0.55, 1], [20, 0, 0, 0])
  const desktopService9Scale = useTransform(smoothCombinedProgress, [0.44, 0.46, 0.55, 1], [0.95, 1, 1, 1])
  
  // Choose animations based on device type
  const serviceAnimations = isMobile ? [
    { opacity: mobileService1Opacity, y: mobileService1Y, scale: mobileService1Scale },
    { opacity: mobileService2Opacity, y: mobileService2Y, scale: mobileService2Scale },
    { opacity: mobileService3Opacity, y: mobileService3Y, scale: mobileService3Scale },
    { opacity: mobileService4Opacity, y: mobileService4Y, scale: mobileService4Scale },
    { opacity: mobileService5Opacity, y: mobileService5Y, scale: mobileService5Scale },
    { opacity: mobileService6Opacity, y: mobileService6Y, scale: mobileService6Scale },
    { opacity: mobileService7Opacity, y: mobileService7Y, scale: mobileService7Scale },
    { opacity: mobileService8Opacity, y: mobileService8Y, scale: mobileService8Scale },
    { opacity: mobileService9Opacity, y: mobileService9Y, scale: mobileService9Scale },
  ] : [
    { opacity: desktopService1Opacity, y: desktopService1Y, scale: desktopService1Scale },
    { opacity: desktopService2Opacity, y: desktopService2Y, scale: desktopService2Scale },
    { opacity: desktopService3Opacity, y: desktopService3Y, scale: desktopService3Scale },
    { opacity: desktopService4Opacity, y: desktopService4Y, scale: desktopService4Scale },
    { opacity: desktopService5Opacity, y: desktopService5Y, scale: desktopService5Scale },
    { opacity: desktopService6Opacity, y: desktopService6Y, scale: desktopService6Scale },
    { opacity: desktopService7Opacity, y: desktopService7Y, scale: desktopService7Scale },
    { opacity: desktopService8Opacity, y: desktopService8Y, scale: desktopService8Scale },
    { opacity: desktopService9Opacity, y: desktopService9Y, scale: desktopService9Scale },
  ]
  
  // Carousel for services section
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  // Fallback hardcoded services (used if API fails)
  const homepageHeroImages = [
    "/images/expand your world (1).jpg",
    "/images/expand your world copy.jpg",
    "/images/background-one.jpg",
    "/images/background-two.jpg",
    "/images/network-operator.jpg",
    "/images/business-corporate.jpg",
    "/images/team.jpg",
    "/images/work.jpg",
    "/images/work1.jpg",
  ]

  const fallbackServices: Service[] = [
    { id: 1, name: "CUG", description: "Closed User Group", image: homepageHeroImages[0], imageUrl: null, longDescription: "Enjoy unlimited calls within your organization or group at a fixed monthly rate. Perfect for businesses and teams who need seamless, cost-effective communication.", order: 1, isActive: true },
    { id: 2, name: "eSIM", description: "Digital SIM Cards", image: homepageHeroImages[1], imageUrl: null, longDescription: "Go digital with eSIM technology—activate your mobile plan instantly without a physical SIM card. Convenient, secure, and perfect for modern devices.", order: 2, isActive: true },
    { id: 3, name: "Tros-Mi-Topup", description: "No Credit. No Wahala!", image: homepageHeroImages[2], imageUrl: null, longDescription: "Never run out of credit again! With Tros-Mi-Topup, you can instantly borrow airtime when you need it most. Stay connected even when your balance is low—no stress, no interest, no hassle.", order: 3, isActive: true },
    { id: 4, name: "Q-Power", description: "Buy EDSA using Topup", image: homepageHeroImages[3], imageUrl: null, longDescription: "Easily purchase EDSA electricity tokens directly from your QCell credit balance. Q-Power makes it simple and convenient to keep your home or business powered up, anytime and anywhere.", order: 4, isActive: true },
    { id: 5, name: "New simpack", description: "Get Your New SIM", image: homepageHeroImages[4], imageUrl: null, longDescription: "Get started with QCell by getting your new SIM pack. Join thousands of satisfied customers enjoying reliable connectivity and great service.", order: 5, isActive: true },
    { id: 6, name: "Tok Boko Boko Bundle", description: "Talk More Bundle", image: homepageHeroImages[5], imageUrl: null, longDescription: "Enjoy more talk time with our Tok Boko Boko Bundle. Perfect for staying connected with friends, family, and colleagues with great value for money.", order: 6, isActive: true },
    { id: 7, name: "VAS Offers", description: "Value Added Services", image: homepageHeroImages[6], imageUrl: null, longDescription: "Enhance your mobile experience with our Value Added Services, including caller tunes, SMS bundles, mobile entertainment, and more.", order: 7, isActive: true },
    { id: 8, name: "SMB", description: "Small & Medium Business", image: homepageHeroImages[7], imageUrl: null, longDescription: "Tailored solutions for small and medium businesses. Get the connectivity and services your business needs to grow and succeed.", order: 8, isActive: true },
    { id: 9, name: "Qtunes", description: "Caller Tunes & Music", image: homepageHeroImages[8], imageUrl: null, longDescription: "Personalize your phone with Qtunes. Set your favorite songs as caller tunes and enjoy music services that keep you entertained.", order: 9, isActive: true },
  ]

  // Helper function to get service image URL (prefers imageUrl over image)
  const getServiceImageUrl = (service: Service): string => {
    // Prefer imageUrl if available (CDN/external)
    if (service.imageUrl) {
      return service.imageUrl
    }
    // Use getImageUrl helper for image path
    return getImageUrl(service.image)
  }

  // Fetch hero slides for services page
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        // Try both '/services' and 'services' as page parameter
        // Fetch hero slides for services page - try both formats
        let slides = null
        try {
          slides = await api.getHeroSlides('/services')
        } catch {
          try {
            slides = await api.getHeroSlides('services')
          } catch {
            // If both fail, slides will remain null
          }
        }
        console.log('Fetched hero slides for services page:', slides)
        if (slides && Array.isArray(slides) && slides.length > 0) {
          const activeSlides = slides
            .filter((slide: { isActive?: boolean }) => slide.isActive !== false)
            .sort((a: { order?: number; id?: number }, b: { order?: number; id?: number }) => {
              // Sort by order if available, then by ID
              if (typeof a.order === 'number' && typeof b.order === 'number') {
                return a.order - b.order
              }
              return (a.id || 0) - (b.id || 0)
            })
            .map((slide: { id: number; image: string; imageUrl?: string | null }) => ({
              id: slide.id,
              image: slide.image,
              imageUrl: slide.imageUrl || null
            }))
          console.log('Active hero slides after processing:', activeSlides.length, activeSlides)
          if (activeSlides.length > 0) {
            setHeroSlides(activeSlides)
          }
        } else {
          console.log('No hero slides found - will use service images')
        }
      } catch (err) {
        console.error('Failed to fetch hero slides:', err)
        // Keep empty array, will use service images as fallback
      }
    }

    fetchHeroSlides()
  }, [])

  // Initialize with hardcoded services, then fetch from API and merge
  useEffect(() => {
    // Start with hardcoded services immediately
    setServices(fallbackServices)
    setLoading(true)
    
    const fetchServices = async () => {
      try {
        setError(null)
        
        // Fetch from backend API
        const data = await api.getServices()
        
        // Services are already filtered by isActive and sorted by order from backend
        if (data && data.length > 0) {
          // Merge backend services with hardcoded fallback
          // Backend services take priority, but keep hardcoded as fallback
          // Combine both arrays, removing duplicates by name
          const backendServiceNames = new Set(data.map((s: Service) => s.name.toLowerCase()))
          const uniqueFallbackServices = fallbackServices.filter(
            fb => !backendServiceNames.has(fb.name.toLowerCase())
          )
          
          // Combine: backend services first (sorted by order), then fallback services
          const combinedServices = [...data, ...uniqueFallbackServices].sort((a, b) => a.order - b.order)
          
          setServices(combinedServices)
        } else {
          // If no services returned from backend, keep hardcoded services
          setServices(fallbackServices)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load services'
        console.error('Failed to fetch services:', err)
        setError(errorMessage)
        // Keep hardcoded services on error (already set above)
        // setServices(fallbackServices) - not needed, already set
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update current index when carousel changes
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
          overflow-y: auto !important;
        }
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          overflow-x: hidden !important;
          overflow-y: auto !important;
          background-color: #F98F1F !important;
        }
        #__next {
          margin: 0 !important;
          padding: 0 !important;
        }
        /* Base styles - Desktop only (1024px+) */
        @media (min-width: 1024px) {
          [data-hero-container] {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 0 !important;
            overflow: hidden !important;
            background-color: #F98F1F !important;
          }
        }
        /* Base styles for all screens - will be overridden by media queries */
        [data-hero-container] > div {
          background-color: transparent !important;
        }
        [data-hero-container] > * {
          width: 100% !important;
          height: 100% !important;
        }
        /* Extra Small Devices (Mobile Phones) - 0-480px */
        @media (max-width: 480px) {
          .services-nav-wrapper {
            position: relative !important;
            z-index: 100 !important;
          }
          header > div[class*="fixed"],
          nav.fixed,
          .nav.fixed {
            margin-top: 15px !important;
          }
          section[class*="relative"][class*="h-"] {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            left: 0 !important;
            right: 0 !important;
          }
          [data-hero-container] {
            position: relative !important;
            height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 0 !important;
          }
          [data-hero-container] > div {
            height: 100% !important;
            width: 100% !important;
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
          }
          [data-hero-container] > div > div {
            width: 100% !important;
            height: 100% !important;
          }
          .hero-image-container {
            height: 153% !important;
            min-height: 153% !important;
            transform: translateY(-14%) !important;
          }
          .hero-image-responsive {
            object-fit: contain !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
          [data-hero-container] img {
            object-fit: contain !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
        }
        /* Small Devices (Large Phones / Small Tablets) - 481-768px */
        @media (min-width: 481px) and (max-width: 768px) {
          .services-nav-wrapper {
            position: relative !important;
            z-index: 100 !important;
          }
          header > div[class*="fixed"],
          nav.fixed,
          .nav.fixed {
            margin-top: 15px !important;
          }
          section[class*="relative"][class*="h-"] {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            left: 0 !important;
            right: 0 !important;
          }
          [data-hero-container] {
            position: relative !important;
            height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 0 !important;
          }
          [data-hero-container] > div {
            height: 100% !important;
            width: 100% !important;
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
          }
          [data-hero-container] > div > div {
            width: 100% !important;
            height: 100% !important;
          }
          .hero-image-container {
            height: 153% !important;
            min-height: 153% !important;
            transform: translateY(-14%) !important;
          }
          .hero-image-responsive {
            object-fit: contain !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
          [data-hero-container] img {
            object-fit: contain !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
        }
        /* Medium Devices (Tablets) - 769-1023px */
        @media (min-width: 769px) and (max-width: 1023px) {
          section[class*="relative"][class*="h-"] {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            left: 0 !important;
            right: 0 !important;
          }
          [data-hero-container] {
            position: relative !important;
            height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 0 !important;
          }
          [data-hero-container] > div {
            height: 100% !important;
            width: 100% !important;
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
          }
          [data-hero-container] > div > div {
            width: 100% !important;
            height: 100% !important;
          }
          .hero-image-container {
            height: 153% !important;
            min-height: 153% !important;
            transform: translateY(-14%) !important;
          }
          [data-hero-container] img {
            object-fit: contain !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
        }
        /* Desktop/Web - 1024px and above (keep original fixed positioning) */
        @media (min-width: 1024px) {
          [data-hero-container] {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 0 !important;
            overflow: hidden !important;
            background-color: #F98F1F !important;
          }
          [data-hero-container] > div {
            width: 100% !important;
          }
          .hero-image-container {
            height: 100% !important;
            min-height: 100% !important;
          }
          .hero-image-responsive {
            object-fit: cover !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
          [data-hero-container] img {
            object-fit: cover !important;
            object-position: center center !important;
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            position: relative !important;
          }
        }
      `}} />
      <div ref={containerRef} style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        <div className="services-nav-wrapper">
        <Navigation page="services" />
        </div>

        {/* Hero Section - Scroll Animation for All Screen Sizes */}
        <motion.section
          ref={heroRef}
          className="relative h-[36vh] sm:h-[44vh] md:h-[52vh] lg:h-[200vh] xl:h-[250vh] w-full overflow-hidden"
          style={{ 
            margin: 0, 
            padding: 0, 
            position: 'relative', 
            width: '100%'
          }}>
          {/* Background Images - Scroll Animation for All Screens */}
          <div 
            data-hero-container
            className="bg-[#F98F1F] h-full w-full relative"
            style={{ 
              backgroundColor: '#F98F1F',
              width: '100%',
              height: '100%'
            }}
          >
            {(() => {
              interface ImageItem {
                id: number | string
                image: string
                alt: string
              }

              // Combine hero slides with service images
              // Hero slides first, then fill remaining slots with service images (up to 9 total)
              const maxImages = 9
              const heroSlideImages: ImageItem[] = heroSlides.slice(0, maxImages).map((slide, idx) => ({
                id: `hero-${slide.id}`,
                image: slide.imageUrl || getImageUrl(slide.image),
                alt: `Hero slide ${idx + 1}`
              }))
              
              const remainingSlots = maxImages - heroSlideImages.length
              const serviceImages: ImageItem[] = remainingSlots > 0
                ? services.slice(0, remainingSlots).map((service) => ({
                    id: service.id,
                    image: getServiceImageUrl(service),
                    alt: service.name
                  }))
                : []
              
              // If no hero slides, use service images (up to 9)
              const imagesToShow: ImageItem[] = heroSlideImages.length > 0
                ? [...heroSlideImages, ...serviceImages].slice(0, maxImages)
                : services.slice(0, maxImages).map((service) => ({
                    id: service.id,
                    image: getServiceImageUrl(service),
                    alt: service.name
                  }))

              console.log('Total images to render:', imagesToShow.length, imagesToShow.map(img => img.alt))
              
              return imagesToShow.map((item, index) => {
                // Use animation if available, otherwise use first animation
                const animation = serviceAnimations[index] || serviceAnimations[0]
                console.log(`Rendering image ${index + 1}/${imagesToShow.length}:`, item.alt)
                
                return (
                <motion.div
                    key={`bg-${item.id || index}-${index}`}
                  className="absolute inset-0 w-full h-full"
                  style={{
                      opacity: animation.opacity,
                      y: animation.y,
                      scale: animation.scale,
                    zIndex: index + 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: "100%",
                    height: "100%",
                      pointerEvents: 'none',
                  }}
                >
                    <div 
                      className="relative w-full overflow-hidden flex items-center justify-center hero-image-container" 
                      style={{ 
                        width: "100%", 
                        height: "153%",
                        minHeight: "153%",
                        position: "relative",
                        backgroundColor: "#F98F1F"
                      }}
                    >
                      <Image
                        src={item.image || "/images/expand your world (1).jpg"}
                        alt={item.alt}
                        fill
                        className="hero-image-responsive"
                        style={{
                          objectPosition: "center center",
                        }}
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        priority={index < 3}
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/expand your world (1).jpg"
                        }}
                      />
                    </div>
                </motion.div>
                )
              })
            })()}
          </div>
        </motion.section>

        {/* Services Carousel Section */}
        <div className="relative z-30 bg-white py-8 md:py-12">
          <div className="relative w-full px-0 overflow-hidden">
            <div className="relative mx-auto max-w-full -ml-3 sm:px-6 lg:px-8 md:max-w-[110%]">
              <div className="mb-6 px-4 sm:px-0">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Services</h2>
                <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl">
              Explore our offerings below to find the perfect service for your needs. Whether you need seamless communication, high-speed internet, or advanced digital services, QCell delivers reliable options tailored for individuals, families, and businesses. 
            </p>
                <p className="text-2xl font-medium text-black uppercase tracking-wider">List of Our Services</p>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F98F1F] mb-4"></div>
                    <p className="text-gray-600">Loading services...</p>
                  </div>
                </div>
              ) : error && services.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <p className="text-red-600 mb-2">Error: {error}</p>
                    <p className="text-gray-600">Using fallback services</p>
                  </div>
                </div>
              ) : services.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-gray-600">No services available</p>
                </div>
              ) : (
              <div>
                <div className="relative">
                  {/* Previous Button */}
                  <div className="hidden sm:block absolute left-0 top-1/2 z-10 -translate-y-1/2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full border border-gray-200 bg-white/80 shadow-lg backdrop-blur-sm"
                      onClick={scrollPrev}
                    >
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">Previous slide</span>
                    </Button>
                  </div>

                  {/* Next Button */}
                  <div className="hidden sm:block absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-5 md:translate-x-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full border border-gray-200 bg-white/80 shadow-lg backdrop-blur-sm"
                      onClick={scrollNext}
                    >
                      <ChevronRight className="h-6 w-6" />
                      <span className="sr-only">Next slide</span>
                    </Button>
                  </div>

                  {/* Carousel */}
                  <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex touch-pan-y w-full rounded-lg">
                      {services.map((service) => (
                        <div
                          key={service.id || service.name}
                          className="relative min-w-0 flex-[0_0_70%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_30.333%]"
                        >
                          <motion.div className="relative h-full min-h-[480px] w-full cursor-pointer md:min-h-[700px] group">
                            <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20 rounded-lg">
                              <CardContent className="relative flex h-full flex-col items-start justify-between p-6">
                                {/* Background Image */}
                                <Image
                                  src={getServiceImageUrl(service) || "/images/device1.jpg"}
                                  alt={service.name}
                                  fill
                                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                  unoptimized
                                />
                                
                                {/* Dark overlay for better text readability */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                                {/* Service Content Overlay */}
                                <div className="relative z-20 mt-auto w-full">
                                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    {service.name}
                  </h3>
                                  <p className="text-lg md:text-xl text-white/90 drop-shadow-md mb-4">
                                    {service.description}
                                  </p>
                                  
                                  {/* Plus Button at Bottom Right */}
                                  <div className="flex justify-end">
                                    <button
                                      onClick={() => setSelectedServiceId(service.id)}
                                      className="w-12 h-12 rounded-full bg-[#F98F1F] text-white flex items-center justify-center shadow-lg hover:bg-[#FF8400] hover:scale-110 transition-all group-hover:rotate-90"
                                      aria-label={`Learn more about ${service.name}`}
                                    >
                                      <Plus className="h-6 w-6" />
                                    </button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dot Indicators */}
                  {services.length > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                      {services.map((_, index) => (
                        <button
                          key={index}
                          className={`h-2 w-2 rounded-full transition-all ${
                            currentIndex === index ? "bg-[#CD7F32] w-4" : "bg-gray-300"
                          }`}
                          onClick={() => emblaApi?.scrollTo(index)}
                          aria-label={`Go to service ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <Dialog open={selectedServiceId !== null} onOpenChange={(open) => !open && setSelectedServiceId(null)}>
        <DialogContent className="max-w-6xl lg:max-w-7xl xl:max-w-[90vw] w-full h-[95vh] max-h-[95vh] overflow-hidden flex flex-col p-0">
          {selectedServiceId !== null && (() => {
            const selectedService = services.find(s => s.id === selectedServiceId)
            if (!selectedService) return null
            
            return (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                      {selectedService.name}
                  </DialogTitle>
                  <DialogDescription className="text-xl md:text-2xl text-gray-600 mt-3">
                      {selectedService.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-8">
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                      {selectedService.longDescription}
                  </p>
                </div>
              </div>
              
              {/* Fixed Footer with Buttons */}
              <div className="border-t border-gray-200 p-6 md:p-8 bg-white flex gap-4 justify-end">
                <Button
                    onClick={() => setSelectedServiceId(null)}
                  className="bg-[#F98F1F] hover:bg-[#FF8400] text-white px-8 py-6 text-lg"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Add action for "Learn More" or "Get Started"
                      setSelectedServiceId(null)
                  }}
                  className="px-8 py-6 text-lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
            )
          })()}
        </DialogContent>
      </Dialog>
      
      <Footer />

      {typeof window !== "undefined" && (
        <div
            className="hidden backdrop-filter z-[40] bg-black/40 absolute inset-0 transition-all"
            style={{ height: `${document.body.scrollHeight}px` }}
        ></div>
      )}
    </>
  )
}