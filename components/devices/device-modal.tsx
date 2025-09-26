"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import type { Offering } from "@/types/offerings"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface DeviceModalProps {
  offering: Offering | null
  isOpen: boolean
  onClose: () => void
}

export default function DeviceModal({ offering, isOpen, onClose }: DeviceModalProps) {
  if (!offering) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full md:w-[80%] h-[90%] overflow-hidden overflow-y-scroll no-scrollbar bg-white text-black -mb-3 rounded-tr-2xl rounded-tl-2xl md:p-14">
        <DialogHeader>
          <div className="my-10 mb-14">
            <p className="tag font-bold">{offering.title}</p>
            <DialogTitle className="text-5xl font-bold mt-3">{offering.details.title}</DialogTitle>
          </div>

          <div className="md:flex md:flex-col-reverse justify-between items-center md:gap-10 md:p-14 md:bg-gray-100 md:rounded-2xl">
            <div className="relative w-full mb-5 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[700px]">
              <Image
                src={offering.image}
                alt={offering.title}
                fill
                className="object-cover object-center transition-transform duration-500 rounded-sm"
              />
            </div>
            <DialogDescription className="text-lg text-black/80 my-10 md:text-3xl">{offering.details.description}</DialogDescription>
          </div>
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
          <Button variant="ghost" onClick={onClose} className="text-black hover:bg-black/50 hover:text-white">
            Close
          </Button>
          <Button className="transition-all bg-white text-[#CD7F32] hover:bg-white/90 hover:scale-105">
            Buy Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

