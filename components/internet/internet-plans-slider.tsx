"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import InternetPlanCard, { type InternetPlan } from "./internet-plan-card"
import InternetPlanModal from "./internet-plan-modal"

const internetPlans: InternetPlan[] = [
  {
    id: "4g-lte",
    title: "4G LTE",
    description:
      "Experience blazing fast mobile internet with Qcell’s 4G LTE network. Perfect for streaming, browsing, and staying connected on the go.",
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
  const [selectedPlan, setSelectedPlan] = useState<InternetPlan | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap())
      })
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative w-full overflow-hidden py-2 pb-4 bg-white rounded-none shadow-none">
      <div className="relative mt-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="px-4 md:px-8">
          <h2 className="mt-2 w-full text-3xl md:text-4xl font-bold text-gray-700 my-2">
            Our Internet <span className="text-orange-400">Plans</span>
          </h2>
          <p className="text-gray-500 md:text-lg">Choose the speed and flexibility that fit your life.</p>
        </motion.div>

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
      </div>

      <InternetPlanModal plan={selectedPlan} isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  )
}


