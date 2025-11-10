"use client"

import { motion } from "framer-motion"
import { Wifi, Zap, ShieldCheck, Globe2, CreditCard, Headphones } from "lucide-react"

const benefits = [
  {
    title: "Ultra-fast Speeds",
    description: "Stream, game, and work without limits across all your devices.",
    icon: Zap,
  },
  {
    title: "Reliable Coverage",
    description: "Nationwide network with consistent connectivity where you need it.",
    icon: Globe2,
  },
  {
    title: "Secure Connection",
    description: "Enterprise-grade security to keep your data and devices safe.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Payments",
    description: "Affordable bundles and plans with easy activation and top‑ups.",
    icon: CreditCard,
  },
  {
    title: "Seamless Wi‑Fi",
    description: "Smooth performance across your home and office Wi‑Fi.",
    icon: Wifi,
  },
  {
    title: "24/7 Support",
    description: "Our experts are always here to help you stay connected.",
    icon: Headphones,
  },
]

export default function InternetBenefits() {
  return (
    <section className="relative w-full py-10 md:py-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fff6ee] to-white" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[#F98F1F]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-[#CD7F32]/10 blur-3xl" />
      <div className="relative container mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Why Choose <span className="bg-gradient-to-r from-[#F98F1F] to-[#CD7F32] bg-clip-text text-transparent">Qcell Internet</span>
            </h2>
            <div className="mt-4 flex justify-center">
              <span className="h-1 w-24 md:w-32 rounded-full bg-gradient-to-r from-[#F98F1F] to-[#CD7F32]" />
            </div>
            <p className="mt-5 text-gray-600 md:text-xl max-w-5xl mx-auto leading-relaxed">
              Powerful performance with comfort, security, and flexibility built in.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-6 md:p-7 shadow-md hover:shadow-2xl transition-all border border-white/60 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F98F1F]/0 to-[#CD7F32]/0 group-hover:from-[#F98F1F]/10 group-hover:to-[#CD7F32]/10 transition-colors" />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 rounded-xl bg-gradient-to-br from-orange-50 to-white p-3 text-[#F98F1F] ring-1 ring-orange-100">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 md:mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F98F1F] to-[#CD7F32] px-6 py-8 md:px-10 md:py-10 shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Ready to get connected?</h3>
                <p className="text-white/90 mt-2 md:mt-3 max-w-2xl">Find the plan that fits your lifestyle and enjoy fast, secure, and reliable internet with Qcell.</p>
              </div>
              <div className="flex gap-3">
                <a href="#" className="rounded-full bg-white text-[#F98F1F] px-6 py-3 text-sm md:text-base font-semibold hover:bg-orange-50 transition-colors shadow">
                  Explore all plans
                </a>
                <a href="#" className="rounded-full border border-white/70 text-white px-6 py-3 text-sm md:text-base font-semibold hover:bg-white/10 transition-colors">
                  Contact sales
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


