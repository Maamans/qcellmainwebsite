"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export interface DevicesInterface {
  id: string
  title: string
  image: string
}

//import { offerings } from "@/types/offerings"
import { Button } from "@/components/ui/button"


const devices: DevicesInterface[] = [
  {
    id: "qsmart",
    title: "QSmart",
    image: "/images/QSMART_.jpg",
  },
  {
    id: "qsmart-plus",
    title: "QSmart Plus",
    image: "/images/QSMART PLUS.jpg",
  },
  {
    id: "mifi",
    title: "MiFi Device",
    image: "/images/mifi.jpg",
  },
  {
    id: "qmobile",
    title: "QMobile",
    image: "/images/Qmobile_.jpg",
  },
  {
    id: "tariff",
    title: "Tariff",
    image: "/images/tiktok bundle.jpg",
  },
  
]

export default function DevicesSliderSmall() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative w-full px-0 overflow-hidden py-2 pb-10 bg-transparent rounded-lg md:max-w-[110%] md:rounded-lg"> {/* py-16 */}
      
      <div className="relative mt-24"> {/* px-4 */}

        <div className="rounded-lg"> {/* px-4 */}
          <div className="relative w-[80%] md:w-[50%] mx-auto rounded-lg">
            <div className="block absolute left-0 top-1/2 z-10 -translate-x-4 lg:-translate-x-14 -translate-y-2/4">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 md:h-10 md:w-10 rounded-full border border-gray-200 bg-orange-400/80 shadow-lg backdrop-blur-sm text-white hover:text-black"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous slide</span>
              </Button>
            </div>

            <div className="block absolute right-0 top-1/2 z-10 translate-x-4 lg:translate-x-14 -translate-y-2/4 ">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 md:h-10 md:w-10 rounded-full border border-gray-200 bg-orange-400/80 shadow-lg backdrop-blur-sm text-white hover:text-black"
                onClick={scrollNext}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex touch-pan-y w-full rounded-lg">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="relative min-w-0 flex-[0_0_36%] sm:flex-[0_0_36%] md:flex-[0_0_24%] lg:flex-[0_0_26%] pl-2 pr-2 sm:pl-3 sm:pr-3 md:pl-4 md:pr-4"
                  >
                    <motion.div
                      className="relative h-full w-full cursor-pointer"
                      style={{ minHeight: '150px' }}
                    >
                      
                      <Card className="group relative h-full w-full overflow-hidden z-20 bg-transparent border-0 bg-gradient-to-r from-red-500/40 to-[#ff8400]/50 mix-blend-overlay" style={{ aspectRatio: '3/4' }}> {/* bg-gradient-to-br from-[#CD7F32] to-[#B87333] */}
                        
                        <CardContent className="relative flex h-full w-full flex-col items-start justify-between p-3 sm:p-4 md:p-6 lg:p-8 border-0">
                          

                          <div className="absolute inset-0 z-10" /> {/* bg-gradient-to-t from-black/60 to-transparent */}
                          <Image
                            src={device.image}
                            alt={device.title}
                            fill
                            className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                            sizes="(max-width: 640px) 36vw, (max-width: 1024px) 24vw, 26vw"
                            onError={() => {
                              console.error('Failed to load image:', device.image);
                            }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/*<div className="mt-8 flex justify-center gap-2">
              {offerings.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-[#CD7F32] w-4" : "bg-gray-300"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

