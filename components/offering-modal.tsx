
"use client";
// Short codes for display (matching footer)
const shortCodes = [
  { code: '*303#', purpose: 'Check Balance' },
  { code: '*124#', purpose: 'Check Data Balance' },
  { code: '*122#', purpose: 'Buy Data Bundle' },
  { code: '*133#', purpose: 'Borrow Credit' },
  { code: '*100#', purpose: 'Customer Care' },
  { code: '*101#', purpose: 'Know Your Number' },
  { code: '*144*PIN#', purpose: 'Recharge Card' },
  { code: '*126#', purpose: 'Buy Voice Bundle' },
  { code: '*151#', purpose: 'Qcell Mobile Money' },
  { code: '*123#', purpose: 'Check Promotions' },
  { code: '*555#', purpose: 'Qcell Services Menu' },
];

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import type { Offering } from "@/types/offerings"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface OfferingModalProps {
  offering: Offering | null
  isOpen: boolean
  onClose: () => void
}

export default function OfferingModal({ offering, isOpen, onClose }: OfferingModalProps) {
  if (!offering) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full md:w-[80%] h-[90%] overflow-hidden overflow-y-scroll no-scrollbar bg-white text-black -mb-3 rounded-tr-2xl rounded-tl-2xl md:p-14 shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
                  <div className="relative w-full md:w-1/2 h-[260px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#F98F1F]/30">
                    <Image
                      src={offering.image}
                      alt={offering.title}
                      fill
                      className="object-cover object-center scale-105 saturate-150 brightness-105"
                      style={{ borderRadius: '1rem', boxShadow: '0 8px 32px 0 #F98F1F22' }}
                    />
                    {/* Removed dark overlay for more vibrant image */}
                  </div>
            <div className="flex-1 flex flex-col justify-center items-start px-2 md:px-8">
              <DialogTitle className="text-4xl md:text-5xl font-extrabold text-[#F98F1F] mb-2 drop-shadow-lg">
                {offering.details.title}
              </DialogTitle>
              <p className="text-lg md:text-2xl text-gray-700 mb-4 font-medium leading-relaxed">
                {offering.details.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {offering.features.map((feature) => (
                  <span key={feature} className="bg-[#F98F1F]/10 text-[#F98F1F] px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {feature}
                  </span>
                ))}
              </div>
                    {/* Dial code callout - compact, elegant badge */}
                    <div className="w-full flex flex-col items-center my-4">
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-[#F98F1F] text-lg font-bold tracking-widest mb-1">Dial Instantly</span>
                        <div className="inline-flex items-center gap-2 bg-[#F98F1F] text-white font-mono text-xl font-extrabold rounded-full px-7 py-2 shadow-md border-2 border-[#F98F1F]/30 drop-shadow-md">
                          <svg className="w-5 h-5 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 7.5v-2A2.5 2.5 0 0 1 9 3h6a2.5 2.5 0 0 1 2.5 2.5v2M12 15v2m0 0v2m0-2h2m-2 0H10" /></svg>
                          *303#
                        </div>
                        <span className="text-xs text-gray-500 mt-1">to activate instantly</span>
                      </div>
                    </div>
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

        {/* Short codes list - modern, catchy card layout */}
        <div className="mt-10">
          <h5 className="text-[#F98F1F] text-2xl font-extrabold mb-4 text-center tracking-wide drop-shadow">Shortcodes &amp; Purpose</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {shortCodes.map((item) => (
              <div
                key={item.code}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow border border-[#F98F1F]/10 hover:shadow-lg transition group"
              >
                <span className="flex items-center justify-center font-mono text-base text-white bg-[#F98F1F] rounded-full px-4 py-2 font-bold shadow border-2 border-[#F98F1F]/30 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 mr-1 text-white opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 7.5v-2A2.5 2.5 0 0 1 9 3h6a2.5 2.5 0 0 1 2.5 2.5v2" /></svg>
                  {item.code}
                </span>
                <span className="text-sm text-gray-800 font-semibold tracking-wide group-hover:text-[#F98F1F] transition-colors">
                  {item.purpose}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="ghost" onClick={onClose} className="text-[#F98F1F] border border-[#F98F1F] hover:bg-[#F98F1F] hover:text-white font-bold px-6 py-2 rounded-full transition">
              Close
            </Button>
            <Button className="transition-all bg-[#F98F1F] text-white font-bold px-6 py-2 rounded-full hover:bg-[#F98F1F]/90 hover:scale-105 shadow-lg">Get Started</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

