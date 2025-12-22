"use client"

import Image from "next/image"
import { Check, Wifi } from "lucide-react"
import { motion } from "framer-motion"

export default function BenefitsSlider() {
  return (
    <section className="w-full py-16 md:py-24 overflow-hidden bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      <div className="max-w-[95%] lg:max-w-[92%] xl:max-w-[90%] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Image with Curved Shape */}
          <motion.div
            className="relative h-[500px] md:h-[600px] lg:h-[700px] order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-full h-full">
              {/* Curved White Shape from Bottom-Left */}
              <div className="absolute bottom-0 left-0 w-full h-[85%] bg-white rounded-tl-[60%] rounded-tr-[40%] rounded-br-[20%] rounded-bl-[10%] z-10 shadow-2xl"></div>
              
              {/* Main Image Container */}
              <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
                <div className="relative w-full h-[70%] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                    alt="Woman working with laptop and headphones"
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
              </div>

              {/* Wi-Fi Icon - Bottom Left */}
              <motion.div
                className="absolute bottom-8 left-8 z-30"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="bg-blue-600 p-4 rounded-xl shadow-xl">
                  <Wifi className="h-8 w-8 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Text Content */}
          <motion.div
            className="relative z-10 order-1 lg:order-2 h-[500px] md:h-[600px] lg:h-[700px] flex items-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 md:space-y-5 lg:space-y-6 w-full">
              {/* Main Headline */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Want To Go Faster? Upgrade to Premium Devices
              </h2>

              {/* Introductory Paragraph */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Upgrade to the latest smartphones and gadgets and unlock a world of seamless connectivity with QCell&apos;s premium device solutions.
              </p>

              {/* Feature Sections */}
              <div className="space-y-3 md:space-y-4">
                {/* Feature 1: Reliable & Fast Devices */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        1. Reliable & Fast Devices
                      </h3>
                      <ul className="space-y-0.5 text-gray-700">
                        <li className="text-sm md:text-base">• Get reliable and high-performance devices.</li>
                        <li className="text-sm md:text-base">• Transparent pricing with no hidden fees.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Feature 2: Exceptional Support */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        2. Exceptional Support
                      </h3>
                      <ul className="space-y-0.5 text-gray-700">
                        <li className="text-sm md:text-base">• 24/7 customer support for assistance.</li>
                        <li className="text-sm md:text-base">• Secure devices and protection against threats.</li>
                        <li className="text-sm md:text-base">• Diverse devices to meet different needs.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Feature 3: Advanced Features */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        3. Advanced Features
                      </h3>
                      <ul className="space-y-0.5 text-gray-700">
                        <li className="text-sm md:text-base">• Transparent policies and practices.</li>
                        <li className="text-sm md:text-base">• Latest technology for improved performance.</li>
                        <li className="text-sm md:text-base">• Advanced security features for device safety.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
