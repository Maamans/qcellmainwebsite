"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import InternetPlanCard, { type InternetPlan } from "./internet-plan-card"
import InternetPlanModal from "./internet-plan-modal"
import { api, getImageUrl } from "@/lib/api"

interface InternetPlanResponse {
  id: number
  title: string
  description: string
  image: string
  price?: string | number
  speed?: string
  dataLimit?: string
  features?: string | string[]
  type?: string
  order?: number
  isActive: boolean
  createdAt?: string
}

// Fallback plans if backend is unavailable
const fallbackPlans: InternetPlan[] = [
  {
    id: "4g-lte",
    title: "4G LTE",
    description:
      "Experience blazing fast mobile internet with QCell's 4G LTE network. Perfect for streaming, browsing, and staying connected on the go.",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "qfiber",
    title: "QFIBER",
    description:
      "QFIBER brings ultra-high speed fiber internet to your home or business. Enjoy seamless connectivity for all your devices.",
    image:
      "https://images.unsplash.com/photo-1580584128409-44a1b8d59f86?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "qfiber-lite",
    title: "QFiber",
    description:
      "QFiber offers reliable and affordable fiber internet solutions tailored for your needs.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "data-bundles",
    title: "Data Bundles",
    description:
      "Choose from a variety of data bundles to suit your usage. Flexible, affordable, and easy to activate.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: "unlimited",
    title: "Unlimited Data Plans",
    description:
      "Never worry about running out of data. Our unlimited plans keep you connected all month long.",
    image:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1470&auto=format&fit=crop",
  },
]

export default function InternetPlansSlider() {
  const [internetPlans, setInternetPlans] = useState<InternetPlan[]>(fallbackPlans)
  const [selectedPlan, setSelectedPlan] = useState<InternetPlan | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  // Fetch internet plans from backend API
  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true)
        const plans = (await api.getInternetPlans()) as InternetPlanResponse[]

        const activePlans = Array.isArray(plans)
          ? plans
              .filter((plan) => plan.isActive)
              .sort((a, b) => {
                // Sort by order if available, otherwise by createdAt (newest first), otherwise by ID
                if (a.order !== undefined && b.order !== undefined) {
                  return a.order - b.order
                }
                if (a.createdAt && b.createdAt) {
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
                return (b.id ?? 0) - (a.id ?? 0)
              })
          : []

        // Build plans from backend data
        const backendPlans: InternetPlan[] = activePlans
          .map((plan) => {
            const imageUrl = getImageUrl(plan.image)
            const features = Array.isArray(plan.features)
              ? plan.features
              : typeof plan.features === 'string'
              ? plan.features.split(',').map((f) => f.trim())
              : []

            return {
              id: plan.id,
              title: (plan.title || "").trim() || "Internet Plan",
              description: (plan.description || "").trim() || "Stay connected with QCell",
              image: imageUrl || "",
              price: plan.price,
              speed: plan.speed,
              dataLimit: plan.dataLimit,
              features: features.length > 0 ? features : undefined,
              type: plan.type,
            }
          })
          .filter((plan) => plan.image && plan.image.trim() !== "") // Filter out plans with no image

        // Combine backend plans with fallback plans
        // Backend plans first, then hardcoded fallback plans
        const combinedPlans = [...backendPlans, ...fallbackPlans]
        setInternetPlans(combinedPlans)
      } catch (error) {
        console.warn("Failed to fetch internet plans from backend, using fallback:", error)
        setInternetPlans(fallbackPlans)
      } finally {
        setLoading(false)
      }
    }

    loadPlans()
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  if (loading && internetPlans.length === 0) {
    return (
      <div className="relative w-full overflow-hidden py-2 pb-4 bg-white rounded-none shadow-none">
        <div className="relative mt-2 px-4 md:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C00] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading plans...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden py-2 pb-4 bg-white rounded-none shadow-none">
      <div className="relative mt-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 md:px-8">
          <h2 className="mt-2 w-full text-3xl md:text-4xl font-bold text-gray-700 my-2">
            Our Internet <span className="text-orange-400">Plans</span>
          </h2>
          <p className="text-gray-500 md:text-lg">Choose the speed and flexibility that fit your life.</p>
        </motion.div>

        {internetPlans.length === 0 ? (
          <div className="px-4 md:px-8 py-12 text-center">
            <p className="text-gray-500">No plans available at the moment.</p>
          </div>
        ) : (
          <div>
            <div className="relative">
              <div className="hidden sm:block absolute left-2 top-1/2 z-10 -translate-y-2/4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous slide</span>
                </Button>
              </div>

              <div className="hidden sm:block absolute right-2 top-1/2 z-10 -translate-y-1/2 ">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next slide</span>
                </Button>
              </div>

              <div className="overflow-hidden px-0" ref={emblaRef}>
                <div className="flex touch-pan-y w-full">
                  {internetPlans.map((plan, index) => (
                    <div
                      key={plan.id}
                      className="relative min-w-0 flex-[0_0_80%] pl-2 pr-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_30.333%]"
                    >
                      <InternetPlanCard plan={plan} index={index} onClick={() => setSelectedPlan(plan)} />
                    </div>
                  ))}
                </div>
              </div> 

              <div className="mt-8 flex justify-center gap-2">
                {internetPlans.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      currentIndex === index ? "bg-[#CD7F32] w-5" : "bg-gray-300"
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <InternetPlanModal plan={selectedPlan} isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  )
}


