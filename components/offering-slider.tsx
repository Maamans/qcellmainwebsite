"use client"

import { useState, useEffect } from "react"
//import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import type { Offering } from "@/types/offerings"
import { offerings } from "@/types/offerings"
import { Button } from "@/components/ui/button"
import OfferingCard from "./offering-card"
import OfferingModal from "./offering-modal"

type OfferingsSliderProps = {
  offerings?: Offering[]
}

export default function OfferingsSlider({ offerings: offeringsProp }: OfferingsSliderProps = {}) {
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })
  const data = Array.isArray(offeringsProp) ? offeringsProp : offerings

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
    <div className="relative w-full px-0 overflow-hidden py-2 pb-10 bg-white/90 rounded-lg shadow-lg backdrop-blur-sm md:max-w-[110%] md:rounded-lg"> {/* py-16 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 md:max-w-[110%] md:rounded-lg" />

      <div className="relative mx-auto max-w-full -ml-3  sm:px-6 lg:px-8 md:max-w-[110%]"> {/* px-4 */}
        {/*<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Explore Our Offerings</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Discover the perfect solutions for your connectivity needs
          </p>
        </motion.div>*/}

        <div > {/* px-4 */}
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
                {data.map((offering) => (
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

            <div className="mt-8 flex justify-center gap-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-[#CD7F32] w-4" : "bg-gray-300"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
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

