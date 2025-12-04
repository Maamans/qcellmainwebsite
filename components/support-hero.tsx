"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { api, getImageUrl } from "@/lib/api"

interface HeroSlide {
  id?: string | number
  image?: string
  title?: string
  description?: string
  isActive?: boolean
}

// Fallback images (used if backend unavailable)
const fallbackImages = [
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
]

export default function SupportHero() {
  const [heroImages, setHeroImages] = useState<string[]>(fallbackImages)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadHeroImages = useCallback(async () => {
    if (!mounted) return

    try {
      const slides = await api.getHeroSlides("/support")
      
      if (Array.isArray(slides) && slides.length > 0) {
        const activeSlides = slides
          .filter((slide: HeroSlide) => slide.isActive !== false)
          .slice(0, 6) // Limit to 6 images
        
        if (activeSlides.length > 0) {
          const images = activeSlides.map((slide: HeroSlide) => 
            slide.image ? getImageUrl(slide.image) : fallbackImages[0]
          )
          
          // Fill remaining slots with fallback images if needed
          while (images.length < 6) {
            images.push(fallbackImages[images.length % fallbackImages.length])
          }
          
          setHeroImages(images.slice(0, 6))
          return
        }
      }
      
      // Use fallback images if no backend slides
      setHeroImages(fallbackImages)
    } catch (error) {
      console.warn("Failed to load hero images from backend, using fallback:", error)
      setHeroImages(fallbackImages)
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      loadHeroImages()
    }
  }, [mounted, loadHeroImages])

  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Image Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {/* Row 1 */}
            <div className="col-span-2 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64">
              <Image
                src={heroImages[0] || fallbackImages[0]}
                alt="Support image 1"
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (!target.src.includes('unsplash')) {
                    target.src = fallbackImages[0]
                  }
                }}
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64">
              <Image
                src={heroImages[1] || fallbackImages[1]}
                alt="Support image 2"
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (!target.src.includes('unsplash')) {
                    target.src = fallbackImages[1]
                  }
                }}
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64">
              <Image
                src={heroImages[2] || fallbackImages[2]}
                alt="Support image 3"
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (!target.src.includes('unsplash')) {
                    target.src = fallbackImages[2]
                  }
                }}
              />
            </div>

            {/* Row 2 */}
            <div className="col-span-2 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64 md:mt-4">
              <Image
                src={heroImages[3] || fallbackImages[3]}
                alt="Support image 4"
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (!target.src.includes('unsplash')) {
                    target.src = fallbackImages[3]
                  }
                }}
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64 md:mt-4">
              <Image
                src={heroImages[4] || fallbackImages[4]}
                alt="Support image 5"
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (!target.src.includes('unsplash')) {
                    target.src = fallbackImages[4]
                  }
                }}
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64 md:mt-4">
              <Image
                src={heroImages[5] || fallbackImages[5]}
                alt="Support image 6"
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  if (!target.src.includes('unsplash')) {
                    target.src = fallbackImages[5]
                  }
                }}
              />
            </div>
          </div>

          {/* Central Message Banner */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 lg:w-2/3 z-10">
            <div className="bg-gradient-to-r from-[#F98F1F] to-[#CD7F32] text-white text-center py-6 md:py-8 px-6 rounded-2xl shadow-xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide">HELP IS HERE FOR YOU</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
