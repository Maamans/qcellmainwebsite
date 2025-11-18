
"use client";

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

import type { Offering } from "@/types/offerings"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface OfferingModalProps {
  offering: Offering | null
  isOpen: boolean
  onClose: () => void
}

const getLinkProps = (action?: string) => {
  if (!action) {
    return { href: "#" }
  }
  const isExternal = action.startsWith("http")
  return {
    href: action,
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noreferrer" : undefined,
  }
}

export default function OfferingModal({ offering, isOpen, onClose }: OfferingModalProps) {
  if (!offering) return null

  const quickActions = offering.details.quickActions ?? offering.quickActions ?? []
  const ctas = offering.details.ctas ?? offering.ctas ?? (offering.cta ? [offering.cta] : [])
  const heroImage = offering.details.image ?? offering.image ?? "/images/qmobile.png"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full md:w-[80%] h-[90%] overflow-hidden overflow-y-scroll no-scrollbar bg-white text-black -mb-3 rounded-tr-2xl rounded-tl-2xl md:p-14 shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="relative w-full md:w-1/2 h-[260px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#F98F1F]/30">
              <Image
                src={heroImage}
                alt={offering.details.title ?? offering.title ?? "Qcell Offering"}
                fill
                unoptimized
                className="object-cover object-center"
                style={{ borderRadius: "1rem", boxShadow: "0 8px 32px 0 #F98F1F22" }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start px-2 md:px-8">
              <DialogTitle className="text-4xl md:text-5xl font-extrabold text-[#F98F1F] mb-2 drop-shadow-lg">
                {offering.details.title}
              </DialogTitle>
              <p className="text-lg md:text-2xl text-gray-700 mb-4 font-medium leading-relaxed">
                {offering.details.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {offering.features?.map((feature) => (
                  <span
                    key={feature}
                    className="bg-[#F98F1F]/10 text-[#F98F1F] px-3 py-1 rounded-full text-xs font-semibold shadow"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              {quickActions?.length ? (
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <span
                      key={`${action.text ?? "action"}-${index}`}
                      className="text-sm font-semibold text-[#F98F1F] border border-[#F98F1F]/40 rounded-full px-3 py-1 bg-[#F98F1F]/5"
                    >
                      {action.text}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h4 className="text-3xl font-extrabold text-[#F98F1F] mb-6 drop-shadow">Why Choose This Offer?</h4>
          <div className="grid gap-6 sm:grid-cols-2">
            {offering.details.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 bg-gradient-to-r from-[#F98F1F]/20 to-[#FFB347]/20 rounded-2xl px-6 py-4 shadow-lg border border-[#F98F1F]/10"
              >
                <div className="rounded-full bg-[#F98F1F] p-3 flex items-center justify-center shadow-md">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-bold text-[#222]">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-end gap-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#F98F1F] border border-[#F98F1F] hover:bg-[#F98F1F] hover:text-white font-bold px-6 py-2 rounded-full transition"
          >
            Close
          </Button>
          {ctas?.map((cta, index) => (
            <Button
              key={`${cta.text ?? "cta"}-${index}`}
              asChild
              className="transition-all bg-[#F98F1F] text-white font-bold px-6 py-2 rounded-full hover:bg-[#F98F1F]/90 hover:scale-105 shadow-lg"
            >
              <Link {...getLinkProps(cta.action)}>{cta.text ?? "Learn more"}</Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

