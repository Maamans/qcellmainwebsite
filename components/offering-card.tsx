"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Offering } from "@/types/offerings"
import { Card, CardContent } from "@/components/ui/card"


interface OfferingCardProps {
  offering: Offering;
}

export default function OfferingCard({ offering }: OfferingCardProps) {
  return (
    <motion.div
      className="relative h-full min-h-[480px] w-full md:min-h-[700px]"
    >
      <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20">
        <CardContent className="relative flex h-full flex-col items-start justify-between p-6">
          {/* Only image, no text content overlay */}
          <Image
            src={offering.details.image ?? offering.image ?? "/images/qmobile.png"}
            alt={offering.details.title ?? offering.title ?? "Qcell offering"}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

