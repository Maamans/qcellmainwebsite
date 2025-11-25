"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

import type { DeviceContent } from "@/types/devices"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getImageUrl } from "@/lib/api"

interface DeviceModalProps {
  device: DeviceContent | null
  isOpen: boolean
  onClose: () => void
}

export default function DeviceModal({ device, isOpen, onClose }: DeviceModalProps) {
  if (!device) return null

  const data = device.data as Record<string, unknown> | undefined
  const dataImage = typeof data?.["image"] === "string" ? (data?.["image"] as string) : undefined
  const dataDescription = typeof data?.["description"] === "string" ? (data?.["description"] as string) : undefined
  const benefitsFromData =
    Array.isArray(data?.["benefits"]) ? (data?.["benefits"] as string[]) : undefined
  const ctaText = device.ctaText ?? (typeof data?.["ctaText"] === "string" ? (data?.["ctaText"] as string) : undefined)
  const ctaAction =
    device.ctaAction ?? (typeof data?.["ctaAction"] === "string" ? (data?.["ctaAction"] as string) : undefined)
  const imageSrc = getImageUrl(device.image ?? dataImage ?? "/images/qmobile.png")
  const title = device.title ?? "Qcell device"
  const description = device.description ?? dataDescription ?? ""
  const benefits = device.features?.length ? device.features : benefitsFromData ?? []
  const priceLabel =
    typeof device.price === "number"
      ? `Le ${new Intl.NumberFormat("en").format(device.price)}`
      : device.price

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-auto w-full max-w-5xl overflow-hidden border-0 bg-white text-black p-0">
        <div className="grid h-full grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[360px] md:min-h-[520px] bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {priceLabel ? (
              <span className="absolute left-6 top-6 z-20 rounded-full bg-white/95 px-5 py-2 text-sm font-semibold text-[#F98F1F] shadow-lg">
                {priceLabel}
              </span>
            ) : null}
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-contain p-8 md:p-10"
              priority
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>

          <div className="flex h-full flex-col overflow-y-auto p-6 md:p-10">
            <DialogHeader className="space-y-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">{device.subtitle ?? device.title}</p>
              <DialogTitle className="text-3xl font-bold leading-tight md:text-4xl">{device.title}</DialogTitle>
              <DialogDescription className="text-base text-gray-600 md:text-lg">{description}</DialogDescription>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h4 className="text-lg font-semibold uppercase tracking-wide text-gray-700">Benefits</h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={`${benefit}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
                      <Check className="h-4 w-4 text-[#F98F1F]" />
                    </div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
                {benefits.length === 0 ? (
                  <p className="text-sm text-muted-foreground">More details coming soon.</p>
                ) : null}
              </div>
            </motion.div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              <Button variant="ghost" onClick={onClose} className="text-gray-700 hover:bg-gray-100">
                Close
              </Button>
              {ctaAction ? (
                <Button asChild className="bg-[#F98F1F] text-white hover:bg-[#ff9c33]">
                  <a href={ctaAction} target="_blank" rel="noreferrer">
                    {ctaText ?? "Buy Now"}
                  </a>
                </Button>
              ) : (
                <Button className="bg-[#F98F1F] text-white" disabled>
                  {ctaText ?? "Buy Now"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

