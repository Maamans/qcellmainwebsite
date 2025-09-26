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
    id: "qpower",
    title: "QPower",
    image: "/images/device1.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/device2.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/device3.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/qmobile.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/router.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/qsmart-plus.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/mifi.png",
  },
  {
    id: "qpower",
    title: "QPower",
    image: "/images/qsmart.png",
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
              <div className="flex touch-pan-y w-full rounded-lg h-[200px] md:h-[200px]">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="relative min-w-0 flex-[0_0_50%] pl-4 pr-4 sm:flex-[0_0_50%] md:flex-[0_0_35%] lg:flex-[0_0_40%] space-x-4"
                  >
                    <motion.div
                      className="relative h-full min-h-[50px] w-full cursor-pointer md:min-h-[50px]" // md:min-h-[600px]
                    >
                      
                      <Card className="group relative h-full overflow-hidden z-20 bg-transparent border-0 bg-gradient-to-r from-red-500/40 to-[#ff8400]/50 mix-blend-overlay"> {/* bg-gradient-to-br from-[#CD7F32] to-[#B87333] */}
                        
                        <CardContent className="relative flex h-full flex-col items-start justify-between p-6 md:p-14 border-0">
                          

                          <div className="absolute inset-0 z-10" /> {/* bg-gradient-to-t from-black/60 to-transparent */}
                          <Image
                            src={device.image}
                            alt={device.title}
                            fill
                            className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
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

