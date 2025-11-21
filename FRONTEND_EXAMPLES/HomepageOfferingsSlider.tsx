"use client"

import { useEffect, useMemo, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import type { Offering } from "@/types/offerings"
import { offerings as fallbackOfferings } from "@/types/offerings"
import { Button } from "@/components/ui/button"
import OfferingCard from "@/components/offering-card"
import OfferingModal from "@/components/offering-modal"
import { api, getImageUrl } from "@/lib/api"

type OfferingsSliderProps = {
  /**
   * Optional pre-fetched offerings. When omitted, the component will hit the public offerings endpoint.
   */
  offerings?: Offering[]
}

type RemoteAction = {
  text?: string
  action?: string
}

type RemoteOffering = {
  id?: string | number
  title?: string
  description?: string
  image?: string
  features?: string[]
  cta?: RemoteAction
  ctas?: RemoteAction[]
  quickActions?: RemoteAction[]
  ctaText?: string
  ctaLink?: string
  updatedAt?: string
  createdAt?: string
  details?: {
    title?: string
    description?: string
    benefits?: string[]
    quickActions?: RemoteAction[]
    ctas?: RemoteAction[]
    image?: string
  }
}

const OFFERING_LIMIT = 6

const limitOfferings = (items: Offering[]) => items.filter(Boolean).slice(0, OFFERING_LIMIT)

const sortRemoteOfferings = (items: RemoteOffering[]) => {
  const getTimestamp = (item: RemoteOffering) => {
    const source = item.updatedAt ?? item.createdAt
    if (!source) return 0
    const value = new Date(source).getTime()
    return Number.isNaN(value) ? 0 : value
  }
  return [...items].sort((a, b) => getTimestamp(b) - getTimestamp(a))
}

const sanitizeActions = (actions?: RemoteAction[]): Offering["quickActions"] => {
  if (!Array.isArray(actions)) return undefined
  return actions
    .filter((action): action is { text: string; action: string } => typeof action?.text === "string" && typeof action?.action === "string")
    .map((action) => ({
      text: action.text,
      action: action.action,
    }))
}

const normalizeOffering = (item: RemoteOffering, fallback: Offering, index: number): Offering => {
  const normalizedDetailsImage = getImageUrl(
    item.details?.image ?? item.image ?? fallback.details.image ?? fallback.image ?? "",
  )

  const normalizedDetails: Offering["details"] = {
    title: item.details?.title ?? fallback.details.title ?? item.title ?? "Qcell Offering",
    description: item.details?.description ?? fallback.details.description ?? item.description ?? "",
    benefits:
      Array.isArray(item.details?.benefits) && item.details.benefits.length > 0
        ? item.details.benefits
        : fallback.details.benefits,
    quickActions: sanitizeActions(
      Array.isArray(item.details?.quickActions) && item.details.quickActions.length > 0
        ? item.details.quickActions
        : fallback.details.quickActions,
    ),
    ctas: sanitizeActions(
      Array.isArray(item.details?.ctas) && item.details.ctas.length > 0 ? item.details.ctas : fallback.details.ctas,
    ),
    image: normalizedDetailsImage,
  }

  const resolvedCtas = sanitizeActions(
    Array.isArray(item.ctas) && item.ctas.length > 0 ? item.ctas : normalizedDetails.ctas,
  )
  const resolvedQuickActions = sanitizeActions(
    Array.isArray(item.quickActions) && item.quickActions.length > 0 ? item.quickActions : normalizedDetails.quickActions,
  )

  const primaryCta =
    item.cta ??
    resolvedCtas?.[0] ?? {
      text: item.ctaText ?? fallback.cta?.text ?? fallback.details.ctas?.[0]?.text ?? "Learn more",
      action: item.ctaLink ?? fallback.cta?.action ?? fallback.details.ctas?.[0]?.action ?? "#",
    }

  return {
    id: item.id?.toString() ?? fallback.id ?? `offering-${index}`,
    title: item.title ?? fallback.title,
    description: item.description ?? fallback.description,
    image: normalizedDetailsImage,
    features: Array.isArray(item.features) && item.features.length > 0 ? item.features : fallback.features,
    cta: {
      text: primaryCta?.text ?? fallback.cta?.text ?? "Learn more",
      action: primaryCta?.action ?? fallback.cta?.action ?? "#",
    },
    ctas: resolvedCtas?.map((cta) => ({
      text: cta?.text ?? fallback.cta?.text ?? "Learn more",
      action: cta?.action ?? fallback.cta?.action ?? "#",
    })),
    quickActions: resolvedQuickActions?.map((action) => ({
      text: action?.text ?? "",
      action: action?.action ?? "",
    })),
    details: normalizedDetails,
  }
}

const mergeOfferings = (remote: Offering[], fallback: Offering[]) => {
  const combined = [...remote, ...fallback]
  const seen = new Set<string>()

  return combined.filter((offering) => {
    const id = offering.id ?? ""
    if (!id || seen.has(id)) {
      return false
    }
    seen.add(id)
    return true
  })
}

/**
 * Example slider that always mirrors backend's "six newest offerings" contract.
 * Drop-in ready for the homepage and safe to hydrate with server-fetched props.
 */
export default function HomepageOfferingsSlider({ offerings: offeringsProp }: OfferingsSliderProps = {}) {
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [offeringsData, setOfferingsData] = useState<Offering[]>(
    Array.isArray(offeringsProp) && offeringsProp.length > 0 ? limitOfferings(offeringsProp) : limitOfferings(fallbackOfferings),
  )
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  useEffect(() => {
    if (Array.isArray(offeringsProp) && offeringsProp.length > 0) {
      setOfferingsData(limitOfferings(offeringsProp))
    }
  }, [offeringsProp])

  useEffect(() => {
    if (offeringsProp) return

    let isMounted = true
    const loadOfferings = async () => {
      try {
        const response = await api.getOfferings()
        const remoteOfferings: RemoteOffering[] = Array.isArray(response?.offerings) ? response.offerings : response

        if (!Array.isArray(remoteOfferings) || remoteOfferings.length === 0) {
          throw new Error("No offerings returned from API")
        }

        const sortedRemote = sortRemoteOfferings(remoteOfferings)
        const normalized: Offering[] = sortedRemote.map((item, index) =>
          normalizeOffering(item, fallbackOfferings[index % fallbackOfferings.length], index),
        )

        if (isMounted) {
          setOfferingsData(limitOfferings(mergeOfferings(normalized, fallbackOfferings)))
        }
      } catch (error) {
        console.error("Failed to load offerings:", error)
        if (isMounted) {
          setOfferingsData(limitOfferings(fallbackOfferings))
        }
      }
    }

    loadOfferings()

    return () => {
      isMounted = false
    }
  }, [offeringsProp])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
      emblaApi.reInit()
    }
  }, [emblaApi, offeringsData.length])

  useEffect(() => {
    if (!offeringsData.length) {
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= offeringsData.length) {
      setCurrentIndex(offeringsData.length - 1)
    }
  }, [offeringsData.length, currentIndex])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()
  const slides = useMemo(() => offeringsData.filter(Boolean), [offeringsData])

  return (
    <div className="relative w-full px-0 overflow-hidden py-8 md:py-12">
      <div className="relative mx-auto max-w-full -ml-3 sm:px-6 lg:px-8 md:max-w-[110%]">
        <div className="mb-6 px-4 sm:px-0">
          <p className="text-2xl font-medium text-black uppercase tracking-wider">List of Our Offerings</p>
        </div>
        <div>
          <div className="relative">
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

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y w-full rounded-lg">
                {slides.map((offering) => (
                  <div
                    key={offering.id}
                    className="relative min-w-0 flex-[0_0_70%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_30.333%]"
                  >
                    <OfferingCard
                      offering={offering}
                      onClick={() => setSelectedOffering(offering)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {slides.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      currentIndex === index ? "bg-[#CD7F32] w-4" : "bg-gray-300"
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to offering ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <OfferingModal
        offering={selectedOffering}
        isOpen={!!selectedOffering}
        onClose={() => setSelectedOffering(null)}
      />
    </div>
  )
}


