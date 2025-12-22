"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function QCellAboutSection() {
  return (
    <section className="relative py-24 px-4 md:px-8 bg-white w-full overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Photo Collage */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Cut Rectangle/L-shape at Top Left - shows top and left sides */}
            <div className="absolute -top-8 -left-8 w-80 h-80 bg-gradient-to-br from-[#FF8C00] via-[#FFA500] to-[#FFB347] opacity-90 rounded-2xl" style={{ clipPath: 'polygon(0 0, 60% 0, 0 60%)' }}></div>
            
            {/* Cut Rectangle/L-shape at Bottom Right - shows bottom and right sides */}
            <div className="absolute -bottom-8 -right-8 w-80 h-80 bg-gradient-to-br from-[#FFA500] via-[#FFB347] to-[#FF8C00] opacity-90 rounded-2xl" style={{ clipPath: 'polygon(40% 100%, 100% 100%, 100% 40%)' }}></div>
            
            {/* Photo Collage */}
            <div className="relative grid grid-cols-2 gap-4 p-4 z-10">
              {/* Top Left - Group Photo */}
              <motion.div
                className="relative aspect-square rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Image
                  src="/images/team.jpg"
                  alt="QCell Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                {/* Play Button Badge */}
                <div className="absolute bottom-2 left-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-20">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </motion.div>

              {/* Top Right - Professional Photo */}
              <motion.div
                className="relative aspect-square rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Image
                  src="/images/business-corporate-people.jpg"
                  alt="QCell Professional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>

              {/* Bottom Left - Working Photo */}
              <motion.div
                className="relative aspect-square rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Image
                  src="/images/work.jpg"
                  alt="QCell Work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>

              {/* Bottom Right - Collaboration Photo */}
              <motion.div
                className="relative aspect-square rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Image
                  src="/images/business-corporate.jpg"
                  alt="QCell Collaboration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Decorative Sparkles */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-sky-300 rounded-full opacity-40 blur-lg"></div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* About Us Label */}
            <motion.p
              className="text-[#FF8C00] font-semibold text-sm uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              About Us
            </motion.p>

            {/* Main Title */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gray-900">Connecting Sierra Leone</span>
              <br />
              <span className="text-blue-500">Through Innovation</span>
            </motion.h2>

            {/* Description Text */}
            <motion.div
              className="space-y-6 text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p>
                QCell is Sierra Leone&apos;s only African-owned telecom company, pioneering mobile and internet services nationwide.
              </p>
              <p>
            QCell is the very first Mobile company to conduct a soft launch by offering services not only in the capital city Freetown but also to all provincial district headquarter towns with 3G mobile internet service as well as enhanced voice and SMS services.
          </p>
              <p>
            QCell has coverage presence in all 16 districts in the country today offering 3G/4G services across the country. 5G roll out is on the cards as few deployment sites are currently been on trial.
          </p>
            </motion.div>

            {/* Statistics */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FF8C00] mb-2">16</div>
                <div className="text-sm text-gray-600">Districts Covered</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FF8C00] mb-2">3G/4G</div>
                <div className="text-sm text-gray-600">Network Services</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FF8C00] mb-2">100%</div>
                <div className="text-sm text-gray-600">Nationwide</div>
        </div>
            </motion.div>

            {/* Signature Section */}
            <motion.div
              className="pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="mb-4">
                {/* Signature SVG */}
                <svg className="h-12 w-48 text-gray-400" viewBox="0 0 200 60" fill="none">
                  <path
                    d="M10 40 Q30 20, 50 40 T90 40 Q110 20, 130 40 T170 40"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-gray-900 font-semibold text-lg">QCell Leadership</div>
              <div className="text-gray-600 text-sm">CEO & Founder</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
