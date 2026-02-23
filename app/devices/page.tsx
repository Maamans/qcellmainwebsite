"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import Navigation from "@/components/nav"
import DevicesSlider from "@/components/devices/device-slider"
import DevicesSliderSmall from "@/components/devices/devices-slider-small"
import SliderImages from "@/components/devices/slider-images"
import Footer from "@/components/footer"
import BenefitsSlider from "@/components/benefits-slider"
import { api, getImageUrl } from "@/lib/api"
import type { DeviceContent } from "@/types/devices"

type HeroSlide = {
  id?: string | number
  title?: string | null
  description?: string | null
  image?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  order?: number | null
  isActive?: boolean | null
  source?: "cms" | "fallback" | "image-only"
}

type CmsHeroSlideCandidate = HeroSlide & { image?: string | null; id?: string | number }
type CmsHeroSlide = HeroSlide & { id: string | number; image?: string }
type FallbackHeroSlide = HeroSlide & { id: string | number; image?: string }

type ImageOnlyHeroSlidePayload = {
  id?: string | number
  image?: string | null
  order?: number | null
  sourceSection?: string | null
}

type PageSection = {
  id?: string | number
  section?: string | null
  title?: string | null
  content?: string | null
  image?: string | null
  order?: number | null
  data?: Record<string, unknown> | null
  isActive?: boolean | null
}

const fallbackHeroSlides: FallbackHeroSlide[] = [
  {
    id: "devices-hero-1",
    title: "Devices that keep you connected.",
    description: "Explore smartphones, routers, and gadgets — all powered by QCell.",
    image: "/images/devc1.png",
    ctaText: "See all devices",
    ctaLink: "#devices",
  },
  {
    id: "devices-hero-2",
    title: "Devices that keep you connected.",
    description: "Explore smartphones, routers, and gadgets — all powered by QCell.",
    image: "/images/devc2.png",
    ctaText: "See all devices",
    ctaLink: "#devices",
  },
  {
    id: "devices-hero-3",
    title: "Devices that keep you connected.",
    description: "Explore smartphones, routers, and gadgets — all powered by QCell.",
    image: "/images/devc3.png",
    ctaText: "See all devices",
    ctaLink: "#devices",
  },
  {
    id: "devices-hero-4",
    title: "Devices that keep you connected.",
    description: "Explore smartphones, routers, and gadgets — all powered by QCell.",
    image: "/images/devc4.jpg",
    ctaText: "See all devices",
    ctaLink: "#devices",
  },
]

const mergeWithFallback = <T extends { id: string | number }>(primary?: T[] | null, fallback: T[] = []) => {
  const seen = new Set<string | number>()
  const result: T[] = []

  const append = (items?: T[] | null) => {
    if (!items) return
    for (const item of items) {
      const key = typeof item?.id === "string" || typeof item?.id === "number" ? item.id : undefined
      if (key !== undefined) {
        if (seen.has(key)) continue
        seen.add(key)
        result.push(item)
      } else {
        result.push(item)
      }
    }
  }

  append(primary)
  append(fallback)
  return result
}

type DeviceWithStatus = DeviceContent & { isActive?: boolean | null }

const normalizeDevices = (items?: unknown): DeviceContent[] => {
  if (!Array.isArray(items)) return []
  return (items as DeviceWithStatus[])
    .filter((device) => Boolean(device) && (device.isActive ?? true))
    .map((device, index) => ({
      ...device,
      id: device.id ?? `device-${index}`,
    }))
}

