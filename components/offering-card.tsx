"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Plus } from "lucide-react"
import type { Offering } from "@/types/offerings"
import { Card, CardContent } from "@/components/ui/card"


interface OfferingCardProps {
  offering: Offering;
  onClick: () => void;
}

export default function OfferingCard({ offering, onClick }: OfferingCardProps) {
  return (
    <motion.div
      className="relative h-full min-h-[400px] w-full cursor-pointer md:min-h-[600px]"
      onClick={onClick}
    >
      <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20">
        <div className="absolute inset-0 bg-black/20" />
        <CardContent className="relative flex h-full flex-col items-start justify-between p-6">
          {/* Only image and card UI, no title or description */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <Image
            src={offering.image}
            alt={offering.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 z-20">
            <button
              type="button"
              className="rounded-full bg-black/40 hover:bg-[#F98F1F]/80 p-3 text-white flex items-center justify-center shadow-lg transition"
              aria-label="Learn more about this offer"
            >
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

