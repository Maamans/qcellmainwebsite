"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import type { Offering } from "@/types/offerings"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface OfferingModalProps {
  offering: Offering | null
  isOpen: boolean
  onClose: () => void
}

export default function OfferingModal({ offering, isOpen, onClose }: OfferingModalProps) {
  if (!offering) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-hidden bg-gradient-to-br from-[#5a3919] to-[#c46004] text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{offering.details.title}</DialogTitle>
          <DialogDescription className="text-lg text-white/80">{offering.details.description}</DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h4 className="text-xl font-semibold">Benefits</h4>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {offering.details.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="rounded-full bg-white/20 p-1">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 hover:text-white">
            Close
          </Button>
          <Button className="transition-all bg-white text-[#CD7F32] hover:bg-white/90 hover:scale-105">Get Started</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

