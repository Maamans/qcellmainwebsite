"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Plus } from "lucide-react"

export interface InternetPlan {
  id: string
  title: string
  description: string
  image: string
}

interface InternetPlanCardProps {
  plan: InternetPlan
  index: number
  onClick: () => void
}

export default function InternetPlanCard({ plan, index, onClick }: InternetPlanCardProps) {
  return (
    <motion.div className="relative h-full min-h-[520px] w-full cursor-pointer md:min-h-[640px]">
      <div className="group relative h-full overflow-hidden bg-gradient-to-br from-[#CD7F32] to-[#B87333] z-20 rounded-2xl">
        <div className="relative flex h-full flex-col items-start justify-between p-7 md:p-12">
          <div className="w-full z-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              {plan.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              className="mt-3 text-white/85 text-base md:text-lg max-w-[90%]"
            >
              {plan.description}
            </motion.p>
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
          <Image
            src={plan.image}
            alt={plan.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-5 right-5 z-20">
            <button
              type="button"
              className="rounded-full bg-white hover:bg-orange-100 p-4 flex items-center justify-center shadow-lg transition"
              aria-label={`Learn more about ${plan.title}`}
              onClick={onClick}
            >
              <Plus className="h-6 w-6 md:h-7 md:w-7 text-[#F98F1F]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


