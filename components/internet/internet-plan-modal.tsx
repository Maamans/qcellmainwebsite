"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, Wifi, Database, Check } from "lucide-react"
import Image from "next/image"
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
        <>
          {/* Backdrop */}
        <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="relative w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close Button */}
            <button
                className="absolute right-4 top-4 z-20 rounded-full bg-white/90 backdrop-blur-sm p-2 text-gray-700 hover:bg-white shadow-lg transition-all hover:scale-110"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
                {/* Left Side - Image */}
                <div className="relative h-96 md:h-[800px] overflow-hidden">
                  <Image 
                    src={plan.image} 
                    alt={plan.title} 
                    fill 
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/80 via-[#FF8C00]/60 to-black/70" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <span className="text-sm font-semibold uppercase tracking-wider">Internet Plan</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">{plan.title}</h3>
                    </motion.div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="p-8 md:p-12 overflow-y-auto max-h-[800px]">
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                      {plan.description}
                    </p>
                  </motion.div>

                  {/* Plan Details Cards */}
                  {(plan.price || plan.speed || plan.dataLimit) && (
                    <motion.div
                      className="grid grid-cols-1 gap-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {plan.price && (
                        <div className="bg-gradient-to-br from-[#FFF7ED] to-[#FFE8D1] rounded-xl p-4 border border-[#FF8C00]/20 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#FF8C00] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">Le</span>
                              </div>
                              <span className="text-gray-700 font-medium">Price</span>
                            </div>
                            <span className="text-2xl font-bold text-[#FF8C00]">
                              {typeof plan.price === 'number' ? plan.price.toLocaleString() : plan.price}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {plan.speed && (
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Zap className="h-5 w-5 text-white" />
                              </div>
                              <span className="text-gray-700 font-medium">Speed</span>
                            </div>
                            <span className="text-xl font-bold text-blue-600">{plan.speed}</span>
                          </div>
                        </div>
                      )}
                      
                      {plan.dataLimit && (
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <Database className="h-5 w-5 text-white" />
                              </div>
                              <span className="text-gray-700 font-medium">Data Limit</span>
                            </div>
                            <span className="text-xl font-bold text-green-600">{plan.dataLimit}</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Features list */}
                  {plan.features && plan.features.length > 0 && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-[#FF8C00]" />
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {plan.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-[#FF8C00] rounded-full flex items-center justify-center mt-0.5">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-gray-700 flex-1">{feature}</span>
                          </motion.div>
                        ))}
              </div>
                    </motion.div>
                  )}

                  {/* CTA Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button className="flex-1 rounded-xl bg-gradient-to-r from-[#FF8C00] to-[#FFA500] px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      Get Started
                    </button>
                    <button className="flex-1 rounded-xl border-2 border-[#FF8C00] px-6 py-4 text-[#FF8C00] font-semibold hover:bg-[#FF8C00]/10 transition-all">
                      Learn More
                  </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            </div>
        </>
      )}
    </AnimatePresence>
  )
}
