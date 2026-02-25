"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getImageUrl } from "@/lib/api"

type PromotionOffering = {
  id: string | number
  title?: string
  image?: string
  order?: number
  isActive?: boolean
  startDate?: string
  endDate?: string
}

type PromotionsCarouselProps = {
  promotions?: PromotionOffering[]
  fallbackPromotions?: PromotionOffering[]
}

const OFFERING_LIMIT = 8

const limitPromotions = (items: PromotionOffering[]) => 
  items.filter(Boolean).slice(0, OFFERING_LIMIT)

/**
 * Merge backend promotions with hardcoded fallback promotions
 * Ensures BOTH backend and hardcoded promotions are shown together
 * Backend promotions are shown first, then hardcoded promotions are added
 * Both sets are maintained - duplicates are allowed to ensure all data is visible
 */
const mergePromotions = (backend: PromotionOffering[], hardcoded: PromotionOffering[]): PromotionOffering[] => {
  // Start with backend promotions first (if they exist)
  const merged: PromotionOffering[] = []
  
  // Add all backend promotions
  backend.forEach(promo => {
    if (promo && promo.id) {
      merged.push(promo)
    }
  })
  
  // Then add all hardcoded promotions (maintaining both sets)
  hardcoded.forEach(promo => {
    if (promo && promo.id) {
      merged.push(promo)
    }
  })
  
  return merged
}

export default function PromotionsCarousel({ 
  promotions, 
  fallbackPromotions = [] 
}: PromotionsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Always start with hardcoded promotions to ensure consistent initial render
  const [promotionsData, setPromotionsData] = useState<PromotionOffering[]>(
    limitPromotions(fallbackPromotions)
  )

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  // Merge backend promotions with hardcoded ones (showing BOTH sets)
  useEffect(() => {
    const backendPromos = Array.isArray(promotions) ? promotions : []
    const hardcodedPromos = Array.isArray(fallbackPromotions) ? fallbackPromotions : []
    
    // Merge both sets: backend first, then hardcoded (both are maintained)
    const merged = mergePromotions(backendPromos, hardcodedPromos)
    setPromotionsData(limitPromotions(merged))
  }, [promotions, fallbackPromotions])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
      emblaApi.reInit()
    }
  }, [emblaApi, promotionsData.length])

  useEffect(() => {
    if (!promotionsData.length) {
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= promotionsData.length) {
      setCurrentIndex(promotionsData.length - 1)
    }
  }, [promotionsData.length, currentIndex])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()
  const slides = useMemo(() => promotionsData.filter(Boolean), [promotionsData])

  if (slides.length === 0) {
    return null
  }

  return (
    <div className="relative w-full px-0 overflow-hidden py-4 md:py-8">
      <div className="relative mx-auto max-w-full -ml-3 sm:px-6 lg:px-8 md:max-w-[110%]">
        <div className="mb-6 px-4 sm:px-0">
          <p className="text-2xl font-medium text-black uppercase tracking-wider">
            List of Our Offerings
          </p>
        </div>
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
                {slides.map((promotion, index) => {
                  const imageUrl = getImageUrl(promotion.image || "")
                  const hasImage = imageUrl && imageUrl.trim() !== ""
                  
                  return (
                    <div
                      key={`${promotion.id}-${index}`}
                      className="relative min-w-0 flex-[0_0_70%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_30.333%]"
                    >
                      <div className="relative h-full min-h-[480px] w-full cursor-pointer md:min-h-[700px]">
                        <div className="group relative h-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20 rounded-lg">
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="relative flex h-full flex-col items-start justify-between p-6">
                            {hasImage ? (
                              <Image
                                src={imageUrl}
                                alt={promotion.title || "Promotion"}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                unoptimized
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  console.warn(`Failed to load image: ${imageUrl}`, e)
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                }}
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-[#CD7F32] to-[#B87333] flex items-center justify-center">
                                <span className="text-white text-xl font-semibold">
                                  {promotion.title || "Promotion"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dot Indicators */}
            {slides.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      currentIndex === index ? "bg-[#CD7F32] w-4" : "bg-gray-300"
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to promotion ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

