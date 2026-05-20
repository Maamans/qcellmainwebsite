"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import Navigation from "@/components/navigation-two"
import Footer from "@/components/footer"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ServiceModal from "@/components/services/service-modal"
import { api, getImageUrl } from "@/lib/api"

// Service interface matching backend API response
interface Service {
  id: number | string
  name: string
  description: string
  longDescription?: string
  detailsTitle?: string
  detailsDescription?: string
  detailsBenefits?: string[]
  features?: string[]
  image: string
  imageUrl?: string | null
  order: number
  isActive: boolean
  category?: string
  ctaText?: string
  ctaAction?: string
  createdAt?: string
  updatedAt?: string
}

// Backend API response type (may have title instead of name, etc.)
interface ServiceApiResponse {
  id: number | string
  name?: string
  title?: string
  description?: string
  longDescription?: string
  detailsTitle?: string
  detailsDescription?: string
  detailsBenefits?: string[]
  features?: string[]
  image?: string
  imageUrl?: string | null
  order?: number
  isActive?: boolean
  category?: string
  ctaText?: string
  ctaAction?: string
  createdAt?: string
  updatedAt?: string
}

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Our Services - QCell"
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
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [heroImage, setHeroImage] = useState<string>("/images/expand your world (1).jpg")
  
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

  // Fetch hero image for services page
  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        // Try both '/services' and 'services' as page parameter
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
        if (slides && Array.isArray(slides) && slides.length > 0) {
          const activeSlide = slides
            .filter((slide: { isActive?: boolean }) => slide.isActive !== false)
            .sort((a: { order?: number; id?: number }, b: { order?: number; id?: number }) => {
              if (typeof a.order === 'number' && typeof b.order === 'number') {
                return a.order - b.order
              }
              return (a.id || 0) - (b.id || 0)
            })[0]
          
          if (activeSlide) {
            const imageUrl = activeSlide.imageUrl || getImageUrl(activeSlide.image)
            setHeroImage(imageUrl)
          }
        }
      } catch (err) {
        console.error('Failed to fetch hero image:', err)
        // Keep default image
      }
    }

    fetchHeroImage()
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
        // Backend transforms: title → name, detailsDescription → longDescription
        if (data && data.length > 0) {
          // Map backend services to match our Service interface
          // Backend returns: { id, name (from title), description, longDescription (from detailsDescription), ... }
          const backendServices: Service[] = data.map((s: ServiceApiResponse) => ({
            id: s.id,
            name: s.name || s.title || '',
            description: s.description || '',
            longDescription: s.longDescription || s.detailsDescription || '',
            detailsTitle: s.detailsTitle,
            detailsDescription: s.detailsDescription,
            detailsBenefits: Array.isArray(s.detailsBenefits) ? s.detailsBenefits : [],
            features: Array.isArray(s.features) ? s.features : [],
            image: s.image || '',
            imageUrl: s.imageUrl || null,
            order: s.order || 0,
            isActive: s.isActive !== false,
            category: s.category,
            ctaText: s.ctaText,
            ctaAction: s.ctaAction,
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
          }))
          
          // Merge backend services with hardcoded fallback
          // Backend services take priority, but keep hardcoded as fallback
          // Combine both arrays, removing duplicates by name
          const backendServiceNames = new Set(backendServices.map((s: Service) => s.name.toLowerCase()))
          const uniqueFallbackServices = fallbackServices.filter(
            fb => !backendServiceNames.has(fb.name.toLowerCase())
          )
          
          // Combine: backend services first (sorted by order), then fallback services
          const combinedServices = [...backendServices, ...uniqueFallbackServices].sort((a, b) => a.order - b.order)
          
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
        }
        #__next {
          margin: 0 !important;
          padding: 0 !important;
        }
        @media (max-width: 640px) {
          .services-nav-wrapper {
            position: relative !important;
            z-index: 100 !important;
          }
          header > div[class*="fixed"],
          nav.fixed,
          .nav.fixed {
            margin-top: 15px !important;
          }
        }
      `}} />
      <div ref={containerRef} style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        <div className="services-nav-wrapper">
        <Navigation />
        </div>

        {/* Hero Section - Static Image with Text Overlay */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={heroImage}
              alt="Services"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
              unoptimized
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/images/expand your world (1).jpg"
              }}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8 text-center">
              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-3 text-white tracking-tight"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.02em'
                }}
              >
                Services
              </motion.h1>
              
              {/* Accent Line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80px", opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  ease: "easeOut"
                }}
                className="h-1 bg-gradient-to-r from-[#F98F1F] to-[#FF8400] mb-3 rounded-full"
              />
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.5,
                  ease: "easeOut"
                }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 font-light max-w-4xl leading-relaxed tracking-wide"
                style={{
                  textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)'
                }}
              >
                Enjoy the list of our services
              </motion.p>
            </div>
          </div>
        </section>

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
                                      onClick={() => setSelectedService(service)}
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
      <ServiceModal 
        service={selectedService} 
        isOpen={selectedService !== null} 
        onClose={() => setSelectedService(null)} 
      />
      
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