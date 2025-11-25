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
  const isFeatured = plan.id === "4g-lte"
  const badgeText = isFeatured ? "Signature 4G LTE" : "Qcell Internet"

  return (
    <motion.div className="relative h-full min-h-[520px] w-full cursor-pointer md:min-h-[600px]">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/70 to-black/60 shadow-xl">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={plan.image}
            alt={plan.title}
            fill
            className="object-cover object-center opacity-60 transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-[#F98F1F]/30" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {badgeText}
            </span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg"
            >
              {plan.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.1 }}
              className="text-base md:text-lg text-white/85 leading-relaxed"
            >
              {plan.description}
            </motion.p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col gap-1 text-white/80 text-sm">
              <span className="uppercase tracking-[0.25em] text-white/60">Powered by</span>
              <span className="text-lg font-semibold text-white">{isFeatured ? "4G LTE Network" : "Qcell Internet"}</span>
            </div>
            <button
              type="button"
              className="rounded-full bg-white text-[#F98F1F] p-4 shadow-lg ring-2 ring-white/70 transition hover:scale-110 hover:bg-orange-50"
              aria-label={`Learn more about ${plan.title}`}
              onClick={onClick}
            >
              <Plus className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-6 bottom-6 z-0 h-32 rounded-3xl bg-white/5 blur-3xl transition-opacity duration-500 group-hover:opacity-70" />
      </div>
    </motion.div>
  )
}


