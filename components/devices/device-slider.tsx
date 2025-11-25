"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import DeviceCard from "./device-card"
import DeviceModal from "./device-modal"
import type { DeviceContent } from "@/types/devices"

const fallbackDevices: DeviceContent[] = [
  {
    id: "qsmart",
    title: "QSmart",
    description: "Affordable smartphones packed with smart features",
    image: "/images/device1.jpg",
    features: ["Android OS", "Dual SIM", "Long battery life"],
    ctaText: "Explore QSmart",
    ctaAction: "/devices/qsmart",
    price: "Le 1,799",
    benefits: [
      "Affordable pricing",
      "User-friendly interface",
      "Built-in QCell apps",
      "Reliable performance",
      "Perfect for daily use",
    ],
  },
  {
    id: "qsmart-plus",
    title: "QSmart Plus",
    description: "Performance-enhanced smartphones for power users",
    image: "/images/device2.jpg",
    features: ["HD Display", "Fingerprint unlock", "Large storage"],
    ctaText: "Discover QSmart Plus",
    ctaAction: "/devices/qsmart-plus",
    price: "Le 2,499",
    benefits: [
      "High-resolution display",
      "Smooth app experience",
      "Great for social media and work",
      "Durable build",
      "Access to latest Android features",
    ],
  },
  {
    id: "qmobile",
    title: "QMobile",
    description: "Simple and durable feature phones for everyone",
    image: "/images/device3.jpg",
    features: ["Long battery life", "FM Radio", "Dual SIM"],
    ctaText: "View QMobile",
    ctaAction: "/devices/qmobile",
    price: "Le 799",
    benefits: [
      "Affordable and reliable",
      "Compact design",
      "Long standby battery",
      "Easy to use",
      "Torchlight and FM radio",
    ],
  },
  {
    id: "mifi",
    title: "MiFi Device",
    description: "Portable internet device for fast connectivity on the go",
    image: "/images/device4.jpg",
    features: ["4G LTE", "Connect up to 10 devices", "Rechargeable battery"],
    ctaText: "Get MiFi",
    ctaAction: "/devices/mifi",
    price: "Le 1,199",
    benefits: [
      "Portable and lightweight",
      "Long battery backup",
      "Supports multiple users",
      "Secure internet access",
      "Plug-and-play setup",
    ],
  },
  {
    id: "tariff",
    title: "Tariff",
    description: "Explore our flexible tariff plans for every need.",
    image: "/images/device5.jpg",
    features: ["Voice & Data", "Affordable rates", "Easy activation"],
    ctaText: "View Tariffs",
    ctaAction: "/tariffs",
    price: "From Le 50/mo",
    benefits: [
      "Flexible options",
      "Best value",
      "Simple activation",
      "Great for individuals and families",
      "24/7 support",
    ],
  },
]

interface DevicesSliderProps {
  devices?: DeviceContent[]
  eyebrow?: string
  heading?: string
  subheading?: string
}

export default function DevicesSlider({
  devices,
  eyebrow = "Take a Look at What's",
  heading = "New from QCell Devices",
  subheading = "Tap on a card to explore full specs, pricing, and purchase options.",
}: DevicesSliderProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceContent | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })
  const slides = useMemo(() => {
    const provided = Array.isArray(devices) ? devices : []
    if (!provided.length) return fallbackDevices

    const unique = new Map<string | number, DeviceContent>()
    const addDevices = (items: DeviceContent[]) => {
      items.forEach((item, index) => {
        const key = item.id ?? `device-${index}`
        if (!unique.has(key)) {
          unique.set(key, { ...item, id: key })
        }
      })
    }

    addDevices(provided)
    addDevices(fallbackDevices)

    return Array.from(unique.values())
  }, [devices])

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
    <div className="relative w-full px-0 overflow-hidden py-2 pb-10 bg-white rounded-lg shadow-lg backdrop-blur-sm md:max-w-[110%] md:rounded-lg"> {/* py-16 */}
      
      <div className="relative sm:ml-24 mt-4 md:mt-20"> {/* px-4 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ml-4 space-y-2">
          <p className="mt-3 ml-4 sm:ml-0 text-sm uppercase tracking-wide text-orange-400">{eyebrow}</p>
          <h2 className="ml-4 sm:ml-0 max-w-2xl text-3xl font-semibold text-gray-900 md:text-4xl">
            {heading}
          </h2>
          <p className="ml-4 sm:ml-0 text-base text-gray-500">{subheading}</p>
        </motion.div>

        <div > {/* px-4 */}
          <div className="relative">
            <div className="hidden sm:block absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-2/4">
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

            <div className="hidden sm:block absolute right-0 top-1/2 z-10 -translate-y-1/2 ">
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
              <div className="flex touch-pan-y w-full rounded-lg sm:ml-[150px] md:-ml-14">
                {slides.map((device, index) => (
                  <div
                    key={device.id}
                    className="relative min-w-0 flex-[0_0_50%] sm:flex-[0_0_35%] md:flex-[0_0_30%] lg:flex-[0_0_22%] pl-2 pr-2 sm:pl-3 sm:pr-3"
                  >
                    <DeviceCard
                      device={device}
                      isActive={currentIndex === index}
                      onClick={() => setSelectedDevice(device)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {slides.map((_, index) => (
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

      <DeviceModal device={selectedDevice} isOpen={!!selectedDevice} onClose={() => setSelectedDevice(null)} />
    </div>
  )
}

