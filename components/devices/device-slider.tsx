"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import DeviceCard from "./device-card"
import DeviceModal from "./device-modal"

export interface Offering {
  id: string
  title: string
  description: string
  image: string
  features: string[]
  cta: {
    text: string
    action: string
  }
  details: {
    title: string
    description: string
    benefits: string[]
  }
}
//
export const offerings: Offering[] = [
    {
      id: "qsmart",
      title: "QSmart",
      description: "Affordable smartphones packed with smart features",
      image: "/images/QSMART_.jpg",
      features: ["Android OS", "Dual SIM", "Long battery life"],
      cta: {
        text: "Explore QSmart",
        action: "/devices/qsmart",
      },
      details: {
        title: "Smartphone for Every Sierra Leonean",
        description:
          "QSmart devices are perfect entry-level smartphones that provide all the essential features without the high cost. Designed to keep you connected, productive, and entertained.",
        benefits: [
          "Affordable pricing",
          "User-friendly interface",
          "Built-in QCell apps",
          "Reliable performance",
          "Perfect for daily use",
        ],
      },
    },
    {
      id: "qsmart-plus",
      title: "QSmart Plus",
      description: "Performance-enhanced smartphones for power users",
      image: "/images/QSMART PLUS.jpg",
      features: ["HD Display", "Fingerprint unlock", "Large storage"],
      cta: {
        text: "Discover QSmart Plus",
        action: "/devices/qsmart-plus",
      },
      details: {
        title: "Smarter, Faster, Sleeker",
        description:
          "QSmart Plus is a powerful upgrade with enhanced performance, sleek design, and added security features. Ideal for streaming, multitasking, and photography.",
        benefits: [
          "High-resolution display",
          "Smooth app experience",
          "Great for social media and work",
          "Durable build",
          "Access to latest Android features",
        ],
      },
    },
    {
      id: "qmobile",
      title: "QMobile",
      description: "Simple and durable feature phones for everyone",
      image: "/images/Qmobile_.jpg",
      features: ["Long battery life", "FM Radio", "Dual SIM"],
      cta: {
        text: "View QMobile",
        action: "/devices/qmobile",
      },
      details: {
        title: "Stay Connected, Simply",
        description:
          "QMobile is your go-to device for calls, SMS, and basic mobile needs. With a focus on battery life and reliability, it’s a perfect choice for daily communication.",
        benefits: [
          "Affordable and reliable",
          "Compact design",
          "Long standby battery",
          "Easy to use",
          "Torchlight and FM radio",
        ],
      },
    },
    {
      id: "mifi",
      title: "MiFi Device",
      description: "Portable internet device for fast connectivity on the go",
      image: "/images/mifi.jpg",
      features: ["4G LTE", "Connect up to 10 devices", "Rechargeable battery"],
      cta: {
        text: "Get MiFi",
        action: "/devices/mifi",
      },
      details: {
        title: "Internet Wherever You Go",
        description:
          "QCell MiFi is a compact wireless router that enables multiple users and devices to share internet. Ideal for travel, work, and students.",
        benefits: [
          "Portable and lightweight",
          "Long battery backup",
          "Supports multiple users",
          "Secure internet access",
          "Plug-and-play setup",
        ],
      },
    },
    {
      id: "tariff",
      title: "Tariff",
      description: "Explore our flexible tariff plans for every need.",
      image: "/images/tiktok bundle.jpg",
      features: ["Voice & Data", "Affordable rates", "Easy activation"],
      cta: {
        text: "View Tariffs",
        action: "/tariffs",
      },
      details: {
        title: "Tariff Plans for Everyone",
        description:
          "Choose from a variety of voice and data plans designed to fit your lifestyle and budget. Activate instantly and stay connected.",
        benefits: [
          "Flexible options",
          "Best value",
          "Simple activation",
          "Great for individuals and families",
          "24/7 support",
        ],
      },
    }
]

export default function DevicesSlider() {
  const [selectedOffering, setSelectedOffering] = useState<Offering | null>(null)
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
    <div className="relative w-full px-0 overflow-hidden py-2 pb-10 bg-white rounded-lg shadow-lg backdrop-blur-sm md:max-w-[110%] md:rounded-lg"> {/* py-16 */}
      
      <div className="relative sm:ml-24 mt-4 md:mt-20"> {/* px-4 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="ml-4">
          <h2 className="mt-3 ml-4 sm:ml-0 max-w-2xl text-2xl text-gray-500 my-5 sm:mt-4 md:text-2xl">
            Take a Look at What&apos;s <span className="text-orange-400">New</span>
          </h2>
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
                {offerings.map((offering, index) => (
                  <div
                    key={offering.id}
                    className="relative min-w-0 flex-[0_0_50%] sm:flex-[0_0_35%] md:flex-[0_0_30%] lg:flex-[0_0_22%] pl-2 pr-2 sm:pl-3 sm:pr-3"
                  >
                    <DeviceCard
                      offering={offering}
                      isActive={currentIndex === index}
                      onClick={() => setSelectedOffering(offering)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {offerings.map((_, index) => (
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

      <DeviceModal
        offering={selectedOffering}
        isOpen={!!selectedOffering}
        onClose={() => setSelectedOffering(null)}
      />
    </div>
  )
}

