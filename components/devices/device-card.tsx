"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Plus } from "lucide-react"

import type { Offering } from "@/types/offerings"
import { getImageUrl } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"

interface DeviceCardProps {
  offering: Offering
  isActive: boolean
  onClick: () => void
}

export default function DeviceCard({ offering, isActive, onClick }: DeviceCardProps) {
  const imageSrc = getImageUrl(offering.image ?? offering.details?.image ?? "/images/qmobile.png")
  const title = offering.title ?? offering.details?.title ?? "Qcell device"

  return (
    <motion.div
      className="relative h-full w-full cursor-pointer"
      style={{ minHeight: '300px' }}
      animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.85 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative h-full w-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20" style={{ aspectRatio: '3/4' }}>
        <CardContent className="relative flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8 lg:p-14">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent" />
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 22vw"
            onError={() => {
              console.error("Failed to load image:", imageSrc)
            }}
          />
          <div className="absolute bottom-4 right-4 z-20">
            <button
              type="button"
              className="rounded-full bg-white hover:bg-orange-100 p-3 flex items-center justify-center shadow-lg transition"
              aria-label={`Learn more about ${offering.title}`}
              onClick={onClick}
            >
              <Plus className="h-6 w-6 text-[#F98F1F]" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

