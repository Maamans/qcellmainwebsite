"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X } from "lucide-react"
import type { InternetPlan } from "./internet-plan-card"

interface InternetPlanModalProps {
  plan: InternetPlan | null
  isOpen: boolean
  onClose: () => void
}

export default function InternetPlanModal({ plan, isOpen, onClose }: InternetPlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && plan && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-4xl rounded-2xl bg-white overflow-hidden shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-black/5 p-2 text-gray-700 hover:bg-black/10"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative h-56 md:h-full">
                <Image src={plan.image} alt={plan.title} fill className="object-cover" />
              </div>
              <div className="p-7 md:p-9">
                <h3 className="text-3xl font-bold text-gray-900">{plan.title}</h3>
                <p className="mt-3 text-gray-700 text-base md:text-lg leading-relaxed">{plan.description}</p>
                <div className="mt-7">
                  <button className="rounded-full bg-[#F98F1F] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#CD7F32]">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