export default function DevicesPage() {
  const [cmsSlides, setCmsSlides] = useState<HeroSlide[] | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageOnlyHeroSlidesPayload, setImageOnlyHeroSlidesPayload] = useState<ImageOnlyHeroSlidePayload[]>([])
  const [devices, setDevices] = useState<DeviceContent[]>([])
  const [featuredDevices, setFeaturedDevices] = useState<DeviceContent[]>([])
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let cancelled = false
    const loadSlides = async () => {
      try {
        const payload = await api.getDevicesPage()
        console.log("Devices page payload:", payload)
        if (!cancelled) {
          const sections = Array.isArray(payload?.sections) ? (payload.sections as PageSection[]) : []
          console.log("Loaded sections:", sections.length, "Sections data:", JSON.stringify(sections, null, 2))
          
          // Log devices-feature-slider sections specifically
          const featureSliderSections = sections.filter(s => s.section === "devices-feature-slider")
          console.log("devices-feature-slider sections found:", featureSliderSections.length, featureSliderSections)
          
          setCmsSlides(Array.isArray(payload?.heroSlides) ? (payload.heroSlides as HeroSlide[]) : [])
          setImageOnlyHeroSlidesPayload(
            Array.isArray(payload?.imageOnlyHeroSlides)
              ? (payload.imageOnlyHeroSlides as ImageOnlyHeroSlidePayload[])
              : [],
          )

          const payloadDevices = normalizeDevices(payload?.devices)
          const payloadFeatured = normalizeDevices(payload?.featuredDevices)
          const fallbackFeatured = payloadDevices.slice(0, 6)

          setDevices(payloadDevices)
          setFeaturedDevices(payloadFeatured.length ? payloadFeatured : fallbackFeatured)
        }
      } catch (error) {
        console.error("Failed to fetch devices hero slides:", error)
      }
    }
    loadSlides()
    return () => {
      cancelled = true
    }
  }, [])

  const imageOnlyHeroSlides = useMemo(() => {
    const normalized = imageOnlyHeroSlidesPayload.map((slide, index) => {
      if (!slide?.image) {
        console.warn("Image-only hero slide missing image:", slide?.id)
        return null
      }

      const resolvedImage = getImageUrl(slide.image)
      if (!resolvedImage) {
        console.warn("Failed to resolve image-only hero slide image:", slide.image)
        return null
      }

      return {
        id: slide.id ?? `image-only-${index}`,
        image: resolvedImage,
        title: null,
        description: null,
        ctaText: null,
        ctaLink: null,
        order: typeof slide.order === "number" ? slide.order : Number.MAX_SAFE_INTEGER,
        isActive: true,
        source: "image-only" as const,
        sourceSection: slide.sourceSection ?? null,
      } as HeroSlide & { source: "image-only"; sourceSection: string | null }
    })

    return normalized.filter((slide): slide is HeroSlide & { source: "image-only"; sourceSection: string | null } => Boolean(slide))
  }, [imageOnlyHeroSlidesPayload])

  const heroSlides = useMemo(() => {
    const normalized =
      cmsSlides
        ?.filter((slide): slide is CmsHeroSlideCandidate => Boolean(slide && slide.isActive !== false))
        .sort((a, b) => {
          const orderA = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER
          const orderB = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER
          return orderA - orderB
        })
        .map((slide, index) => ({
          ...slide,
          id: (slide.id ?? `devices-hero-${index}`) as string | number,
          image: slide.image ? getImageUrl(slide.image) ?? undefined : undefined,
          title: "Devices that keep you connected.",
          description: "Explore smartphones, routers, and gadgets — all powered by QCell.",
          ctaText: "See all devices",
          ctaLink: "#devices",
          source: "cms" as const,
        })) ?? []

    const fallbackSlides = fallbackHeroSlides.map((slide) => ({
      ...slide,
      image: slide.image ? getImageUrl(slide.image) ?? slide.image : slide.image,
      source: "fallback" as const,
    }))

    const merged = mergeWithFallback(normalized as CmsHeroSlide[], fallbackSlides as CmsHeroSlide[])
    const combined = [...merged, ...imageOnlyHeroSlides].sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : Number.MAX_SAFE_INTEGER
      const orderB = typeof b.order === "number" ? b.order : Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })

    console.log("Final hero slides:", combined.map(s => ({ 
      id: s.id, 
      source: s.source, 
      hasImage: !!s.image, 
      image: s.image,
      title: s.title 
    })))
    console.log("Image-only slides being added:", imageOnlyHeroSlides.length, imageOnlyHeroSlides)
    return combined
  }, [cmsSlides, imageOnlyHeroSlides])

  useEffect(() => {
    if (heroSlides.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length, isPaused])

  const handleSlideClick = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    // Resume auto-play after 10 seconds
    setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  const activeSlide = heroSlides[currentSlide]
  // Get image - it should already be a full URL from getImageUrl, but ensure it's a string
  let heroImage: string | undefined = undefined
  if (activeSlide?.image && typeof activeSlide.image === "string") {
    const resolved = getImageUrl(activeSlide.image)
    heroImage = resolved || activeSlide.image
  }
  
  // Debug current slide
  if (activeSlide) {
    console.log("Current active slide:", {
      index: currentSlide,
      id: activeSlide.id,
      source: activeSlide.source,
      image: activeSlide.image,
      heroImage: heroImage,
      totalSlides: heroSlides.length,
      isImageOnly: activeSlide.source === "image-only"
    })
  }
  const hasCmsText = Boolean(activeSlide?.title?.trim() || activeSlide?.description?.trim() || activeSlide?.ctaText?.trim())
  const showTextContent = activeSlide?.source === "fallback" ? true : activeSlide?.source === "image-only" ? false : hasCmsText
  const effectiveTitle = showTextContent ? activeSlide?.title : ""
  const effectiveDescription = showTextContent ? activeSlide?.description : ""
  const effectiveCtaText = showTextContent ? activeSlide?.ctaText : undefined
  const effectiveCtaLink = showTextContent ? activeSlide?.ctaLink : undefined

    return (
        <>
            <Navigation page="devices" />
            <motion.header className="relative h-auto min-h-[68vh] md:min-h-[95vh] md:flex md:flex-row-reverse md:justify-center md:items-stretch bg-white pb-12 md:pb-16">
                {/* Image - narrower on desktop so slider fits below without overlap */}
                <motion.div className="relative w-full md:w-[58%] md:min-h-[88vh] md:flex-shrink-0">
          <div className="relative w-full h-[58vh] md:h-full md:min-h-[88vh] flex items-center justify-center overflow-hidden">
            {heroImage ? (
              <div className="relative w-full h-full">
                <Image
                  src={heroImage}
                  alt={activeSlide?.title || activeSlide?.source === "image-only" ? "QCell featured device" : "QCell devices"}
                  fill
                  className="object-cover object-center md:object-right"
                  priority={currentSlide === 0}
                  unoptimized
                  onError={(e) => {
                    console.error("Failed to load hero image:", heroImage, "Slide:", activeSlide?.id, "Source:", activeSlide?.source, e)
                  }}
                  onLoad={() => {
                    console.log("Hero image loaded successfully:", heroImage, "Slide:", activeSlide?.id)
                  }}
                />
              </div>
            ) : (
                        <SliderImages />
            )}
                    </div>
                    <motion.div className="absolute -bottom-20 left-0 right-0 z-20 mx-auto md:hidden">
                        <DevicesSliderSmall devices={featuredDevices.length ? featuredDevices : devices} />
                    </motion.div>
                </motion.div>
                {/* Text + slider area - left side on desktop */}
                <motion.div className="relative px-[45px] mx-auto md:pl-[60px] lg:pl-[80px] md:w-[42%] md:flex md:flex-col md:justify-center md:flex-shrink-0">
          {showTextContent ? (
            <>
              <motion.h1 className="mt-[70px] text-5xl font-bold md:text-6xl md:mt-0">
                {effectiveTitle || "Devices that keep you connected."}
              </motion.h1>
              <motion.p className="my-[30px] text-base sm:text-[20px]">
                {effectiveDescription || "Explore smartphones, routers, and gadgets — all powered by QCell."}
              </motion.p>
            </>
          ) : null}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        whileHover={{
                        scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="w-[150px] z-30"
                    >
                        <Link
              href={effectiveCtaLink || "#devices"}
                        className="flex items-center justify-center rounded-sm bg-[#F98F1F] px-5 py-3 text-base font-medium text-white hover:bg-[#ff9c33] hover:text-white z-20 "
                        >
              {effectiveCtaText || "See all devices"}
                        </Link>
                    </motion.div>
          {heroSlides.length > 1 ? (
            <div className="flex gap-2 mt-8 md:mt-10 md:mr-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideClick(index)}
                  className={`h-2 w-8 rounded-full transition-all cursor-pointer ${
                    index === currentSlide ? "bg-[#F98F1F]" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
                </motion.div>

                {/* Desktop: slider aligned with left content, slight space from image */}
                <motion.div id="devices" className="absolute bottom-0 md:bottom-8 left-0 md:left-[60px] lg:left-[80px] right-0 md:right-auto md:w-[calc(42%-60px)] lg:w-[calc(41%-80px)] md:mr-2 z-20 hidden md:block">
                    <DevicesSliderSmall devices={featuredDevices.length ? featuredDevices : devices} />
                </motion.div>
            </motion.header>

            <motion.div className="md:mt-0">
                <DevicesSlider devices={devices} />
            </motion.div>

            <BenefitsSlider />
            <Footer />
        </>
    )
}