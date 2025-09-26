"use client"

import { motion } from "framer-motion"
import Image from "next/image"

import type { Offering } from "@/types/offerings"
import { Card, CardContent } from "@/components/ui/card"

interface DeviceCardProps {
  offering: Offering
  index: number
  isActive: boolean
  onClick: () => void
}

export default function DeviceCard({ offering, index, onClick }: DeviceCardProps) {
  return (
    
    <motion.div
      
      
      className="relative h-full min-h-[400px] w-full cursor-pointer md:min-h-[500px]" // md:min-h-[600px]
      onClick={onClick}
    >
      
      <Card className="group relative h-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20">
        
        <CardContent className="relative flex h-full flex-col items-start justify-between p-6 md:p-14">
          <div className="w-full z-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-2xl font-bold text-white"
            >
              {offering.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="mt-2 text-white/80"
            >
              {offering.description}
            </motion.p>
          </div>

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <Image
            src={offering.image}
            alt={offering.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

